// Kiểm chứng một file đã chuyển sang tiếng Việt:
//   node tools/check-migration.mjs book/18-nuoi-con-co-dang-khong.md "book/18-养孩子划不划算.md"
// Đối chiếu bản gốc lấy từ `git show main:<đường dẫn cũ>` — số mục, số field
// mỗi loại, số cost-tag, số link trong Nguồn/Ghi chú phải bằng nhau.
// Chữ Hán chỉ được nằm trong dòng `- Nguồn:`. Lỗi → exit 1.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [vnPath, oldPath] = process.argv.slice(2);
if (!vnPath || !oldPath) { console.error('cần: <file-vn> <file-goc-tren-main>'); process.exit(2); }

let vn;
try { vn = readFileSync(resolve(ROOT, vnPath), 'utf8'); }
catch { console.error(`không đọc được ${vnPath}`); process.exit(2); }
let old;
try { old = execFileSync('git', ['show', `main:${oldPath.replace(/\\/g, '/')}`], { cwd: ROOT, encoding: 'utf8' }); }
catch { console.error(`không đọc được main:${oldPath}`); process.exit(2); }

const OLD_FIELDS = { '成本': 'Chi phí', '说人话': 'Nói dễ hiểu', '收益': 'Lợi ích', '证据等级': 'Mức chứng cứ', '来源': 'Nguồn', '备注': 'Ghi chú' };
const count = (s, re) => (s.match(re) ?? []).length;
const links = s => s.split(/\r?\n/).filter(l => /^- (来源|备注|Nguồn|Ghi chú)[:：]/.test(l)).reduce((n, l) => n + count(l, /https?:\/\//g), 0);

let bad = 0;
const eq = (name, a, b) => { if (a !== b) { console.log(`LỆCH ${name}: gốc ${a} / VN ${b}`); bad++; } };
eq('số mục ###', count(old, /^### /gm), count(vn, /^### /gm));
for (const [o, v] of Object.entries(OLD_FIELDS))
  eq(`field ${v}`, count(old, new RegExp(`^- ${o}：`, 'gm')), count(vn, new RegExp(`^- ${v}:`, 'gm')));
eq('cost-tag', count(old, /<!--\s*成本标签/g), count(vn, /<!--\s*nhan-chi-phi/g));
eq('link trong Nguồn/Ghi chú', links(old), links(vn));

vn.split(/\r?\n/).forEach((l, i) => {
  if (/^- Nguồn:/.test(l)) return;
  const han = l.match(/[一-鿿]/g);
  if (han) { console.log(`CHỮ HÁN dòng ${i + 1}: ${l.slice(0, 80)}`); bad++; }
});
console.log(bad ? `${bad} điểm lệch/sót` : 'khớp bản gốc');
process.exit(bad ? 1 : 0);
