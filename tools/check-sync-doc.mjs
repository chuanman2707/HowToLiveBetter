// So trích chéo của một bài dài: tập "第 X 节第 Y 条" trong bài gốc ở <ref> phải
// bằng tập "phần X, mục Y" trong bài tiếng Việt (tính cả số lần). Dùng khi đồng
// bộ bài dài (kế hoạch docs/superpowers/plans/2026-10-08-dong-bo-upstream.md).
//
//   node tools/check-sync-doc.mjs 0cec2b3 "docs/被裁了之后先做什么.md" docs/bi-cat-giam-roi-lam-gi-truoc.md
//
// exit 0 khi khớp, 1 khi lệch (in số mục thiếu / thừa).
//
// Chín bài dài ở 0cec2b3 (file gốc trong docs/ của bản gốc -> file VN trong docs/).
// Cả chín đều khớp trừ bài lam-nen-tang. Thêm bài mới thì thêm một dòng vào bảng này.
//   做平台要办哪些证.md          -> lam-nen-tang-can-nhung-giay-phep-gi.md
//   刚确诊慢性病之后.md          -> vua-chan-doan-benh-man-tinh.md
//   孩子出生前后要办的事.md      -> viec-can-lam-truoc-va-sau-khi-sinh-con.md
//   家庭应急装备清单.md          -> danh-muc-do-dung-khan-cap-gia-dinh.md
//   换工作、换城市之前.md        -> truoc-khi-doi-viec-doi-thanh-pho.md
//   生物钟和夜班.md              -> nhip-dong-ho-sinh-hoc-va-ca-dem.md
//   结婚划不划算.md              -> cuoi-co-dang-khong.md
//   被裁了之后先做什么.md        -> bi-cat-giam-roi-lam-gi-truoc.md
//   遇到陌生人出事该不该停.md    -> gap-nguoi-la-bi-nan-co-nen-dung-lai.md
// Không so: 引用对照.md (bản VN là docs/bang-doi-chieu-trich-dan.md, do check-refs.mjs sinh)
// và docs/核实记录/ (không đem sang fork, xem CLAUDE.md).
//
// Ngoại lệ đã biết: lam-nen-tang-can-nhung-giay-phep-gi.md luôn báo
// "LỆCH: gốc 0 / VN 1; ... VN có gốc không: [26,5]". Bài gốc có một trích dạng
// khoảng, "第 26 节第 5 到第 10 条", mà regex bên gốc (đòi 条 ngay sau số mục) không
// bắt. Bản VN dịch thành "phần 26 mục 5 tới 10", regex bên VN bắt được "phần 26
// mục 5". Hai bên trích cùng một chỗ, lệch đó là do cách đếm, không phải thiếu
// trích. Chỉ cần số lệch vẫn đúng [26,5]; ra số khác thì xem lại bằng tay.
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
