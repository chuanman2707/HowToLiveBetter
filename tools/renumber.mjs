// Xóa mục và dồn số: bỏ khối "### d." của phần X, đánh lại số các mục sau nó,
// rồi sửa mọi trích "phần X, mục Y" / "mục Y" (cùng phần) trỏ vào các mục bị dồn
// trên cả book/ và bài dài docs/. Trích trỏ vào chính mục bị xóa KHÔNG tự sửa —
// in ra để người sửa tay (thường là chuyển sang mục nhận nội dung gộp).
//
//   node tools/renumber.mjs 2:14 3:17 5:38      # xóa phần 2 mục 14, phần 3 mục 17, ...
//   node tools/renumber.mjs --dry 2:14          # chỉ in sẽ đổi gì, không ghi file
//
// Phạm vi quét giống check-refs.mjs, để không đụng số điều luật:
// - trong thân mục: trích chéo phần ở các field Chi phí/Nói dễ hiểu/Lợi ích/
//   Ghi chú/Nguồn, trích cùng phần ("mục Y") chỉ ở bốn field đầu;
// - đoạn mở đầu phần: mọi dòng; bài dài docs/: chỉ trích chéo phần.
// Regex NUMS/CROSS/WHOLE/SAME chép từ check-refs.mjs, đổi bên đó thì đổi đây.
// Chạy xong bắt buộc: node tools/check-refs.mjs --check, rồi soi diff
// docs/bang-doi-chieu-trich-dan.md (sync-stats.mjs sinh lại).
// Tách dòng bằng /\r?\n/, lý do xem đầu check-refs.mjs.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const del = new Map(); // phần -> [số mục bị xóa, tăng dần]
for (const a of args.filter(a => a !== '--dry')) {
  const m = /^(\d+):(\d+)$/.exec(a);
  if (!m) { console.error(`tham số sai: ${a} (dạng phần:mục)`); process.exit(2); }
  const [x, d] = [Number(m[1]), Number(m[2])];
  del.set(x, [...(del.get(x) ?? []), d].sort((p, q) => p - q));
}
if (!del.size) { console.error('cần ít nhất một phần:mục'); process.exit(2); }

// Số mới của mục y thuộc phần x; null nếu y chính là mục bị xóa.
const map = (x, y) => {
  const ds = del.get(x);
  if (!ds) return y;
  if (ds.includes(y)) return null;
  return y - ds.filter(d => d < y).length;
};

const NUMS = '\\d+(?:\\s*(?:,|và)\\s*(?:mục\\s*)?\\d+|\\s*đến\\s*(?:(?:mục|phần)\\s*)?\\d+)*';
const CROSS = new RegExp(`(phần\\s*)(\\d+)(\\s*,?\\s*mục\\s*)(${NUMS})`, 'g');
const WHOLE = new RegExp(`phần\\s*(${NUMS})`, 'g');
const SAME = new RegExp(`(mục\\s*)(${NUMS})`, 'g');
const FIELDS = /^- (Nói dễ hiểu|Lợi ích|Ghi chú|Chi phí):/;
const CROSS_FIELDS = /^- (Nói dễ hiểu|Lợi ích|Ghi chú|Chi phí|Nguồn):/;

const manual = [];
let changed = 0;
// Đổi từng số trong một chuỗi NUMS; số trỏ vào mục bị xóa giữ nguyên và báo.
const remapNums = (x, spec, where) => spec.replace(/\d+/g, s => {
  const y = Number(s), n = map(x, y);
  if (n === null) { manual.push(`${where}: trích phần ${x}, mục ${y} trỏ vào mục bị xóa`); return s; }
  return String(n);
});

const bookFiles = readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
const docFiles = readdirSync(resolve(ROOT, 'docs')).filter(f => f.endsWith('.md') && f !== 'bang-doi-chieu-trich-dan.md').sort();

for (const [dir, f] of [...bookFiles.map(f => ['book', f]), ...docFiles.map(f => ['docs', f])]) {
  const path = resolve(ROOT, dir, f);
  const text = readFileSync(path, 'utf8');
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  const isDoc = dir === 'docs';
  const x = isDoc ? 0 : Number(f.slice(0, 2));
  const ds = del.get(x) ?? [];
  const out = [];
  let cur = 0, skipping = false;
  for (const [i, line] of text.split(/\r?\n/).entries()) {
    const where = `${dir}/${f}:${i + 1}`;
    const h = isDoc ? null : /^### (\d+)\. (.*)$/.exec(line);
    if (h) {
      cur = Number(h[1]);
      skipping = ds.includes(cur);
      if (skipping) { changed++; continue; }
      const n = map(x, cur);
      out.push(n === cur ? line : `### ${n}. ${h[2]}`);
      if (n !== cur) changed++;
      continue;
    }
    if (skipping) continue;
    const inEntry = !isDoc && cur > 0;
    let l = line;
    if (inEntry ? CROSS_FIELDS.test(l) : l.trim()) {
      l = l.replace(CROSS, (m0, a, px, b, spec) => `${a}${px}${b}${remapNums(Number(px), spec, where)}`);
      const sameOk = !isDoc && ds.length && (!inEntry || FIELDS.test(l));
      if (sameOk) {
        // Trích cùng phần: chỉ trên phần chuỗi không thuộc trích chéo / cả phần
        const masked = [];
        const keep = s => { masked.push(s); return `\u0000${masked.length - 1}\u0000`; };
        let t = l.replace(new RegExp(CROSS.source, 'g'), keep).replace(WHOLE, keep);
        t = t.replace(SAME, (m0, a, spec) => `${a}${remapNums(x, spec, where)}`);
        l = t.replace(/\u0000(\d+)\u0000/g, (_, k) => masked[Number(k)]);
      }
    }
    if (l !== line) changed++;
    out.push(l);
  }
  const next = out.join(eol);
  if (next !== text && !DRY) writeFileSync(path, next, 'utf8');
  if (next !== text) console.log(`${DRY ? 'sẽ sửa' : 'đã sửa'} ${dir}/${f}`);
}
for (const m of manual) console.log(`SỬA TAY ${m}`);
console.log(`${changed} dòng đổi; ${manual.length} trích trỏ vào mục bị xóa cần sửa tay`);
