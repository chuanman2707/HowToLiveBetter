// So trích chéo của một bài dài: tập "第 X 节第 Y 条" trong bài gốc ở <ref> phải
// bằng tập "phần X, mục Y" trong bài tiếng Việt (tính cả số lần). Dùng khi đồng
// bộ bài dài (kế hoạch docs/superpowers/plans/2026-10-08-dong-bo-upstream.md).
//
//   node tools/check-sync-doc.mjs 0cec2b3 "docs/被裁了之后先做什么.md" docs/bi-cat-giam-roi-lam-gi-truoc.md
//
// exit 0 khi khớp, 1 khi lệch (in số mục thiếu / thừa).
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const [ref, zh, vn] = process.argv.slice(2);
if (!ref || !zh || !vn) { console.error('cần: <ref> <file-goc> <file-vn>'); process.exit(2); }
const z = execFileSync('git', ['show', `${ref}:${zh}`], { encoding: 'utf8' });
const a = [...z.matchAll(/第\s*(\d+)\s*节第\s*(\d+)\s*条/g)].map(m => `${m[1]},${m[2]}`).sort();
const b = [...readFileSync(vn, 'utf8').matchAll(/phần\s*(\d+),?\s*mục\s*(\d+)/g)].map(m => `${m[1]},${m[2]}`).sort();
const miss = a.filter(x => !b.includes(x)), extra = b.filter(x => !a.includes(x));
const same = JSON.stringify(a) === JSON.stringify(b);
console.log(same ? `khớp ${a.length} trích` : `LỆCH: gốc ${a.length} / VN ${b.length}; gốc có VN không: [${[...new Set(miss)]}]; VN có gốc không: [${[...new Set(extra)]}]`);
process.exit(same ? 0 : 1);
