// check-refs.mjs --check cho lúc đồng bộ từng phần song song: tha các trích
// "phần X, mục Y" mà phần X bên VN chưa có mục Y nhưng bản gốc ở <ref> đã có —
// đó là mục mới của phần khác, sẽ có khi phần đó đồng bộ xong. Mọi lỗi khác
// vẫn tính. Khi mọi phần đã đồng bộ, dùng lại check-refs.mjs --check thường.
//
//   node tools/check-refs-pending.mjs [ref]     # ref mặc định upstream/main
//
// exit 0: đạt, hoặc chỉ còn trích chờ. exit 1: còn lỗi khác.
import { spawnSync, execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ref = process.argv[2] || 'upstream/main';
const r = spawnSync(process.execPath, [resolve(ROOT, 'tools/check-refs.mjs'), '--check'], { cwd: ROOT, encoding: 'utf8' });
const out = r.stdout;
if (r.status === 0) { console.log(`check-refs: đạt, ${(out.match(/cả (\d+) trích dẫn/) ?? [])[1]} trích dẫn`); process.exit(0); }

const git = a => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: ROOT, encoding: 'utf8' });
const zhFiles = git(['ls-tree', '--name-only', ref, 'book/']).trim().split('\n');
const upCount = x => {
  const f = zhFiles.find(f => f.startsWith(`book/${String(x).padStart(2, '0')}-`));
  return f ? (git(['show', `${ref}:${f}`]).match(/^### /gm) ?? []).length : 0;
};
// check-refs in lỗi chặn hai lần (khối "Cần người xác nhận" và danh sách lỗi), nên lọc trùng.
const fatal = [...new Set(out.split('\n').filter(l => /— phần đó không có mục này$/.test(l)).map(l => l.trim()))];
const pending = fatal.filter(l => { const m = l.match(/trích "phần (\d+), mục (\d+)"/); return m && upCount(m[1]) >= Number(m[2]); });
const remain = Number((out.match(/Còn (\d+) chỗ cần xử lý/) ?? [])[1] ?? NaN);
for (const l of pending) console.log(`  chờ phần khác đồng bộ: ${l}`);
if (remain === pending.length) { console.log(`check-refs: đạt, chỉ còn ${pending.length} trích chờ mục mới của phần khác`); process.exit(0); }
console.log(out.split('\n').filter(l => !pending.includes(l.trim())).join('\n'));
console.log(`check-refs: KHÔNG ĐẠT (${remain - pending.length} lỗi ngoài các trích chờ)`);
process.exit(1);
