// Đối chiếu một phần tiếng Việt với bản gốc tiếng Trung ở một ref git theo từng
// mục. Phục vụ đồng bộ upstream (đợt đầu 2026-10, kế hoạch
// docs/superpowers/plans/2026-10-08-dong-bo-upstream.md): câu chữ dịch tay,
// nhưng những thứ máy so được phải khớp bản gốc.
//
//   node tools/check-sync.mjs 05                      # phần 5 so với upstream/main
//   node tools/check-sync.mjs 05 bd95d3e              # so với ref khác
//   node tools/check-sync.mjs --all [ref]             # cả 34 phần
//   --since <ref>   mốc "mục gốc đã đổi" cho kiểm ⑦ ⑨ (mặc định: merge-base của HEAD
//                   với upstream/main, tức commit gốc cuối cùng đã đồng bộ)
//   --frozen <ref>  bật kiểm ⑨, so bản VN với bản VN ở <ref> (worker dùng HEAD)
//   node tools/check-sync.mjs --self-test             # tự kiểm phần đọc số
//
// Kiểm từng mục (khớp theo số ### N.):
//   ① số mục bằng nhau
//   ② thẻ nhan-chi-phi đúng giá trị quy đổi từ 成本标签
//   ③ chữ cái Mức chứng cứ bằng chữ cái 证据等级
//   ④ dòng "- Nguồn:" bằng nguyên văn dòng "- 来源：". Ngoại lệ: 来源 mở đầu
//     「作者经验」 là lời văn, không phải trích dẫn; bản dịch cũ có chỗ giữ nguyên
//     văn, có chỗ dịch thành "Kinh nghiệm tác giả" — nhận cả hai
//   ⑤ Ghi chú mở đầu "Tranh cãi" (sau marker TQ nếu có) khi 备注 mở đầu 争议
//   ⑥ số link http(s) trong Ghi chú bằng trong 备注
//   ⑦ (chỉ mục gốc đã đổi so với --since) mỗi giá trị số mà số lần xuất hiện
//     trong mục gốc tăng so với mục cũ (trừ 来源) phải có ít nhất một lần trong
//     mục VN. Không đếm số lần và không kiểm giá trị không tăng: bản viết lại
//     giọng gộp câu, viết số nhỏ bằng chữ, nên số lần lệch là bình thường, còn
//     đếm thì báo nhầm chỗ đã đúng. Mục cũ ghép theo tiêu đề; không có thì theo
//     số mục. Giả định: giữa --since và ref chỉ nối thêm mục cuối phần. Nếu có
//     chèn hay xóa ở giữa, ghép theo tiêu đề vẫn đúng, còn mục không tìm được
//     tiêu đề cũ bị ghép theo số và có thể lệch. Giới hạn: số viết bằng chữ
//     (ba tháng, một lần) không đọc được, nên mục mới có số nhỏ viết chữ bị báo
//     thiếu dù bản dịch đúng; báo đó phải xem tay
//   ⑧ ngoài dòng Nguồn không còn chữ Hán
//   ⑨ (khi có --frozen) mục, đoạn mở đầu phần và đoạn cuối phần (footer) mà bản
//     gốc không đổi kể từ --since thì bản VN phải giữ nguyên từng chữ như ở <ref>:
//     cả 34 chương đã viết lại giọng, đồng bộ chỉ được vá chỗ gốc đổi. Footer
//     tách khỏi mục cuối vì bản VN phần 26–34 có khối "## Giấy phép" sau mục cuối
//     (phần 26 gốc cũng có "## 许可", các phần khác gốc không có). Nếu footer
//     dính vào mục cuối, khi đồng bộ thêm mục mới sau mục cuối, footer chuyển
//     sang mục mới và mục cuối cũ bị báo sửa sai
// Lỗi → exit 1, in từng chỗ lệch.
// Tách dòng bằng /\r?\n/, lý do xem đầu check-refs.mjs.
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');
const USAGE = 'cần: <NN> [ref] hoặc --all [ref], tùy chọn --since <ref> --frozen <ref>';
const opt = name => {
  const i = argv.indexOf(name);
  if (i < 0) return null;
  const v = argv[i + 1];
  if (v === undefined || v.startsWith('--')) { console.error(`${name} cần một giá trị\n${USAGE}`); process.exit(2); }
  argv.splice(i, 2);
  return v;
};
const sinceArg = opt('--since');
const frozen = opt('--frozen');
const all = argv[0] === '--all';
if (SELF_TEST) argv.splice(0, argv.length, '00');
const ref = argv[1] || 'upstream/main';
const parts = all
  ? readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).map(f => f.slice(0, 2)).sort()
  : [argv[0]];
if (!SELF_TEST && (!parts[0] || !/^\d\d$/.test(parts[0]))) { console.error(USAGE); process.exit(2); }

if (SELF_TEST) {
  // zhNumbers/vnNumbers/round là function declaration nên gọi được trước chỗ định nghĩa.
  const cases = [
    [zhNumbers('宜兴法院 44.8 万元泰达币案'), [44.8e4]],
    [vnNumbers('khoảng 44,8 vạn nhân dân tệ'), [44.8e4]],
    [vnNumbers('448.000 nhân dân tệ'), [448000]],
    [zhNumbers('98 项研究、2,605,044 人'), [98, 2605044]],
    [vnNumbers('98 nghiên cứu với 2.605.044 người'), [98, 2605044]],
    [zhNumbers('低 1.5 倍，6234.86 亿'), [1.5, 623486000000]],
    [vnNumbers('thấp 1,5 lần, 3 triệu'), [1.5, 3e6]],
    [vnNumbers('trước 18 tháng, 2 kg'), [18, 2]],
    [zhNumbers('285.4 亿元'), [285.4e8]],
    [vnNumbers('28,54 tỷ'), [28.54e9]],
    [zhNumbers('2.3 万亿'), [2.3e12]],
    [vnNumbers('2,3 nghìn tỷ'), [2.3e12]],
    [zhNumbers('623,486,000,000 元'), [623486000000]],
    [vnNumbers('623.486.000.000 đồng'), [623486000000]],
    [vnNumbers('1.234,5 người'), [1234.5]],
    [zhNumbers('5 千克'), [5]],
    [zhNumbers('400 余万元'), [4e6]],
    [zhNumbers('30 多万人'), [3e5]],
    [zhNumbers('20 余家'), [20]],
    [vnNumbers('hơn 400 vạn nhân dân tệ'), [4e6]],
  ];
  let fail = 0;
  for (const [got, want] of cases) if (JSON.stringify(got) !== JSON.stringify(want.map(round))) { fail++; console.log(`SAI: được ${JSON.stringify(got)}, cần ${JSON.stringify(want)}`); }
  // Phần chỉ bản gốc có (I3): so tiền tố NN của danh sách file book/ gốc với các phần VN.
  const partCases = [
    [missingParts(['book/01-a.md', 'book/02-b.md', 'book/35-c.md'], ['01', '02']), ['35']],
    [missingParts(['book/01-a.md', 'book/02-b.md'], ['01', '02', '03']), []],
    [missingParts(['book/34-家里的常备药别吃出事.md', 'book/README.md'], ['01']), ['34']],
  ];
  for (const [got, want] of partCases) if (JSON.stringify(got) !== JSON.stringify(want)) { fail++; console.log(`SAI: phần thiếu được ${JSON.stringify(got)}, cần ${JSON.stringify(want)}`); }
  const total = cases.length + partCases.length;
  console.log(fail ? `self-test: ${fail} ca sai` : `self-test: đạt ${total} ca`);
  process.exit(fail ? 1 : 0);
}

const git = a => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 });
let since = sinceArg;
if (!since) {
  try { since = git(['merge-base', 'HEAD', 'upstream/main']).trim(); }
  catch { console.error('chưa có remote upstream: git remote add upstream https://github.com/eternity4719/HowToLiveBetter && git fetch upstream'); process.exit(2); }
}
const lsBook = r => git(['ls-tree', '--name-only', r, 'book/']).trim().split('\n');
const zhFiles = lsBook(ref), sinceFiles = lsBook(since);

const TAG_MAP = {
  '钱': { '0': 'tien=0', '少': 'tien=it', '多': 'tien=nhieu' },
  '时间': { '少': 'thoi-gian=it', '中': 'thoi-gian=vua', '多': 'thoi-gian=nhieu' },
  '毅力': { '否': 'y-chi=khong', '些': 'y-chi=chut', '是': 'y-chi=nhieu' },
  '收益': { '大': 'loi-ich=lon', '中': 'loi-ich=vua', '小': 'loi-ich=nho' },
  '口径': { '死亡率': 'quy-mo=tu-vong', '金钱': 'quy-mo=tien', '时间': 'quy-mo=thoi-gian', '自由': 'quy-mo=tu-do' },
};
const ZH_FIELD = { '成本': 'Chi phí', '说人话': 'Nói dễ hiểu', '收益': 'Lợi ích', '证据等级': 'Mức chứng cứ', '来源': 'Nguồn', '备注': 'Ghi chú' };

// key = tiêu đề + thân mục, không kèm số mục: mục chỉ bị dồn số vẫn coi là không đổi
// foot: mọi dòng từ tiêu đề không phải mục (## ...) sau mục đầu tiên đến hết phần,
// hoặc đến khi gặp "### N." tiếp theo. Không thuộc mục nào, không vào raw/key.
function parse(text, zh) {
  const items = new Map();
  const head = [];
  const foot = [];
  let cur = null;
  for (const line of text.normalize('NFC').split(/\r?\n/)) {
    const h = line.match(/^### (\d+)\. (.*)$/);
    if (h) { cur = { no: Number(h[1]), title: h[2], fields: {}, tag: '', raw: [line], key: h[2] }; items.set(cur.no, cur); continue; }
    if (!cur) { (items.size ? foot : head).push(line); continue; }
    if (/^#{1,6} /.test(line)) { cur = null; foot.push(line); continue; }
    cur.raw.push(line);
    cur.key += '\n' + line;
    const f = zh ? line.match(/^- (成本|说人话|收益|证据等级|来源|备注)：\s*(.*)$/) : line.match(/^- (Chi phí|Nói dễ hiểu|Lợi ích|Mức chứng cứ|Nguồn|Ghi chú):\s*(.*)$/);
    if (f) cur.fields[zh ? ZH_FIELD[f[1]] : f[1]] = f[2];
    const t = zh ? line.match(/^<!--\s*成本标签:\s*(.*?)\s*-->/) : line.match(/^<!--\s*nhan-chi-phi:\s*(.*?)\s*-->/);
    if (t) cur.tag = zh
      ? t[1].split(/\s+/).map(kv => { const [k, v] = kv.split('='); return TAG_MAP[k]?.[v] ?? `?${kv}`; }).sort().join(' ')
      : t[1].split(/\s+/).sort().join(' ');
  }
  for (const it of items.values()) it.key = it.key.trimEnd();
  return { head: head.join('\n').trim(), items, foot: foot.join('\n').trim() };
}

// Giá trị số. Bản TQ: "." thập phân, "," ngăn nghìn nếu có, đơn vị 万/亿/千.
// Bản VN: "." ngăn nghìn, "," thập phân, đơn vị vạn/triệu/tỷ/nghìn.
// So theo giá trị để "1.5" (TQ) khớp "1,5" (VN), "3 万" khớp "3 vạn" hay "30.000".
// round làm tròn về 12 chữ số có nghĩa, tránh sai số nhị phân khi nhân lên cỡ 1e10
// (285.4 亿 ra 28539999999.999996 nếu chỉ làm tròn 1e-6).
function round(n) { return Number(n.toPrecision(12)); }
function zhNumbers(s) {
  // Bỏ ngăn nghìn "," theo nhóm ba chữ số, mọi nhóm một lượt (623,486,000,000).
  const t = s.replace(/\d{1,3}(?:,\d{3})+(?!\d)/g, m => m.replace(/,/g, ''));
  // 万亿 đứng đầu để không bị 万 nuốt mất; 千 không tính khi là 千克/千米/千卡/千瓦/千焦/千帕/千赫.
  // 余/多 (hơn) có thể đứng giữa số và đơn vị: "400 余万" = hơn 400 vạn, "30 多万" = hơn 30 vạn.
  // Số đứng một mình với 余/多 ("20 余家") vẫn đọc là 20.
  const mult = { '万亿': 1e12, '万': 1e4, '亿': 1e8, '千': 1e3 };
  return [...t.matchAll(/(\d*\.?\d+)\s*(?:[余多]\s*)?(万亿|万|亿|千(?![克米卡瓦焦帕赫]))?/g)].map(m => round(Number(m[1]) * (mult[m[2]] || 1)));
}
function vnNumbers(s) {
  // Bỏ ngăn nghìn "." theo nhóm ba chữ số, mọi nhóm một lượt (623.486.000.000).
  let t = s.replace(/\d{1,3}(?:\.\d{3})+(?!\d)/g, m => m.replace(/\./g, ''));
  t = t.replace(/(\d),(\d)/g, '$1.$2');
  // nghìn tỷ đứng đầu để không bị tỷ hay nghìn nuốt mất.
  const mult = { 'nghìn tỷ': 1e12, 'vạn': 1e4, 'tỷ': 1e9, 'triệu': 1e6, 'nghìn': 1e3, 'ngàn': 1e3 };
  return [...t.matchAll(/(\d*\.?\d+)\s*(?:(nghìn tỷ|vạn|tỷ|triệu|nghìn|ngàn)(?![\p{L}\p{N}]))?/giu)]
    .map(m => round(Number(m[1]) * (mult[(m[2] || '').toLowerCase()] || 1)));
}
// Các phần (NN) bản gốc có mà VN chưa có. zhFiles là danh sách đường dẫn book/ ở ref gốc.
function missingParts(zhFiles, vnParts) {
  return zhFiles.map(f => f.match(/^book\/(\d\d)-.*\.md$/)?.[1]).filter(nn => nn && !vnParts.includes(nn)).sort();
}
const bag = arr => { const m = new Map(); for (const n of arr) m.set(n, (m.get(n) || 0) + 1); return m; };

const marker = v => {
  const tq = (v || '').match(/^Chỉ tham khảo TQ[:：]\s*/);
  const rest = tq ? v.slice(tq[0].length) : (v || '');
  return rest.startsWith('Tranh cãi');
};
const countRe = (s, re) => ((s || '').match(re) ?? []).length;
const hanLines = v => v.raw.filter(l => !/^- Nguồn:/.test(l) && /[一-鿿]/.test(l)).length;

let totalBad = 0;
// --all chỉ đi qua các phần có trong book/ của VN, nên phần bản gốc thêm mới phải báo riêng.
// Thêm phần là việc hỏi chủ sách (CLAUDE.md, "Cách làm việc"), không tự thêm.
if (all) {
  for (const nn of missingParts(zhFiles, parts)) {
    console.log(`phần ${nn}: bản gốc có, VN chưa có (hỏi chủ sách)`);
    totalBad++;
  }
}
for (const p of parts) {
  const vnFile = readdirSync(resolve(ROOT, 'book')).find(f => f.startsWith(`${p}-`));
  const zhFile = zhFiles.find(f => f.startsWith(`book/${p}-`));
  if (!zhFile) { console.log(`phần ${p}: VN có, bản gốc ở ${ref} chưa có`); totalBad++; continue; }
  const sinceFile = sinceFiles.find(f => f.startsWith(`book/${p}-`));
  const vn = parse(readFileSync(resolve(ROOT, 'book', vnFile), 'utf8'), false);
  const zh = parse(git(['show', `${ref}:${zhFile}`]), true);
  // Phần chưa có ở --since (vd. phần 34 mới thêm trong khoảng đó): mọi mục coi là mới.
  const old = sinceFile ? parse(git(['show', `${since}:${sinceFile}`]), true) : { head: '', items: new Map() };
  const oldKeys = new Set([...old.items.values()].map(x => x.key));
  // Ghép mục cũ cho ⑦: theo tiêu đề trước (đầu tiên trong phần), không có thì theo số.
  const oldByTitle = new Map();
  for (const it of old.items.values()) if (!oldByTitle.has(it.title)) oldByTitle.set(it.title, it);
  const vnFrozen = frozen ? parse(git(['show', `${frozen}:book/${vnFile}`]), false) : null;
  const bad = [];
  if (vn.items.size !== zh.items.size) bad.push(`số mục: gốc ${zh.items.size} / VN ${vn.items.size}`);
  if (vnFrozen && zh.head === old.head && vn.head !== vnFrozen.head) bad.push('mở đầu phần: bản gốc không đổi nhưng bản VN bị sửa');
  if (vnFrozen && vn.foot !== vnFrozen.foot) bad.push('phần cuối (sau các mục) bị sửa');
  for (const [no, z] of zh.items) {
    const v = vn.items.get(no);
    if (!v) { bad.push(`mục ${no}: VN chưa có (gốc: ${z.title.slice(0, 40)})`); continue; }
    if (z.tag !== v.tag) bad.push(`mục ${no}: thẻ chi phí gốc [${z.tag}] / VN [${v.tag}]`);
    const zg = (z.fields['Mức chứng cứ'] || '').trim()[0], vg = (v.fields['Mức chứng cứ'] || '').trim()[0];
    if (zg !== vg) bad.push(`mục ${no}: Mức chứng cứ gốc ${zg} / VN ${vg}`);
    const zs = (z.fields['Nguồn'] || '').trim(), vs = (v.fields['Nguồn'] || '').trim();
    if (zs !== vs && !(zs.startsWith('作者经验') && vs.startsWith('Kinh nghiệm tác giả'))) bad.push(`mục ${no}: dòng Nguồn khác nguyên văn gốc`);
    const zt = (z.fields['Ghi chú'] || '').startsWith('争议');
    if (zt !== marker(v.fields['Ghi chú'])) bad.push(`mục ${no}: Tranh cãi ở đầu Ghi chú: gốc ${zt ? 'có' : 'không'} / VN ${zt ? 'không' : 'có'}`);
    const lz = countRe(z.fields['Ghi chú'], /https?:\/\//g), lv = countRe(v.fields['Ghi chú'], /https?:\/\//g);
    if (lz !== lv) bad.push(`mục ${no}: số link trong Ghi chú gốc ${lz} / VN ${lv}`);
    if (hanLines(v)) bad.push(`mục ${no}: còn chữ Hán ngoài dòng Nguồn (${hanLines(v)} dòng)`);
    if (oldKeys.has(z.key)) {
      const f = vnFrozen?.items.get(no);
      if (f && f.raw.join('\n') !== v.raw.join('\n')) bad.push(`mục ${no}: bản gốc không đổi nhưng bản VN bị sửa`);
      continue;
    }
    const zText = z.raw.filter(l => !/^- 来源：/.test(l) && !/^<!--/.test(l)).join('\n');
    const vText = v.raw.filter(l => !/^- Nguồn:/.test(l) && !/^<!--/.test(l)).join('\n');
    // Chỉ đòi các giá trị mà mục gốc có nhiều lần hơn mục cũ, và chỉ cần có mặt ≥ 1 lần bên VN.
    const oldItem = oldByTitle.get(z.title) ?? old.items.get(no) ?? null;
    const oldText = oldItem ? oldItem.raw.filter(l => !/^- 来源：/.test(l) && !/^<!--/.test(l)).join('\n') : '';
    const cntOld = bag(zhNumbers(oldText));
    const need = [...bag(zhNumbers(zText))].filter(([k, c]) => c > (cntOld.get(k) || 0)).map(([k]) => k);
    const vVals = new Set(vnNumbers(vText));
    const miss = need.filter(k => !vVals.has(k));
    if (miss.length) bad.push(`mục ${no}: số của gốc thiếu bên VN: ${miss.join(', ')}`);
  }
  for (const no of vn.items.keys()) if (!zh.items.has(no)) bad.push(`mục ${no}: gốc không có`);
  totalBad += bad.length;
  console.log(bad.length ? `phần ${p}: ${bad.length} lệch\n${bad.map(s => '  ' + s).join('\n')}` : `phần ${p}: khớp (${zh.items.size} mục)`);
}
process.exit(totalBad ? 1 : 0);
