// So sánh chữ ký cấu trúc + con số của một file book/ trước và sau khi viết lại
// giọng. Phục vụ đợt refactor giọng văn 2026-10 (spec
// docs/superpowers/specs/2026-10-03-giong-van-nguoi-thay-design.md): câu chữ được
// viết lại, nhưng cấu trúc mục, field, nguồn, con số, marker phải nguyên.
//
//   node tools/check-rewrite.mjs book/22-thu-gian-the-nao.md          # so với HEAD
//   node tools/check-rewrite.mjs book/22-thu-gian-the-nao.md <ref>    # so với ref khác
//
// Chạy khi bản viết lại đang ở working tree chưa commit. Lỗi → exit 1, in từng
// chỗ lệch. Sạch → exit 0.
//
// Kiểm:
//   ① line ending: file nào CRLF giữ CRLF, LF giữ LF
//   ② dãy số mục ### N. giữ nguyên; tiêu đề cũ phải là subsequence của tiêu đề
//     mới (chỉ được thêm từ, không bớt/đổi — anchor của check-refs.mjs)
//   ③ số field mỗi loại bằng nhau; giá trị "Mức chứng cứ" từng mục đổi thì báo
//   ④ thẻ nhan-chi-phi giữ nguyên giá trị (đã xảy ra bị đổi lặng ở bản TQ)
//   ⑤ mọi dòng "- Nguồn:" giữ nguyên nội dung (so sau chuẩn hóa NFC)
//   ⑥ mỗi mục: con số của bản cũ phải còn đủ số lần trong bản mới (so theo giá
//     trị đã normalize dấu ngăn nghìn/thập phân kiểu check-plain.mjs). Chỉ kiểm
//     cũ→mới: số thêm là cho phép (bản dịch quy đổi kèm giá trị gốc), số mất là
//     lỗi — quy tắc spec đòi giữ ký hiệu số nên số biến mất gần như luôn là mất
//     dữ kiện
//   ⑦ mỗi "- Ghi chú:" giữ đúng marker mở đầu (Chỉ tham khảo TQ: / Tranh cãi /
//     không marker) như bản cũ — marker lệch làm sync-stats.mjs đếm sai
// Tách dòng bằng /\r?\n/, lý do xem đầu check-refs.mjs.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [file, ref = 'HEAD'] = process.argv.slice(2);
if (!file) { console.error('cần: <file-trong-book/> [ref-mặc-định-HEAD]'); process.exit(2); }

let oldText, newText;
try { oldText = execFileSync('git', ['show', `${ref}:${file.replace(/\\/g, '/')}`], { cwd: ROOT, encoding: 'utf8' }); }
catch { console.error(`không đọc được ${ref}:${file}`); process.exit(2); }
try { newText = readFileSync(resolve(ROOT, file), 'utf8'); }
catch { console.error(`không đọc được ${file}`); process.exit(2); }

const FIELDS = ['Chi phí', 'Nói dễ hiểu', 'Lợi ích', 'Mức chứng cứ', 'Nguồn', 'Ghi chú'];

// Chia thành các mục theo "### N.". Phần trước mục 1 là mục 0 (mở đầu chương).
function parse(text) {
  const muc = new Map(); // no -> { title, fields: {name: line}, tag, raw }
  let cur = { no: 0, title: '', fields: {}, tag: '', raw: [] };
  muc.set(0, cur);
  for (const line of text.normalize('NFC').split(/\r?\n/)) {
    const h = line.match(/^### (\d+)\. (.*)$/);
    if (h) { cur = { no: Number(h[1]), title: h[2].trim(), fields: {}, tag: '', raw: [] }; muc.set(cur.no, cur); cur.raw.push(line); continue; }
    cur.raw.push(line);
    const f = line.match(/^- (Chi phí|Nói dễ hiểu|Lợi ích|Mức chứng cứ|Nguồn|Ghi chú):\s*(.*)$/);
    if (f) cur.fields[f[1]] = line;
    if (/^<!--\s*nhan-chi-phi/.test(line)) cur.tag = line.trim();
  }
  return muc;
}

// normalize số kiểu check-plain.mjs: "." ngăn nghìn, "," thập phân, đơn vị đếm.
function numbers(s) {
  let t = s, prev;
  do { prev = t; t = t.replace(/(\d)\.(\d{3})/g, '$1$2'); } while (t !== prev);
  t = t.replace(/(\d),(\d)/g, '$1.$2');
  const mult = { 'tỷ': 1e9, 'triệu': 1e6, 'tr': 1e6, 'nghìn': 1e3, 'k': 1e3 };
  return [...t.matchAll(/(\d*\.?\d+)\s*(tỷ|triệu|tr|nghìn|k)?/gi)]
    .map(m => Number(m[1]) * (mult[(m[2] || '').toLowerCase()] || 1));
}
const numBag = s => { const m = new Map(); for (const n of numbers(s)) m.set(n, (m.get(n) || 0) + 1); return m; };

// Tiêu đề mới phải chứa mọi từ của tiêu đề cũ theo đúng thứ tự (subsequence).
const isSubseq = (oldW, newW) => {
  let i = 0;
  for (const w of newW) if (w === oldW[i]) i++;
  return i === oldW.length;
};

const marker = line => {
  const v = (line || '').replace(/^- Ghi chú:\s*/, '');
  if (v.startsWith('Chỉ tham khảo TQ')) return 'TQ';
  if (v.startsWith('Tranh cãi')) return 'Tranh cãi';
  return 'không';
};

const bad = [];
const crlf = t => /\r\n/.test(t);
if (crlf(oldText) !== crlf(newText))
  bad.push(`line ending đổi: cũ ${crlf(oldText) ? 'CRLF' : 'LF'} / mới ${crlf(newText) ? 'CRLF' : 'LF'}`);

const a = parse(oldText), b = parse(newText);
const aNos = [...a.keys()], bNos = [...b.keys()];
if (aNos.join(',') !== bNos.join(','))
  bad.push(`dãy số mục đổi: cũ [${aNos.join(',')}] / mới [${bNos.join(',')}]`);

for (const no of aNos) {
  const x = a.get(no), y = b.get(no);
  if (!y) continue; // đã báo ở dãy số mục
  const where = no === 0 ? 'mở đầu chương' : `mục ${no}`;
  if (no && x.title && !isSubseq(x.title.split(/\s+/), (y.title || '').split(/\s+/)))
    bad.push(`${where}: tiêu đề mới "${y.title}" mất từ của tiêu đề cũ "${x.title}"`);
  for (const f of FIELDS)
    if ((x.fields[f] != null) !== (y.fields[f] != null))
      bad.push(`${where}: field "${f}" ${y.fields[f] == null ? 'mất' : 'thêm mới'}`);
  if (x.tag !== y.tag)
    bad.push(`${where}: thẻ nhan-chi-phi đổi "${x.tag}" → "${y.tag}"`);
  if (x.fields['Nguồn'] != null && x.fields['Nguồn'].normalize('NFC') !== (y.fields['Nguồn'] || '').normalize('NFC'))
    bad.push(`${where}: dòng Nguồn bị động vào`);
  if (x.fields['Mức chứng cứ'] != null && (x.fields['Mức chứng cứ'] || '').trim() !== (y.fields['Mức chứng cứ'] || '').trim())
    bad.push(`${where}: Mức chứng cứ đổi "${x.fields['Mức chứng cứ'].trim()}" → "${(y.fields['Mức chứng cứ'] || '').trim()}"`);
  if (x.fields['Ghi chú'] != null && marker(x.fields['Ghi chú']) !== marker(y.fields['Ghi chú']))
    bad.push(`${where}: marker Ghi chú đổi "${marker(x.fields['Ghi chú'])}" → "${marker(y.fields['Ghi chú'])}"`);
  const on = numBag(x.raw.join('\n')), nn = numBag(y.raw.join('\n'));
  const miss = [...on.entries()].filter(([n, c]) => (nn.get(n) || 0) < c).map(([n, c]) => `${n}×${c}`);
  if (miss.length) bad.push(`${where}: số mất hoặc ít đi: ${miss.join(', ')}`);
}

if (bad.length) {
  console.log(bad.map(s => `LỖI ${s}`).join('\n'));
  console.log(`\n${file}: ${bad.length} lỗi`);
  process.exit(1);
}
console.log(`${file}: sạch (${aNos.length - 1} mục, cấu trúc và số nguyên vẹn)`);
