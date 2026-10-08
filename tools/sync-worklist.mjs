// Danh sách việc đồng bộ một phần: mục nào của bản gốc đổi giữa hai ref, đổi
// trong commit nào, mục nào mới, đoạn mở đầu phần có đổi không. sync-worker.sh
// nhét kết quả này vào prompt của worker; người cũng đọc được.
//
//   node tools/sync-worklist.mjs 05                         # merge-base(HEAD, upstream/main)..upstream/main
//   node tools/sync-worklist.mjs 05 --from bd95d3e --to 0cec2b3
//   node tools/sync-worklist.mjs --all [--from ..] [--to ..]
//
// Số mục ghi theo số ở commit đổi nó. Commit nào làm số mục của một phần giảm
// (xóa hay gộp mục) thì số sau đó bị dồn: tool không ghi mục của commit đó mà
// in cảnh báo "DỒN SỐ" — phải làm commit đó trước bằng tools/renumber.mjs rồi
// chạy lại với --from <commit đó>.
// Tách dòng bằng /\r?\n/, lý do xem đầu check-refs.mjs.
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const opt = name => { const i = argv.indexOf(name); if (i < 0) return null; const v = argv[i + 1]; argv.splice(i, 2); return v; };
const fromArg = opt('--from');
const to = opt('--to') ?? 'upstream/main';
const only = argv[0] === '--all' ? null : argv[0];
if (only !== null && !/^\d\d$/.test(only ?? '')) { console.error('cần: <NN> hoặc --all, tùy chọn --from <ref> --to <ref>'); process.exit(2); }

const git = a => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
let from = fromArg;
if (!from) {
  try { from = git(['merge-base', 'HEAD', 'upstream/main']).trim().slice(0, 7); }
  catch { console.error('chưa có remote upstream: git remote add upstream https://github.com/eternity4719/HowToLiveBetter && git fetch upstream'); process.exit(2); }
}
const show = (rev, f) => { try { return git(['show', `${rev}:${f}`]); } catch { return null; } };
function parse(txt) {
  const items = new Map(); let cur = null; const head = [];
  for (const l of txt.split(/\r?\n/)) {
    const m = l.match(/^### (\d+)\. (.*)$/);
    if (m) { cur = { n: Number(m[1]), title: m[2], body: [] }; items.set(cur.n, cur); continue; }
    if (cur) cur.body.push(l); else head.push(l);
  }
  for (const it of items.values()) it.key = it.title + '\n' + it.body.join('\n').trim();
  return { head: head.join('\n').trim(), items };
}

const per = new Map(); // phần -> { head:Set, shift:Set, items: Map(n -> {commits:Set, isNew, title}) }
const P = p => { if (!per.has(p)) per.set(p, { head: new Set(), shift: new Set(), items: new Map() }); return per.get(p); };
const commits = git(['rev-list', '--reverse', '--no-merges', `${from}..${to}`]).trim().split('\n').filter(Boolean);
for (const c of commits) {
  const h = c.slice(0, 7);
  const files = git(['diff-tree', '--no-commit-id', '--name-only', '-r', c]).trim().split('\n').filter(f => /^book\/\d\d-/.test(f));
  for (const f of files) {
    const p = f.slice(5, 7);
    if (only && p !== only) continue;
    const a = show(`${c}^`, f), b = show(c, f);
    if (!a || !b) continue;
    const A = parse(a), B = parse(b);
    if (A.head !== B.head) P(p).head.add(h);
    if (B.items.size < A.items.size) { P(p).shift.add(h); continue; }
    for (const [n, it] of B.items) {
      const old = A.items.get(n);
      if (old && old.key === it.key) continue;
      const e = P(p).items.get(n) ?? { commits: new Set(), isNew: false, title: it.title };
      if (!old) e.isNew = true;
      e.title = it.title; e.commits.add(h);
      P(p).items.set(n, e);
    }
  }
}

const subject = new Map();
const subj = h => { if (!subject.has(h)) subject.set(h, git(['log', '-1', '--format=%s', h]).trim().slice(0, 90)); return subject.get(h); };
const keys = only ? [only] : [...per.keys()].sort();
let any = false;
for (const p of keys) {
  const x = per.get(p);
  if (!x || (!x.head.size && !x.shift.size && !x.items.size)) { if (only) console.log(`phần ${p}: không có việc (${from}..${to})`); continue; }
  any = true;
  console.log(`## Phần ${p} (${from}..${to})`);
  for (const h of x.shift) console.log(`  DỒN SỐ: commit ${h} xóa/gộp mục — làm bằng tools/renumber.mjs trước, rồi chạy lại với --from ${h}`);
  if (x.head.size) console.log(`  MỞ ĐẦU PHẦN đổi [${[...x.head].join(', ')}]`);
  for (const [n, e] of [...x.items].sort((a, b) => a[0] - b[0]))
    console.log(`  ${e.isNew ? 'MỚI' : 'SỬA'} mục ${n} [${[...e.commits].join(', ')}] ${e.title}`);
  const used = new Set([...x.head, ...x.shift, ...[...x.items.values()].flatMap(e => [...e.commits])]);
  console.log('  Commit:');
  for (const h of used) console.log(`    ${h} ${subj(h)}`);
}
if (!only && !any) console.log(`không có việc (${from}..${to})`);
