# Kế hoạch đồng bộ đợt 1 với bản gốc (5881ed0 → 0cec2b3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Đưa bản tiếng Việt từ trạng thái bản gốc ngày 2026-09-30 (`5881ed0`, 641 mục) lên trạng thái bản gốc ngày 2026-10-08 (`0cec2b3`, 672 mục). Giọng "người thầy" đã duyệt phải giữ nguyên, và bộ công cụ làm ra phải dùng lại được cho các đợt đồng bộ sau.

**Architecture:** Trước hết thêm năm công cụ đồng bộ: đối chiếu từng mục với bản gốc, sinh danh sách việc, dồn số mục, tha trích dẫn đang chờ, phát việc cho worker. Sau đó dọn 8 chỗ lệch có sẵn, rồi làm commit gộp mục `bd95d3e`, vì mọi commit sau của bản gốc dùng số mục đã dồn. Tiếp theo đồng bộ 27 phần, mỗi phần một worktree và một commit, chạy song song được. Cuối cùng làm bài dài, README, CLAUDE.md, rồi chốt bằng `git merge -s ours` để merge-base nhảy lên `0cec2b3`.

**Tech Stack:** Node.js ≥ 22 (script `.mjs` không phụ thuộc ngoài), bash, git worktree, các CLI worker (claude, agy, grok, devin) như đợt viết lại giọng.

**Spec:** Không có spec riêng. Yêu cầu lấy từ ba chỗ: `CLAUDE.md` (quy tắc dự án), `docs/superpowers/specs/2026-10-03-giong-van-nguoi-thay-design.md` (giọng văn), và mục "Bối cảnh" ngay dưới đây.

## Bối cảnh

Fork tách khỏi bản gốc ở `5881ed0` (2026-09-30). Bản gốc có thêm 69 commit tới `0cec2b3` (2026-10-08). Không merge thẳng được: fork đã đổi tên toàn bộ file `book/` và `docs/` sang tiếng Việt, nên git coi đó là xóa rồi tạo mới. Cả 34 chương cũng đã viết lại giọng, nên không dịch lại cả mục mà chỉ vá phần bản gốc đổi.

| Loại thay đổi của bản gốc | Số lượng |
|---|---|
| Mục giữ nguyên | 506/641 |
| Mục xóa hoặc gộp (`bd95d3e`), làm dồn số ở phần 2, 3, 5, 10, 19, 22, 24 | 7 |
| Mục sửa sau khi gộp | 74, gồm cả mục đổi tiêu đề |
| Mục mới, tất cả nối cuối phần | 38 |
| Đoạn mở đầu phần có khối dẫn đường nhóm mục (issue #75) | 13 phần |
| Bài dài mới / bài dài cũ có sửa | 4 / 4 |
| Sửa giao diện index.html | 5 commit |

Chạy thử `tools/check-sync.mjs` (Task 1) trên bản dịch hiện tại cho thấy 7 chỗ lệch có sẵn. Ngoài ra còn một link hỏng ở phần 26. Task 2 dọn cả 8 chỗ.

## Quyết định đã chốt

Anh muốn đổi quyết định nào thì báo trước khi chạy task tương ứng.

- **Không port `tools/check-links.mjs` và `links.yml`.** Dòng Nguồn của fork chép nguyên văn bản gốc. Bản gốc chạy kiểm link mỗi tuần và tự sửa, nên đợt đồng bộ sau tự mang bản sửa sang.
- **Hoãn `tools/lib/split-items.mjs`** (tách trường dài cho EPUB, PDF, web). Quy tắc tách dựa vào dấu câu và từ mở đầu tiếng Trung nên phải viết lại từ đầu, mà nó chỉ đổi cách trình bày.
- **Không dịch `docs/核实记录/`** (~30 file ghi chép kiểm chứng mới). Task 18 thêm một file trỏ đường trong `docs/ghi-chep-kiem-chung/`.
- **README không lấy** nhóm QQ, email hợp tác, mini program WeChat, app iOS, badge và câu "viết với Claude Code" của tác giả gốc. **Có viết** một câu tuyên bố không phát token cho fork.
- **CLAUDE.md không port** các quy tắc viết mục mới của bản gốc (không viết mục trùng, bốn câu hỏi trước khi thêm, chia subagent), vì bản tiếng Việt không tự viết mục. Thay vào đó thêm mục "Đồng bộ với bản gốc".

## Global Constraints

- Nhánh làm việc: `dong-bo-upstream-dot-1`, tách từ `main`. Commit message tiếng Việt, kết thúc bằng dòng `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Mỗi phần `book/` một commit.
- Đích của đợt này ghim ở `0cec2b3`. Mọi lệnh dùng `SYNC_TO=0cec2b3` hoặc ref `0cec2b3`, không dùng `upstream/main`, vì bản gốc commit gần như mỗi ngày.
- Mốc "đã đồng bộ tới đâu" là `git merge-base HEAD upstream/main`. Lúc bắt đầu, mốc này là `5881ed0`. Nó chỉ đổi ở Task 19 khi `git merge -s ours 0cec2b3`.
- Sau Task 5, sách ở trạng thái của `bd95d3e`. Các task đồng bộ từng phần (Task 7–14) chạy với `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3`.
- Field mục: `Chi phí:` / `Nói dễ hiểu:` / `Lợi ích:` / `Mức chứng cứ:` / `Nguồn:` / `Ghi chú:`, dấu `:` ASCII.
- Thẻ: `<!-- nhan-chi-phi: tien=.. thoi-gian=.. y-chi=.. loi-ich=.. quy-mo=.. -->`. Bảng quy đổi từ 成本标签: 钱 0/少/多 → `tien=0/it/nhieu`; 时间 少/中/多 → `thoi-gian=it/vua/nhieu`; 毅力 否/些/是 → `y-chi=khong/chut/nhieu`; 收益 大/中/小 → `loi-ich=lon/vua/nho`; 口径 死亡率/金钱/时间/自由 → `quy-mo=tu-vong/tien/thoi-gian/tu-do`.
- `Nguồn:` chép nguyên văn phần sau `- 来源：` của bản gốc, không dịch, không sửa ký tự nào.
- Ghi chú mở đầu `Tranh cãi` khi `备注` của gốc mở đầu `争议`. Mục dựa luật, chính sách, thủ tục hay hotline Trung Quốc mở đầu `Chỉ tham khảo TQ: `, đứng trước `Tranh cãi`.
- Trích chéo `phần X, mục Y` / `mục Y`, luôn kèm anchor khớp tiêu đề đích. Điều luật viết `Điều N`. Cấm chỉ đường tương đối.
- Số viết kiểu Việt: chấm ngăn nghìn, phẩy thập phân. Tiền Trung Quốc ghi `nhân dân tệ`. Từ sáu chữ số trở lên viết `khoảng X vạn (giá trị chuẩn ...)`.
- `Nói dễ hiểu:` 2–4 câu, ≤ 60 từ, không thuật ngữ nghiên cứu, không số mới.
- Mục và đoạn mở đầu mà bản gốc không đổi: không động một chữ.
- Mốc số liệu `node tools/sync-stats.mjs` phải in ra:
  - sau Task 2: `Mục 641 ｜ phần 34 ｜ A 425 B 165 C 51 ｜ tranh cãi 60`, `link 1443`, hiệu quả chi phí 109 / 292 / 240;
  - sau Task 5: `Mục 634`, `A 421 B 164 C 49`, `tranh cãi 58`, `link 1436`, hiệu quả chi phí 109 / 289 / 236;
  - sau Task 14: `Mục 672`, `A 438 B 179 C 55`, `tranh cãi 70`, `link 1703`, hiệu quả chi phí 114 / 304 / 254.
  Các số này lấy từ README của bản gốc ở `5881ed0`, `bd95d3e`, `0cec2b3`.
- Không push, không mở PR khi chưa hỏi anh (Task 19).

## Review Focus

1. **Worker viết lại câu bản gốc không đổi**, làm mất giọng đã duyệt. Mong đợi: các câu đó giữ nguyên từng ký tự. Chặn bằng `check-sync --frozen HEAD`, test ở Task 1 bước 5.
2. **Trích chéo trỏ tới mục mới của phần chưa đồng bộ.** Lúc làm song song thì được tha, nhưng hết đợt phải về 0. Test ở Task 1 bước 9. Task 19 chạy `check-refs.mjs --check` thường, không dùng bản tha.
3. **`renumber.mjs` đổi nhầm số không phải trích dẫn** (số điều luật, số liệu). Mong đợi: chỉ trích dẫn đổi, mọi trích còn lại trỏ đúng tiêu đề cũ. Test ở Task 4 bước 3, so bảng đối chiếu trước và sau.
4. **Đơn vị 万/亿 dịch sai bậc** ("44.8 万" thành "44,8 nghìn"). Mong đợi: check-sync báo thiếu số. Test bằng `--self-test` ở Task 1 bước 3.
5. **Nhảy đích giữa chừng.** Có người `git fetch upstream` giữa đợt, phần làm sau dịch tới commit mới hơn phần làm trước. Mong đợi: mọi lệnh dùng `0cec2b3`. Task 6 bước 2 kiểm `sync-worker.sh` báo lỗi khi ref không tồn tại, và mọi lệnh trong Task 7–14 ghi rõ `SYNC_TO=0cec2b3`.

---

## Pha 0 — Công cụ và dọn nền

### Task 1: Nhánh làm việc và ba công cụ đối chiếu

**Files:**
- Create: `tools/check-sync.mjs`
- Create: `tools/sync-worklist.mjs`
- Create: `tools/check-refs-pending.mjs`
- Add: `docs/superpowers/plans/2026-10-08-dong-bo-upstream.md` (file này)

**Interfaces:**
- Produces:
  - `node tools/check-sync.mjs <NN|--all> [ref=upstream/main] [--since <ref>] [--frozen <ref>]`. Exit 0 khi khớp, 1 khi lệch, 2 khi sai tham số hoặc thiếu remote. `--since` mặc định là `git merge-base HEAD upstream/main`.
  - `node tools/sync-worklist.mjs <NN|--all> [--from <ref>] [--to <ref>]`. In danh sách `SỬA mục N [hash]`, `MỚI mục N [hash]`, `MỞ ĐẦU PHẦN đổi`, `DỒN SỐ`.
  - `node tools/check-refs-pending.mjs [ref]`. Như `check-refs.mjs --check`, nhưng tha trích tới mục có ở bản gốc `ref` mà bên VN chưa có.

- [ ] **Step 1: Tạo nhánh, kiểm remote upstream**

```bash
git switch -c dong-bo-upstream-dot-1
git remote get-url upstream || git remote add upstream https://github.com/eternity4719/HowToLiveBetter
git fetch upstream
git cat-file -e 0cec2b3^{commit} && git merge-base HEAD upstream/main
```

Expected: dòng cuối là `5881ed024de68f8376571d5a0633f0994614ea05`.

- [ ] **Step 2: Viết `tools/check-sync.mjs`**

```js
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
//   ⑦ giá trị số trong mục gốc (trừ 来源) phải có trong mục VN, đủ số lần — chỉ
//     kiểm mục gốc đã đổi so với --since: mục không đổi đã dịch từ trước, bản
//     dịch cũ có chỗ gộp câu làm số lặp ít đi, kiểm cả thì nhiễu che mất lỗi
//     của đợt này
//   ⑧ ngoài dòng Nguồn không còn chữ Hán
//   ⑨ (khi có --frozen) mục và đoạn mở đầu phần mà bản gốc không đổi kể từ
//     --since thì bản VN phải giữ nguyên từng chữ như ở <ref>: cả 34 chương đã
//     viết lại giọng, đồng bộ chỉ được vá chỗ gốc đổi
// Lỗi → exit 1, in từng chỗ lệch.
// Tách dòng bằng /\r?\n/, lý do xem đầu check-refs.mjs.
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const SELF_TEST = argv.includes('--self-test');
const opt = name => { const i = argv.indexOf(name); if (i < 0) return null; const v = argv[i + 1]; argv.splice(i, 2); return v; };
const sinceArg = opt('--since');
const frozen = opt('--frozen');
const all = argv[0] === '--all';
if (SELF_TEST) argv.splice(0, argv.length, '00');
const ref = argv[1] || 'upstream/main';
const parts = all
  ? readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).map(f => f.slice(0, 2)).sort()
  : [argv[0]];
if (!SELF_TEST && (!parts[0] || !/^\d\d$/.test(parts[0]))) { console.error('cần: <NN> [ref] hoặc --all [ref], tùy chọn --since <ref> --frozen <ref>'); process.exit(2); }

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
  ];
  let fail = 0;
  for (const [got, want] of cases) if (JSON.stringify(got) !== JSON.stringify(want.map(n => Math.round(n * 1e6) / 1e6))) { fail++; console.log(`SAI: được ${JSON.stringify(got)}, cần ${JSON.stringify(want)}`); }
  console.log(fail ? `self-test: ${fail} ca sai` : `self-test: đạt ${cases.length} ca`);
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
function parse(text, zh) {
  const items = new Map();
  const head = [];
  let cur = null;
  for (const line of text.normalize('NFC').split(/\r?\n/)) {
    const h = line.match(/^### (\d+)\. (.*)$/);
    if (h) { cur = { no: Number(h[1]), title: h[2], fields: {}, tag: '', raw: [line], key: h[2] }; items.set(cur.no, cur); continue; }
    if (!cur) { head.push(line); continue; }
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
  return { head: head.join('\n').trim(), items };
}

// Giá trị số. Bản TQ: "." thập phân, "," ngăn nghìn nếu có, đơn vị 万/亿/千.
// Bản VN: "." ngăn nghìn, "," thập phân, đơn vị vạn/triệu/tỷ/nghìn.
// So theo giá trị để "1.5" (TQ) khớp "1,5" (VN), "3 万" khớp "3 vạn" hay "30.000".
function round(n) { return Math.round(n * 1e6) / 1e6; }
function zhNumbers(s) {
  let t = s, prev;
  do { prev = t; t = t.replace(/(\d),(\d{3})(?!\d)/g, '$1$2'); } while (t !== prev);
  const mult = { '万': 1e4, '亿': 1e8, '千': 1e3 };
  return [...t.matchAll(/(\d*\.?\d+)\s*(万|亿|千)?/g)].map(m => round(Number(m[1]) * (mult[m[2]] || 1)));
}
function vnNumbers(s) {
  let t = s, prev;
  do { prev = t; t = t.replace(/(\d)\.(\d{3})(?!\d)/g, '$1$2'); } while (t !== prev);
  t = t.replace(/(\d),(\d)/g, '$1.$2');
  const mult = { 'vạn': 1e4, 'tỷ': 1e9, 'triệu': 1e6, 'nghìn': 1e3, 'ngàn': 1e3 };
  return [...t.matchAll(/(\d*\.?\d+)\s*(?:(vạn|tỷ|triệu|nghìn|ngàn)(?![\p{L}\p{N}]))?/giu)]
    .map(m => round(Number(m[1]) * (mult[(m[2] || '').toLowerCase()] || 1)));
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
for (const p of parts) {
  const vnFile = readdirSync(resolve(ROOT, 'book')).find(f => f.startsWith(`${p}-`));
  const zhFile = zhFiles.find(f => f.startsWith(`book/${p}-`));
  const sinceFile = sinceFiles.find(f => f.startsWith(`book/${p}-`));
  const vn = parse(readFileSync(resolve(ROOT, 'book', vnFile), 'utf8'), false);
  const zh = parse(git(['show', `${ref}:${zhFile}`]), true);
  const old = parse(git(['show', `${since}:${sinceFile}`]), true);
  const oldKeys = new Set([...old.items.values()].map(x => x.key));
  const vnFrozen = frozen ? parse(git(['show', `${frozen}:book/${vnFile}`]), false) : null;
  const bad = [];
  if (vn.items.size !== zh.items.size) bad.push(`số mục: gốc ${zh.items.size} / VN ${vn.items.size}`);
  if (vnFrozen && zh.head === old.head && vn.head !== vnFrozen.head) bad.push('mở đầu phần: bản gốc không đổi nhưng bản VN bị sửa');
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
    const vb = bag(vnNumbers(vText));
    const miss = [...bag(zhNumbers(zText))].filter(([k, c]) => (vb.get(k) || 0) < c).map(([k, c]) => `${k}×${c}`);
    if (miss.length) bad.push(`mục ${no}: số của gốc thiếu bên VN: ${miss.join(', ')}`);
  }
  for (const no of vn.items.keys()) if (!zh.items.has(no)) bad.push(`mục ${no}: gốc không có`);
  totalBad += bad.length;
  console.log(bad.length ? `phần ${p}: ${bad.length} lệch\n${bad.map(s => '  ' + s).join('\n')}` : `phần ${p}: khớp (${zh.items.size} mục)`);
}
process.exit(totalBad ? 1 : 0);
```

- [ ] **Step 3: Chạy self-test phần đọc số**

Run: `node tools/check-sync.mjs --self-test`
Expected: `self-test: đạt 8 ca`, exit 0.

- [ ] **Step 4: Chạy trên bản dịch hiện tại, phải ra đúng 7 chỗ lệch có sẵn**

Run: `node tools/check-sync.mjs --all 5881ed0 > "$TMPDIR/cs.txt"; echo "exit=$?"; grep -v ': khớp' "$TMPDIR/cs.txt"`
Expected: `exit=1`, rồi đúng các dòng sau:

```
phần 02: 3 lệch
  mục 26: Tranh cãi ở đầu Ghi chú: gốc có / VN không
  mục 28: dòng Nguồn khác nguyên văn gốc
  mục 42: Tranh cãi ở đầu Ghi chú: gốc có / VN không
phần 06: 1 lệch
  mục 25: dòng Nguồn khác nguyên văn gốc
phần 08: 1 lệch
  mục 22: Mức chứng cứ gốc A / VN B
phần 10: 1 lệch
  mục 20: dòng Nguồn khác nguyên văn gốc
phần 31: 1 lệch
  mục 1: dòng Nguồn khác nguyên văn gốc
```

- [ ] **Step 5: Test kiểm "không được động câu bản gốc không đổi"**

```bash
perl -0pi -e 's/^(- Chi phí: )/$1X /m' book/15-*.md
node tools/check-sync.mjs 15 5881ed0 --frozen HEAD; echo "exit=$?"
git checkout -- book/15-*.md
```

Expected: `mục 1: bản gốc không đổi nhưng bản VN bị sửa`, `exit=1`.

- [ ] **Step 6: Viết `tools/sync-worklist.mjs`**

```js
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
```

- [ ] **Step 7: Test danh sách việc**

```bash
node tools/sync-worklist.mjs 22 --to 0cec2b3
node tools/sync-worklist.mjs 22 --from bd95d3e --to 0cec2b3
node tools/sync-worklist.mjs 15 --from bd95d3e --to 0cec2b3
```

Expected:
- Lệnh 1 có dòng `DỒN SỐ: commit bd95d3e ...` và dòng `SỬA mục 10 [37e63ea] 选住处时把周边绿地算进去…`.
- Lệnh 2 chỉ có `SỬA mục 10 [37e63ea]` và danh sách commit.
- Lệnh 3 in `phần 15: không có việc (bd95d3e..0cec2b3)`.

- [ ] **Step 8: Viết `tools/check-refs-pending.mjs`**

```js
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
```

- [ ] **Step 9: Test tha trích chờ, và không tha trích sai**

```bash
node tools/check-refs-pending.mjs 0cec2b3; echo "exit=$?"
perl -0pi -e 's/^- Ghi chú: /- Ghi chú: Xem thêm phần 1, mục 43 (hỏi thẳng người có ý nghĩ tự sát). /m' book/08-*.md
node tools/check-refs-pending.mjs 0cec2b3; echo "exit=$?"
perl -pi -e 's/phần 1, mục 43 \(hỏi/phần 1, mục 99 (hỏi/' book/08-*.md
node tools/check-refs-pending.mjs 0cec2b3 > "$TMPDIR/rp.txt"; echo "exit=$?"; tail -1 "$TMPDIR/rp.txt"
git checkout -- book/08-*.md
```

Expected:
- Lần 1: `check-refs: đạt, 765 trích dẫn`, `exit=0`.
- Lần 2: `chờ phần khác đồng bộ: ... trích "phần 1, mục 43"`, rồi `check-refs: đạt, chỉ còn 1 trích chờ mục mới của phần khác`, `exit=0`.
- Lần 3: `check-refs: KHÔNG ĐẠT (1 lỗi ngoài các trích chờ)`, `exit=1`.

- [ ] **Step 10: Commit**

```bash
git add tools/check-sync.mjs tools/sync-worklist.mjs tools/check-refs-pending.mjs docs/superpowers/plans/2026-10-08-dong-bo-upstream.md
git commit -m "Thêm công cụ đối chiếu với bản gốc cho đợt đồng bộ upstream

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 2: Dọn 8 chỗ lệch có sẵn

**Files:**
- Modify: `book/02-dung-chet-tu-tu.md` (mục 26, 28, 42)
- Modify: `book/06-danh-sach-nen-tranh.md` (mục 25)
- Modify: `book/08-dung-tu-chuoc-hoa-vao-than.md` (mục 22)
- Modify: `book/10-yeu-va-cuoi-co-dang-khong.md` (mục 20)
- Modify: `book/26-lam-mot-website-hoac-nen-tang.md` (link bài dài)
- Modify: `book/31-nhung-con-duong-sau-tuoi-muoi-tam.md` (mục 1)
- Modify (do sync-stats ghi): `README.md`, `index.html`, `tools/og.html`, `og.png`, `docs/bang-doi-chieu-trich-dan.md`

**Interfaces:**
- Consumes: `tools/check-sync.mjs` (Task 1).
- Produces: `node tools/check-sync.mjs --all 5881ed0` exit 0. Đây là nền cho Task 5.

- [ ] **Step 1: Chép lại nguyên văn bốn dòng Nguồn bị sửa lúc dịch**

Lưu đoạn sau vào `"$TMPDIR/restore-src.mjs"` (file dùng một lần, không commit):

```js
// Chép lại nguyên văn dòng 来源 của bản gốc ở <ref> vào dòng Nguồn của mục VN.
//   node restore-src.mjs <ref> <phần>:<mục> ...
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const [ref, ...targets] = process.argv.slice(2);
const git = a => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { encoding: 'utf8' });
const zhFiles = git(['ls-tree', '--name-only', ref, 'book/']).trim().split('\n');
const fieldOf = (text, n, re) => {
  let cur = 0;
  for (const l of text.split(/\r?\n/)) {
    const h = l.match(/^### (\d+)\./);
    if (h) { cur = Number(h[1]); continue; }
    if (cur === n && re.test(l)) return l;
  }
  return null;
};
for (const t of targets) {
  const [p, n] = t.split(':'); const no = Number(n);
  const zhLine = fieldOf(git(['show', `${ref}:${zhFiles.find(f => f.startsWith(`book/${p}-`))}`]), no, /^- 来源：/);
  const vf = `book/${readdirSync('book').find(f => f.startsWith(`${p}-`))}`;
  const text = readFileSync(vf, 'utf8');
  const vnLine = fieldOf(text, no, /^- Nguồn:/);
  if (!zhLine || !vnLine) { console.error(`${t}: không thấy dòng nguồn`); process.exit(1); }
  const next = `- Nguồn: ${zhLine.slice('- 来源：'.length)}`;
  if (text.split(vnLine).length !== 2) { console.error(`${t}: dòng Nguồn VN không duy nhất trong file`); process.exit(1); }
  writeFileSync(vf, text.replace(vnLine, () => next));
  console.log(`${t}: đã chép lại Nguồn từ ${ref}`);
}
```

Run (ở gốc repo): `node "$TMPDIR/restore-src.mjs" 5881ed0 02:28 06:25 10:20 31:1`
Expected: bốn dòng `đã chép lại Nguồn từ 5881ed0`.

- [ ] **Step 2: Đưa "Tranh cãi" lên đầu Ghi chú phần 2 mục 26 và 42**

`sync-stats.mjs` chỉ đếm mục tranh cãi khi Ghi chú mở đầu bằng "Tranh cãi", nên hai mục này đang làm số mục tranh cãi tụt 2. Dùng công cụ Edit (giữ nguyên kiểu xuống dòng của file), sửa bốn chỗ trong `book/02-dung-chet-tu-tu.md`:

| Tìm (duy nhất trong file) | Thay bằng |
|---|---|
| `- Ghi chú: Chỉ tham khảo TQ: phần điều tra độc tố nấm mốc của mục này làm ở Trung Quốc. Tranh cãi ở chỗ:` | `- Ghi chú: Chỉ tham khảo TQ: Tranh cãi ở chỗ:` |
| `Có người lo trà có độc tố nấm mốc. Ở Trung Quốc từng có người kiểm tra` | `Có người lo trà có độc tố nấm mốc, và hai cuộc điều tra về chuyện này đều làm ở Trung Quốc. Ở Trung Quốc từng có người kiểm tra` |
| `- Ghi chú: Chỉ tham khảo TQ: phần cuối mục này trích hướng dẫn ăn uống của Trung Quốc. Tranh cãi:` | `- Ghi chú: Chỉ tham khảo TQ: Tranh cãi:` |
| `Hướng dẫn ăn uống khuyến nghị mỗi người mỗi ngày dùng 25 đến 30 g dầu nấu ăn.` | `Hướng dẫn ăn uống của Trung Quốc khuyến nghị mỗi người mỗi ngày dùng 25 đến 30 g dầu nấu ăn.` |

- [ ] **Step 3: Trả Mức chứng cứ phần 8 mục 22 về A như bản gốc, sửa link bài dài ở phần 26**

```bash
perl -0pi -e 's/(### 22\. [^\n]*\n(?:(?!### )[^\n]*\n)*?- Mức chứng cứ: )B/${1}A/' book/08-*.md
perl -pi -e 's#\.\./docs/lam-nen-tang-phai-lam-nhung-giay-nao\.md#../docs/lam-nen-tang-can-nhung-giay-phep-gi.md#' book/26-*.md
git diff --stat
```

Expected: 6 file, mỗi file `1 insertion(+), 1 deletion(-)`, riêng `book/02` là `3 insertions, 3 deletions`.

- [ ] **Step 4: Kiểm nền sạch và số liệu khớp bản gốc ở 5881ed0**

```bash
node tools/check-sync.mjs --all 5881ed0 > "$TMPDIR/cs.txt"; echo "exit=$?"; grep -v ': khớp' "$TMPDIR/cs.txt"
node tools/sync-stats.mjs
node tools/check-refs.mjs --check | tail -1
```

Expected:
- `exit=0` và không dòng lệch nào.
- sync-stats in `Mục 641 ｜ phần 34 ｜ A 425 B 165 C 51 ｜ tranh cãi 60 ｜ TODO 2 ｜ link 1443`, và `Hiệu quả chi phí: cực cao 109 (17%) cao 292 (46%) trung bình 240 (37%)`.
- check-refs in `Kiểm tra trích dẫn đạt: cả 765 trích dẫn đều trỏ đúng và có anchor`.

- [ ] **Step 5: Commit**

```bash
git add book/02-*.md book/06-*.md book/08-*.md book/10-*.md book/26-*.md book/31-*.md README.md index.html tools/og.html og.png docs/bang-doi-chieu-trich-dan.md
git commit -m "Dọn 8 chỗ lệch bản gốc có từ lúc dịch: 4 dòng Nguồn, 2 Tranh cãi, 1 Mức chứng cứ, 1 link bài dài

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 3: Năm sửa giao diện của bản gốc cho index.html

Port năm commit giao diện `a10899e`, `2aba440`, `7fd85c4`, `bc149af`. Riêng phần dmSpy nằm trong `bc149af`. Fork có cùng cấu trúc với bản gốc ở `5881ed0`, nên các đoạn tìm–thay dưới đây là nguyên văn trong `index.html` của fork.

**Files:**
- Modify: `index.html`
- Create (chỉ ở máy, không commit): `.claude/launch.json` để mở trang tra cứu trong trình duyệt

**Interfaces:**
- Consumes: không.
- Produces: trong cửa sổ bài dài, `phần X, mục Y` bấm được; không còn `<!--` trần trong `<script>`.

- [ ] **Step 1: Ghi lỗi hiện tại**

Run: `grep -n '/^<!--' index.html`
Expected: `522:    if ((m = /^<!--\s*nhan-chi-phi:\s*(.*?)\s*-->/.exec(line)) && entry){`. Trong `<script>`, chuỗi `<!--` đưa bộ phân tích HTML vào trạng thái "script data escaped". Nếu sau đó có `<script`, thẻ `</script>` không đóng được script (PR #80 bên gốc).

- [ ] **Step 2: Sửa bằng công cụ Edit, từng cặp tìm–thay**

1. Tìm `.toc-sub a span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`, thay bằng `.toc-sub a span{display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`.
2. Tìm `if ((m = /^<!--\s*nhan-chi-phi:`, thay bằng `if ((m = /^\x3c!--\s*nhan-chi-phi:`.
3. Tìm `html{scroll-padding-top:calc(var(--nav-h) + 16px)}`, thay bằng:

```css
html{scroll-padding-top:calc(var(--nav-h) + 16px)}
/* Cửa sổ bài dài mở thì body đặt overflow:hidden, thanh cuộn biến mất, trang rộng thêm 15px,
   thẻ xuống dòng lại, cả trang giật một cái (bản gốc 2026-10-01). Giữ sẵn rãnh thanh cuộn */
html{scrollbar-gutter:stable}
```

4. Tìm `#xref-pop{position:absolute;z-index:60;`, thay bằng `#xref-pop{position:absolute;z-index:80;` (để nổi trên cửa sổ bài dài, z-index 70).
5. Tìm `POP.querySelector('.xp-go').addEventListener('click', () => { gotoItem(POP.dataset.go, POP.dataset.from); POP.hidden = true; });`, thay bằng:

```js
POP.querySelector('.xp-go').addEventListener('click', () => {
  // Bấm từ trong cửa sổ bài dài thì phải đóng cửa sổ trước mới thấy mục vừa nhảy tới
  if (!DM.mask.hidden) dmClose();
  gotoItem(POP.dataset.go, POP.dataset.from); POP.hidden = true;
});
```

6. Tìm dòng `// Offset của tiêu đề so với khung cuộn. Không dùng offsetTop: nó đo khoảng cách tới`, chèn lên trước nó:

```js
// Trích "phần X, mục Y" trong bài dài cũng phải bấm được (bản gốc 2026-10-01).
// dmRender trả chuỗi HTML, nên render xong mới duyệt từng text node đưa cho xrefInto;
// chữ trong link và code không động. Bài dài không có "phần này", "mục N" trần không
// trỏ mục sách, nên CUR_SEC đặt rỗng: xrefKeys không ra key nào thì để nguyên chữ.
function dmXrefs(root){
  const saved = CUR_SEC; CUR_SEC = '';
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT,
    { acceptNode: n => n.parentElement.closest('a,code') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = [];
  while (w.nextNode()) if (/(phần|mục)\s*\d/.test(w.currentNode.nodeValue)) nodes.push(w.currentNode);
  for (const n of nodes){
    const f = document.createDocumentFragment();
    xrefInto(f, n.nodeValue, []);
    n.replaceWith(f);
  }
  CUR_SEC = saved;
}
```

7. Tìm:

```js
DM.doc.addEventListener('scroll', () => {
  if (dmSpyTick) return; dmSpyTick = true;
```

thay bằng:

```js
DM.doc.addEventListener('scroll', () => {
  POP.hidden = true;                       // khung nổi đặt theo tọa độ trang, bài dài cuộn là lệch khỏi trích
  if (dmSpyTick) return; dmSpyTick = true;
```

8. Tìm:

```js
  DM.mask.hidden = true;
  document.body.style.overflow = '';
  DM.lastFocus?.focus?.();
```

thay bằng:

```js
  DM.mask.hidden = true;
  POP.hidden = true;
  document.body.style.overflow = '';
  DM.lastFocus?.focus?.({ preventScroll: true });   // không thì vừa "Nhảy tới" xong lại bị kéo về link cũ
```

9. Tìm `  DM.doc.innerHTML = r.html;`, thay bằng hai dòng `  DM.doc.innerHTML = r.html;` và `  dmXrefs(DM.doc);`.
10. Tìm `document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && !DM.mask.hidden){ ev.stopPropagation(); dmClose(); } }, true);`, thay bằng:

```js
// Esc đóng khung nổi trích dẫn trước, bấm lần nữa mới đóng cửa sổ bài dài
document.addEventListener('keydown', ev => {
  if (ev.key !== 'Escape' || DM.mask.hidden) return;
  ev.stopPropagation();
  if (!POP.hidden){ POP.hidden = true; return; }
  dmClose();
}, true);
```

11. Trong `function spy()`: tìm `    let hit = '', near = Infinity;`, thay bằng `    let hit = '';`. Rồi tìm cả khối:

```js
    for (const c of CARDS){
      // Không nhìn card.vis: đó là cờ render do CARD_IO duy trì, chậm hơn cuộn. Đo trực tiếp
      // vị trí, cái nào cao 0 là đang bị bộ lọc giấu, bỏ qua luôn.
      const r = c.el.getBoundingClientRect();
      if (!r.height || r.bottom <= 0 || r.top >= innerHeight) continue;
      if (r.top <= line && r.bottom > line){ hit = c.el.id; break; }   // ưu tiên cái cắt qua vạch phán định
      const d = Math.abs(r.top - line);
      if (d < near){ near = d; hit = c.el.id; }
    }
```

thay bằng:

```js
    // Chỉ nhìn tiêu đề: tiêu đề đầu tiên từ trên xuống không bị thanh đầu trang che là mục đang
    // đọc. Bản gốc đã thử ba cách khác (vạch ba phần mười, phần lộ ra nhiều hơn, đường giữa còn
    // trong màn hình) và đều có lúc sai (2026-10-05). Tiêu đề phần tính là tiêu đề mục 1 của phần
    // đó, không thì lúc đọc đoạn mở đầu và khối dẫn đường sẽ sáng mục cuối của phần trước. Màn
    // hình không có tiêu đề nào (một mục cao hơn một màn) thì lấy mục cuối có tiêu đề đã cuộn lên trên.
    const top = Math.max(0, document.querySelector('header.nav').getBoundingClientRect().bottom);
    const heads = [];                        // [mép trên tiêu đề, id mục]
    for (const b of BLOCKS){
      const r = b.el.getBoundingClientRect();
      if (!r.height) continue;
      const first = CARDS.find(c => c.el.closest('.sec-block') === b.el && c.el.getBoundingClientRect().height);
      if (first) heads.push([r.top, first.el.id]);
    }
    for (const c of CARDS){
      // Không nhìn card.vis: đó là cờ render do CARD_IO duy trì, chậm hơn cuộn. Cao 0 là đang bị lọc giấu.
      if (!c.el.getBoundingClientRect().height) continue;
      heads.push([c.el.querySelector('.card-h').getBoundingClientRect().top, c.el.id]);
    }
    heads.sort((x, y) => x[0] - y[0]);
    hit = heads.find(([t]) => t >= top && t < innerHeight)?.[1]
      || heads.filter(([t]) => t < top).pop()?.[1] || '';
```

12. Trong `function dmSpy()`: tìm `  const top = DM.doc.scrollTop + 90; let cur = DM.heads[0];`, thay bằng:

```js
  // Vạch phán định lấy ba phần mười trên như spy của trang chính. Trước là 90px từ đỉnh:
  // phần sau đã chiếm quá nửa màn mà mục lục vẫn sáng phần trước
  const top = DM.doc.scrollTop + Math.max(90, DM.doc.clientHeight * 0.3); let cur = DM.heads[0];
```

Bước 11 dựa vào class `sec-block` của khối phần. Kiểm trước: `grep -c "className='sec-block'" index.html` phải in `1`.

- [ ] **Step 3: Kiểm hết `<!--` trần trong script**

Run: `grep -n '/^<!--' index.html; grep -c 'x3c!--' index.html`
Expected: lệnh đầu không in gì, lệnh sau in `1`.

- [ ] **Step 4: Mở trang tra cứu, kiểm trong trình duyệt**

Tạo `.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "trang-tra-cuu", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765"], "port": 8765 }
  ]
}
```

Mở bằng `preview_start` với name `trang-tra-cuu`. Đợi trang nạp xong rồi chạy bằng javascript_tool:

```js
await dmOpen('docs/danh-muc-do-dung-khan-cap-gia-dinh.md');
[document.querySelectorAll('#dm-doc .xref').length, getComputedStyle(document.documentElement).scrollbarGutter]
```

Expected: số đầu ≥ 10 (bài này có 14 trích chéo), giá trị sau là `"stable"`. `read_console_messages` với `onlyErrors: true` không có lỗi. Bấm một `.xref` trong cửa sổ: khung nổi hiện trên cửa sổ. Bấm "Nhảy tới": cửa sổ đóng, trang cuộn tới mục đích. Cuộn trang chính qua hai phần: mục lục bên trái sáng đúng mục có tiêu đề ở đầu màn hình.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Port 5 sửa giao diện của bản gốc: thoát <!-- trong script, rãnh thanh cuộn, trích chéo bấm được trong bài dài, scrollspy theo tiêu đề

Theo upstream a10899e, 2aba440, 7fd85c4, bc149af.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 4: Công cụ dồn số mục `tools/renumber.mjs`

**Files:**
- Create: `tools/renumber.mjs`

**Interfaces:**
- Produces: `node tools/renumber.mjs [--dry] <phần>:<mục> ...`. Lệnh này xóa khối mục, đánh lại số mục sau nó, và sửa trích dẫn trong `book/` và `docs/*.md`. Trích trỏ vào chính mục bị xóa thì in `SỬA TAY <file>:<dòng>` và không tự sửa.

- [ ] **Step 1: Viết `tools/renumber.mjs`**

```js
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
```

- [ ] **Step 2: Chạy thử trong worktree tạm với đúng 7 mục bản gốc xóa**

```bash
WT=$(mktemp -d)/wt && git worktree add -q --detach "$WT" HEAD
cp tools/renumber.mjs "$WT/tools/"
cp docs/bang-doi-chieu-trich-dan.md "$WT/../truoc.md"
(cd "$WT" && node tools/renumber.mjs 2:14 3:17 5:38 10:15 19:9 22:5 24:5 | tail -6)
(cd "$WT" && for p in 02 03 05 10 19 22 24; do printf "$p %s\n" "$(grep -c '^### ' book/$p-*.md)"; done)
```

Expected:
- Bốn dòng `SỬA TAY`: `book/02-...:104` (phần 2, mục 14) và ba dòng ở `book/10-...` (phần 10, mục 15). Sau đó là `... 4 trích trỏ vào mục bị xóa cần sửa tay`.
- Số mục: `02 41`, `03 24`, `05 44`, `10 19`, `19 16`, `22 10`, `24 11`.

- [ ] **Step 3: So bảng đối chiếu trước và sau: chỉ hàng của mục bị xóa được đổi**

```bash
(cd "$WT" && node tools/check-refs.mjs >/dev/null)
rows(){ awk -F' \\| ' '/^## /{s=$0} /^\| /&&!/^\| (Nơi trích|---)/{print s" ‖ "$3}' "$1" | sort; }
diff <(rows "$WT/../truoc.md") <(rows "$WT/docs/bang-doi-chieu-trich-dan.md")
git worktree remove --force "$WT"
```

Expected: diff chỉ có hai loại dòng.
- Hàng biến mất vì nằm trong mục bị xóa: phần 5 một hàng, phần 19 sáu hàng, phần 22 một hàng, phần 24 một hàng, phần 2 một hàng.
- Hàng trỏ vào mục bị xóa, nay tiêu đề đích thành mục kế tiếp. Phần 2 có một hàng, nay là "Mỗi tuần chơi ba lần môn dùng vợt…". Phần 10 có ba hàng, nay là "Tính chi phí rút lui…". Đây đúng là bốn trích `SỬA TAY`, Task 5 sẽ sửa.

Ngoài hai loại trên mà có dòng nào khác thì `renumber.mjs` đã đổi nhầm. Dừng lại sửa tool trước khi commit.

- [ ] **Step 4: Commit**

```bash
git add tools/renumber.mjs
git commit -m "Thêm tools/renumber.mjs: xóa mục và dồn số kèm sửa trích dẫn

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 5: Áp commit gộp mục `bd95d3e` (641 → 634)

Commit này của bản gốc xóa 5 mục trùng (phần nội dung riêng chuyển sang mục giữ lại), gộp 2 cặp mục, thu hẹp vài chỗ chồng nhau, rồi dồn số và sửa trích dẫn toàn sách. Đọc thông điệp đầy đủ: `git log -1 --format=%B bd95d3e`.

**Files:**
- Modify: `book/02`, `03`, `04`, `05`, `06`, `07`, `08`, `09`, `10`, `11`, `13`, `16`, `17`, `19`, `22`, `24`, `28`, `29`, `33` (`*.md`)
- Modify: `docs/nhip-dong-ho-sinh-hoc-va-ca-dem.md`
- Modify: `README.md` (dòng mục lục phần 3 và 22), `CLAUDE.md` (tóm lược phần 3)
- Modify (do sync-stats ghi): `index.html`, `tools/og.html`, `og.png`, `docs/bang-doi-chieu-trich-dan.md`

**Interfaces:**
- Consumes: `tools/renumber.mjs` (Task 4), `tools/check-sync.mjs` (Task 1).
- Produces: sách ở trạng thái `bd95d3e`, tức `node tools/check-sync.mjs --all bd95d3e` exit 0. Task 7–14 dựa vào đây (`SYNC_FROM=bd95d3e`).

- [ ] **Step 1: Dồn số trước, sửa nội dung sau**

Thứ tự này bắt buộc. Câu mới mà bản gốc thêm vào trong commit này đã dùng số mục sau khi dồn. Nếu sửa nội dung trước rồi mới chạy renumber, các số trong câu mới sẽ bị dồn thêm một lần nữa.

Run: `node tools/renumber.mjs 2:14 3:17 5:38 10:15 19:9 22:5 24:5`
Expected: giống Task 4 bước 2 (4 dòng `SỬA TAY`).

Văn tiếng Việt của mục đã xóa vẫn xem được bằng `git show HEAD:book/<file>`. Dùng nó khi chuyển nội dung riêng sang mục giữ lại ở bước 2.

- [ ] **Step 2: Chuyển nội dung theo diff của bản gốc**

Với từng mục dưới đây, đọc diff tiếng Trung rồi vá vào mục tiếng Việt. Số mục ghi theo số **sau khi dồn**:

```bash
git show bd95d3e -- 'book/*' 'docs/生物钟和夜班.md'
```

| Mục VN (sau dồn) | Bản gốc làm gì |
|---|---|
| phần 6, mục 25 | nhận nội dung riêng của phần 3, mục 17 cũ (cố định mặc gì ăn gì), thêm thử nghiệm lặp lại lần hai Vohs 2021 |
| phần 10, mục 17 (mục 18 cũ) | nhận nội dung riêng của phần 10, mục 15 cũ (giá trị cảm xúc xem chất lượng quan hệ) |
| phần 7, mục 1 | nhận nội dung riêng của phần 19, mục 9 cũ (đăng ký thất nghiệp và cạnh tranh) |
| phần 9, mục 16 | nhận nội dung riêng của phần 22, mục 5 cũ (quán net dùng căn cước của mình) |
| phần 16, mục 5 | nhận nội dung riêng của phần 24, mục 5 cũ (bệnh viện tuyến ba kê thuốc); phần 24, mục 1 thêm chỉ đường sang đây |
| phần 2, mục 11 | gộp với phần 2, mục 14 cũ (số bước và thời gian vận động mỗi tuần) |
| phần 5, mục 15 | gộp với phần 5, mục 38 cũ (giao dịch thường xuyên, số liệu Mỹ và Sở Giao dịch Thượng Hải) |
| phần 11, mục 16 | chế tài lưu án chỉ sang phần 26, mục 4 |
| phần 13, mục 20 | rửa ít nhất 15 phút, chỉ sang phần 13, mục 21 |
| phần 8, mục 25; phần 3, mục 3; phần 3, mục 19 | thêm chỉ đường |
| phần 17, mục 4 và một Ghi chú ở phần 11 | bỏ cụm 挡箭牌 ("lá chắn") |

Bốn trích `SỬA TAY` ở bước 1: sửa theo cách bản gốc viết lại chúng trong cùng diff. Phần 2 trỏ về mục 11 đã gộp. Phần 10 trỏ về mục 17.

Mọi chỗ viết mới theo Global Constraints. Dòng Nguồn của mục bị đổi phải bằng nguyên văn dòng 来源 ở `bd95d3e`.

- [ ] **Step 3: Đối chiếu với bản gốc ở bd95d3e**

```bash
node tools/check-sync.mjs --all bd95d3e > "$TMPDIR/cs.txt"; echo "exit=$?"; grep -v ': khớp' "$TMPDIR/cs.txt"
node tools/check-plain.mjs | tail -1
node tools/check-refs.mjs --check | tail -3
```

Expected: `exit=0`. check-plain báo `không đạt 0`. check-refs báo `Kiểm tra trích dẫn đạt`. Nếu check-sync báo `số của gốc thiếu bên VN` ở một mục, mở `git diff 5881ed0 bd95d3e -- <file TQ>` xem số đó ở câu nào rồi bổ sung. Không thêm số vào chỗ khác chỉ để qua kiểm.

- [ ] **Step 4: Mục lục README và CLAUDE.md**

- Trong `README.md`, dòng `3. [Đừng lãng phí sức lực]...`: bỏ `, mệt quyết sách`.
- Trong `README.md`, dòng `22. [Thư giãn thế nào...]...`: bỏ `, tiệm nét thực danh`.
- Trong `CLAUDE.md`, dòng `3. Đừng lãng phí sức lực: ...`: bỏ `, mệt quyết sách`.

- [ ] **Step 5: Số liệu và bảng đối chiếu**

```bash
node tools/sync-stats.mjs
git diff --stat docs/bang-doi-chieu-trich-dan.md
```

Expected: `Mục 634 ｜ phần 34 ｜ A 421 B 164 C 49 ｜ tranh cãi 58` … `link 1436`, và `Hiệu quả chi phí: cực cao 109 (17%) cao 289 (46%) trung bình 236 (37%)`.

Soi diff của bảng đối chiếu theo quy tắc trong CLAUDE.md. Mọi hàng mà số mục đổi thì tiêu đề đích phải giữ nguyên, trừ các hàng của mục bị xóa hoặc gộp.

- [ ] **Step 6: Commit**

```bash
git add book docs/nhip-dong-ho-sinh-hoc-va-ca-dem.md docs/bang-doi-chieu-trich-dan.md README.md CLAUDE.md index.html tools/og.html og.png
git commit -m "Đồng bộ upstream bd95d3e: gộp 7 mục trùng, 641 → 634, dồn số và sửa trích dẫn toàn sách

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 6: Script phát việc `tools/sync-worker.sh`

**Files:**
- Create: `tools/sync-worker.sh`

**Interfaces:**
- Consumes: `tools/check-sync.mjs`, `tools/sync-worklist.mjs`, `tools/check-refs-pending.mjs` (Task 1).
- Produces: `SYNC_FROM=<ref> SYNC_TO=<ref> tools/sync-worker.sh <claude|agy|grok|devin|review|verify|take|drop> <NN> [loi.txt]`, cùng khuôn với `tools/rewrite-worker.sh`. Worktree nằm ở `../.HowToLiveBetter-sync/NN`.

- [ ] **Step 1: Viết `tools/sync-worker.sh`, rồi `chmod +x tools/sync-worker.sh`**

```bash
#!/usr/bin/env bash
# Phát lệnh "đồng bộ một phần với bản gốc" cho một CLI worker — giữ prompt chuẩn,
# cờ headless và bước kiểm chứng ở một chỗ. Làm theo khuôn tools/rewrite-worker.sh.
# Kế hoạch: docs/superpowers/plans/2026-10-08-dong-bo-upstream.md
#
#   tools/sync-worker.sh <claude|agy|grok|devin> <NN>            # đồng bộ phần NN
#   tools/sync-worker.sh <claude|agy|grok|devin> <NN> <loi.txt>  # sửa đúng các lỗi liệt kê
#   tools/sync-worker.sh review <NN>    # claude review bản trong worktree (KHÔNG sửa file)
#   tools/sync-worker.sh verify <NN>    # chạy lại kiểm chứng trong worktree
#   tools/sync-worker.sh take <NN>      # kiểm chứng lần cuối, chép file về working tree chính, xóa worktree
#   tools/sync-worker.sh drop <NN>      # bỏ worktree của phần
#   tools/sync-worker.sh -n <cli|review> <NN>   # chỉ in prompt + lệnh, không chạy
#
# Khoảng đồng bộ lấy từ biến môi trường:
#   SYNC_FROM (mặc định merge-base của HEAD với upstream/main: commit gốc cuối cùng
#             đã đồng bộ, vì mỗi đợt kết thúc bằng git merge -s ours)
#   SYNC_TO   (mặc định upstream/main)
# Đợt nào cũng nên ghim SYNC_TO vào một commit cố định: upstream commit gần như mỗi
# ngày, upstream/main trôi giữa chừng thì các phần làm sau dịch tới đích khác các
# phần làm trước.
#
# Mỗi phần làm trong worktree riêng (../.<tên-kho>-sync/NN, đổi bằng SYNC_WT_ROOT),
# lý do giống rewrite-worker.sh: check-plain và check-refs quét cả book/.
# Worker chỉ sửa file và chạy checker; KHÔNG commit.
set -euo pipefail
cd "$(dirname "$0")/.."
MAIN=$PWD

DRY=0
[ "${1:-}" = "-n" ] && { DRY=1; shift; }
CLI=${1:-}
CH=${2:-}
FIX=${3:-}
[ -n "$CLI" ] && [ -n "$CH" ] || { echo "cần: <claude|agy|grok|devin|review|verify|take|drop> <NN> [loi.txt]" >&2; exit 2; }
[[ $CH =~ ^[0-9]{2}$ ]] || { echo "số phần phải đủ hai chữ số: 05, 22" >&2; exit 2; }

git rev-parse -q --verify upstream/main >/dev/null || { echo "chưa có remote upstream: git remote add upstream https://github.com/eternity4719/HowToLiveBetter && git fetch upstream" >&2; exit 2; }
SYNC_FROM=${SYNC_FROM:-$(git merge-base HEAD upstream/main | cut -c1-7)}
SYNC_TO=${SYNC_TO:-upstream/main}
git rev-parse -q --verify "$SYNC_FROM^{commit}" >/dev/null || { echo "không thấy ref SYNC_FROM=$SYNC_FROM" >&2; exit 2; }
git rev-parse -q --verify "$SYNC_TO^{commit}" >/dev/null || { echo "không thấy ref SYNC_TO=$SYNC_TO" >&2; exit 2; }

FILE=$(ls "book/${CH}-"*.md 2>/dev/null | head -1)
[ -n "$FILE" ] || { echo "không thấy book/${CH}-*.md" >&2; exit 2; }
ZH=$(git -c core.quotepath=false ls-tree --name-only "$SYNC_TO" book/ | grep "^book/${CH}-" | head -1)
[ -n "$ZH" ] || { echo "bản gốc ở $SYNC_TO không có phần $CH" >&2; exit 2; }

WT_ROOT=${SYNC_WT_ROOT:-"$(cd .. && pwd)/.$(basename "$MAIN")-sync"}
WT="$WT_ROOT/$CH"
mkdir -p "$WT_ROOT/logs"

refs_total() { (cd "$1" && node tools/check-refs.mjs --check 2>/dev/null | sed -n 's/.*cả \([0-9][0-9]*\) trích dẫn.*/\1/p'); }

verify() {
  [ -d "$WT" ] || { echo "chưa có worktree $WT" >&2; return 2; }
  local ok=1 other
  echo "== kiểm chứng $FILE trong $WT ($SYNC_FROM..$SYNC_TO)"
  other=$(cd "$WT" && git -c core.quotepath=false status --porcelain | grep -v " ${FILE}\$" || true)
  [ -z "$other" ] || { echo "LỖI worker động vào file khác:"; echo "$other"; ok=0; }
  (cd "$WT" && node tools/check-sync.mjs "$CH" "$SYNC_TO" --since "$SYNC_FROM" --frozen HEAD) || ok=0
  (cd "$WT" && node tools/check-plain.mjs | tail -1) || ok=0
  (cd "$WT" && node tools/check-refs-pending.mjs "$SYNC_TO") || ok=0
  [ $ok = 1 ] && { echo "KẾT QUẢ: ĐẠT"; return 0; }
  echo "KẾT QUẢ: KHÔNG ĐẠT"; return 1
}

case $CLI in
  verify) verify; exit $? ;;
  drop)
    git worktree remove --force "$WT" 2>/dev/null || true
    echo "đã bỏ worktree phần $CH"; exit 0 ;;
  take)
    verify || { echo "chưa đạt, không chép" >&2; exit 1; }
    git diff --quiet HEAD -- "$FILE" || { echo "$FILE ở working tree chính đang có thay đổi chưa commit, không ghi đè" >&2; exit 1; }
    cp "$WT/$FILE" "$FILE"
    git worktree remove --force "$WT"
    echo "đã chép $FILE về working tree chính, worktree đã xóa"; exit 0 ;;
esac

SPEC=docs/superpowers/specs/2026-10-03-giong-van-nguoi-thay-design.md
PILOT=""
P=$(git log --format=%H -n1 --grep='^Viết lại giọng chương 22' HEAD || true)
[ -n "$P" ] && PILOT="Mốc giọng đã được chủ sách duyệt: git show $P:$(ls book/22-*.md)
Đọc 3-4 mục bất kỳ trong đó trước khi làm, bám nhịp câu và mức thân mật của nó."

WORKLIST=$(node tools/sync-worklist.mjs "$CH" --from "$SYNC_FROM" --to "$SYNC_TO")
CHECKS="node tools/check-sync.mjs $CH $SYNC_TO --since $SYNC_FROM --frozen HEAD && node tools/check-plain.mjs && node tools/check-refs-pending.mjs $SYNC_TO"

if [ "$CLI" = "review" ]; then
  read -r -d '' PROMPT <<EOF || true
Review file $FILE trong thư mục hiện tại — bản vừa đồng bộ với bản gốc tiếng
Trung trong khoảng $SYNC_FROM..$SYNC_TO. KHÔNG sửa file, KHÔNG chạy git ngoài
git show/diff/log.

Đọc trước: CLAUDE.md và $SPEC (giọng văn).
$PILOT

Danh sách việc của phần này:
$WORKLIST

Xem bản VN đã đổi gì: git diff HEAD -- $FILE
Xem bản gốc đổi gì:   git diff $SYNC_FROM $SYNC_TO -- "$ZH"

Đối chiếu từng mục trong danh sách việc:
1. Nghĩa: mỗi chỗ bản gốc đổi đã sang bản VN chưa, có lệch nghĩa, thêm hay mất
   dữ kiện, nói mạnh hơn hay yếu hơn gốc, làm nhẹ hay nặng hậu quả pháp lý không.
2. Giọng: câu mới có hợp giọng spec và hòa với câu cũ quanh nó không.
3. Phạm vi: có câu nào bản gốc không đổi mà bản VN bị viết lại không.
4. Marker: mục dựa luật/chính sách/thủ tục/hotline TQ có "Chỉ tham khảo TQ:"
   chưa; mục thuần y học không được đánh.
5. Khối dẫn đường đầu phần (nếu có): đủ nhóm, đủ số mục như gốc, mỗi mục kèm
   cụm chữ chép từ tiêu đề VN.

Mức báo lỗi: "Nói dễ hiểu" bị giới hạn 2-4 câu, ≤60 từ, ngắn hơn 说人话 của gốc
là bình thường; chỉ báo thiếu ý khi việc thiếu làm đổi phạm vi, điều kiện, chủ
thể, mức hậu quả. Lỗi có từ bản VN cũ ở câu bản gốc không đổi thì KHÔNG báo
(đợt này không được động vào câu đó).

Liệt kê lỗi theo dạng: [nghĩa|giọng|phạm vi|marker|dẫn đường] mục N: <vấn đề>
→ <đề xuất sửa ngắn>. Nếu không có vấn đề gì thì trả lời đúng một chữ "SẠCH".
EOF
elif [ -n "$FIX" ]; then
  [ -f "$FIX" ] || { echo "không thấy file lỗi $FIX" >&2; exit 2; }
  read -r -d '' PROMPT <<EOF || true
File $FILE trong thư mục hiện tại là bản đồng bộ đang dở, còn các lỗi dưới đây.
Sửa đúng các chỗ được nêu, không viết lại phần khác, không động file nào khác
ngoài $FILE, KHÔNG git add, KHÔNG git commit.

Quy tắc: CLAUDE.md và $SPEC. Bản gốc đổi gì: git diff $SYNC_FROM $SYNC_TO -- "$ZH"

Lỗi cần sửa:
$(cat "$FIX")

Sửa xong chạy:
  $CHECKS
tới khi sạch.
EOF
else
  read -r -d '' PROMPT <<EOF || true
Đọc ba file này trước khi làm:
- CLAUDE.md — quy tắc dự án
- $SPEC — giọng văn "người thầy trò chuyện" và danh mục không-được-động
- /Users/binhan/.agents/skills/no-ai-slop/SKILL.md — mẫu văn AI cần tránh
$PILOT

Việc: đồng bộ file $FILE (bản tiếng Việt, đã viết lại giọng) với bản gốc tiếng
Trung "$ZH", từ commit $SYNC_FROM tới $SYNC_TO. Danh sách việc do máy sinh:

$WORKLIST

Xem bản gốc đổi gì:            git diff $SYNC_FROM $SYNC_TO -- "$ZH"
Xem nguyên văn bản gốc mới:     git show $SYNC_TO:"$ZH"
Xem một commit cụ thể:          git show <hash> -- "$ZH"

Cách làm từng loại:
1. SỬA mục N: chỉ vá đúng câu bản gốc đổi. Câu bản gốc không đổi thì giữ nguyên
   câu tiếng Việt đang có, kể cả khi bạn muốn viết khác. Tiêu đề gốc đổi thì dịch
   lại tiêu đề theo tiêu đề mới.
2. MỚI mục N: nối vào cuối phần, đúng số mục như gốc, đủ dòng thẻ và sáu field
   theo thứ tự Chi phí, Nói dễ hiểu, Lợi ích, Mức chứng cứ, Nguồn, Ghi chú.
   - Thẻ ngay dưới tiêu đề: <!-- nhan-chi-phi: tien=.. thoi-gian=.. y-chi=.. loi-ich=.. quy-mo=.. -->
     quy đổi từ 成本标签: 钱 0/少/多 → tien=0/it/nhieu; 时间 少/中/多 → thoi-gian=it/vua/nhieu;
     毅力 否/些/是 → y-chi=khong/chut/nhieu; 收益 大/中/小 → loi-ich=lon/vua/nho;
     口径 死亡率/金钱/时间/自由 → quy-mo=tu-vong/tien/thoi-gian/tu-do. Thứ tự key như trên.
   - Nguồn: chép nguyên văn phần sau "- 来源：" của gốc, không dịch, không sửa ký tự nào.
   - Mức chứng cứ: giữ chữ cái của gốc; "（争议）" viết "(tranh cãi)".
   - Ghi chú: gốc mở đầu 争议 thì bản VN mở đầu "Tranh cãi". Mục dựa vào luật,
     chính sách, thủ tục hay đường dây nóng của Trung Quốc thì mở đầu
     "Chỉ tham khảo TQ: " (đứng trước "Tranh cãi"). Mục thuần y học, chứng cứ
     quốc tế thì không đánh. Link http trong Ghi chú giữ đủ số lượng như gốc.
3. Mọi chỗ viết mới:
   - Số theo kiểu Việt: chấm ngăn nghìn, phẩy thập phân. Tiền Trung Quốc ghi
     "nhân dân tệ". Từ sáu chữ số trở lên viết "khoảng X vạn (giá trị chuẩn ...)".
     Không làm mất số nào của gốc.
   - Trích chéo: 第 X 节第 Y 条 → "phần X, mục Y"; 本节第 Y 条 và 第 Y 条 trong
     mục → "mục Y". Mỗi trích kèm anchor: cụm chữ khớp tiêu đề VN của mục đích,
     hoặc ghi rõ "(từ khóa tiêu đề)". Điều luật viết "Điều N", không viết "mục".
   - Trích tới mục MỚI của phần khác mà bên VN chưa có: cứ viết đúng số của
     gốc; check-refs-pending tha loại này, phần kia đồng bộ xong sẽ tự khớp.
4. MỞ ĐẦU PHẦN đổi: dịch phần đổi, giữ câu không đổi. Khối dẫn đường nhóm mục
   (gốc mở bằng "本节条目按主题分成下面几块"): giữ nguyên số nhóm và số mục của
   gốc. Mỗi mục trong khối viết "<cụm ít nhất ba từ chép liền từ tiêu đề VN của
   mục đó> (mục N)", vì check-refs đòi anchor khớp tiêu đề.
5. Mục và đoạn mở đầu bản gốc không đổi: không động một chữ (check-sync --frozen
   bắt từng ký tự).

Chỉ sửa đúng file $FILE. Không tạo hay sửa file nào khác, không chạy
sync-stats.mjs hay check-refs.mjs khi không có --check (chúng ghi file),
KHÔNG git add, KHÔNG git commit. Sửa theo từng mục bằng công cụ edit, đừng ghi
đè cả file trong một lần.

Sau khi sửa xong chạy:
  $CHECKS
và tự sửa tới khi sạch. Cuối cùng in ra: số mục đã sửa, số mục mới, lỗi checker
còn lại (phải là 0).
EOF
fi

CLAUDE_MODEL=${CLAUDE_MODEL:-claude-sonnet-5-5}
case $CLI in
  claude) CMD=(claude -p "$PROMPT" --model "$CLAUDE_MODEL" --dangerously-skip-permissions) ;;
  agy)    CMD=(agy -p "$PROMPT" --dangerously-skip-permissions) ;;
  grok)   CMD=(grok -p "$PROMPT" --always-approve) ;;
  devin)  CMD=(devin -p "$PROMPT" --permission-mode dangerous --respect-workspace-trust false) ;;
  review) CMD=(claude -p "$PROMPT" --model "$CLAUDE_MODEL" --dangerously-skip-permissions) ;;
  *) echo "cli không biết: $CLI" >&2; exit 2 ;;
esac

if [ $DRY = 1 ]; then
  echo "# chạy trong: $WT"
  printf '%q ' "${CMD[@]}"; echo
  echo "---PROMPT---"
  printf '%s\n' "$PROMPT"
  exit 0
fi

if [ "$CLI" = review ] || [ -n "$FIX" ]; then
  [ -d "$WT" ] || { echo "chưa có worktree $WT — phần này chưa được phát việc" >&2; exit 2; }
else
  [ ! -d "$WT" ] || { echo "$WT đã tồn tại (việc dở); chạy 'drop $CH' trước nếu muốn làm lại từ đầu" >&2; exit 2; }
  for i in 1 2 3; do git worktree add -q --detach "$WT" HEAD && break; sleep "$i"; done
  [ -d "$WT" ] || { echo "không tạo được worktree $WT" >&2; exit 2; }
  echo "check-refs lúc phát việc: $(refs_total "$WT") trích dẫn"
fi

LOG="$WT_ROOT/logs/$CH-$CLI-$(date +%Y%m%d-%H%M%S).log"
echo "chạy $CLI cho phần $CH trong $WT, log: $LOG"
(cd "$WT" && "${CMD[@]}") 2>&1 | tee "$LOG" || echo "CLI $CLI thoát với mã lỗi" | tee -a "$LOG"

[ "$CLI" = review ] && exit 0
verify 2>&1 | tee -a "$LOG"
```

- [ ] **Step 2: Kiểm cú pháp, chạy khô, và kiểm báo lỗi khi ref sai**

```bash
bash -n tools/sync-worker.sh && echo "cú pháp đạt"
SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh -n claude 22 | sed -n '/Danh sách việc do máy sinh/,/Xem bản gốc đổi gì/p'
SYNC_FROM=bd95d3e SYNC_TO=khong-co-ref tools/sync-worker.sh -n claude 22; echo "exit=$?"
```

Expected:
- `cú pháp đạt`.
- Prompt có `## Phần 22 (bd95d3e..0cec2b3)` và `SỬA mục 10 [37e63ea]`.
- Lệnh cuối in `không thấy ref SYNC_TO=khong-co-ref` và `exit=2`.

- [ ] **Step 3: Commit**

```bash
git add tools/sync-worker.sh
git commit -m "Thêm tools/sync-worker.sh: phát việc đồng bộ từng phần cho CLI worker, mỗi phần một worktree

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

## Pha 1 — Đồng bộ từng phần (bd95d3e → 0cec2b3)

Task 7–14 dùng chung một quy trình cho mỗi phần NN. Các phần trong cùng một task chạy song song được, mỗi phần mở một tab terminal riêng. Commit thì làm lần lượt từng phần.

1. **Xem việc:** `node tools/sync-worklist.mjs NN --from bd95d3e --to 0cec2b3`. Đối chiếu với danh sách "Việc" ghi trong task. Lệch thì dừng lại hỏi, vì nghĩa là sách chưa ở trạng thái `bd95d3e`.
2. **Phát việc:** `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh claude NN`. Muốn dùng CLI khác thì thay `claude` bằng `agy`, `grok` hay `devin` như đợt viết lại giọng. Kết quả phải kết thúc bằng `KẾT QUẢ: ĐẠT`. Không đạt thì gom các dòng `LỖI`/`lệch` vào `"$TMPDIR/loi-NN.txt"` rồi chạy `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh claude NN "$TMPDIR/loi-NN.txt"`.
3. **Review:** `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh review NN | tee "$TMPDIR/review-NN.txt"`. Kết quả `SẠCH` thì qua. Có lỗi thì chép phần liệt kê lỗi vào `"$TMPDIR/loi-NN.txt"`, chạy lệnh sửa ở bước 2, rồi review lại. Tối đa ba vòng. Sau ba vòng mà vẫn còn lỗi thì người điều phối tự sửa trong worktree `../.HowToLiveBetter-sync/NN`, rồi `tools/sync-worker.sh verify NN`.
4. **Soát tay:** với mỗi mục MỚI, đặt cột Lợi ích tiếng Việt cạnh 收益 của gốc (`git show 0cec2b3:"<file TQ>"`) và kiểm 1–2 con số quan trọng nhất. Kiểm quyết định có hay không có `Chỉ tham khảo TQ:`.
5. **Nhận và commit:**

```bash
SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh take NN
node tools/sync-stats.mjs
git diff docs/bang-doi-chieu-trich-dan.md
git add book/NN-*.md README.md index.html tools/og.html og.png docs/bang-doi-chieu-trich-dan.md
git commit -m "Đồng bộ upstream phần NN (bd95d3e..0cec2b3): <tóm tắt việc>

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Khi soi diff bảng đối chiếu: hàng mới phải là trích dẫn của chính phần NN. Hàng cũ có số mục giữ nguyên mà tiêu đề đích đổi là trích bị lệch, phải sửa trước khi commit. sync-stats có thể in danh sách trích "phần đó không có mục này" trỏ tới mục mới của phần chưa đồng bộ. Loại này là bình thường cho tới Task 14.

### Task 7: Phần 01 (đừng chết sớm)

**Files:** Modify `book/01-dung-chet-som.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5 (sách ở `bd95d3e`), Task 6 (`tools/sync-worker.sh`).
- Produces: phần 1 có 43 mục như bản gốc. Các phần khác trỏ tới mục 39–43.

**Việc** (bước 1 phải in đúng các dòng này):
- MỞ ĐẦU PHẦN đổi `[91a4f53, d88793c, 54ac922]`: khối dẫn đường nhóm mục (issue #75).
- SỬA mục 4 `[6f6d969]`: issue #61, hạ Mức chứng cứ xuống C.
- SỬA mục 8 `[6f6d969]`: ngưỡng thừa cân 23 cho người châu Á, 24 cho Trung Quốc.
- SỬA mục 12 `[fcc93eb]`, mục 13 `[3cdf015]`.
- SỬA mục 26 `[e142470]`: cách dùng chăn chữa cháy.
- SỬA mục 31 `[dc69d08]`: link chết, đổi sang Điều 39 điều lệ phòng chống AIDS.
- SỬA mục 32 `[54ac922]`, mục 36 `[842e11c]`: thêm ca báo chí kèm link lưu trữ.
- MỚI mục 39 `[ed35aea]`: đo mật độ xương. Mục 40 `[ed35aea, 13146a7]`: thuốc loãng xương. Mục 41 `[fcc93eb]`: đo độ dày băng. Mục 42 `[d88793c]`: máy mài góc. Mục 43 `[54ac922]`: hỏi thẳng chuyện tự sát.

- [ ] **Step 1: Xem việc** — `node tools/sync-worklist.mjs 01 --from bd95d3e --to 0cec2b3`. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc** — `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh claude 01`. Expected: `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH** — `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh review 01`.
- [ ] **Step 4: Soát tay mục 39–43.** Mục 4 phải là `- Mức chứng cứ: C`.
- [ ] **Step 5: Nhận, sync-stats, soi bảng đối chiếu, commit** với message `Đồng bộ upstream phần 01 (bd95d3e..0cec2b3): sửa mục 4, 8, 12, 13, 26, 31, 32, 36; thêm mục 39–43; khối dẫn đường`.

### Task 8: Phần 02, 03, 34 (sức khỏe)

**Files:** Modify `book/02-dung-chet-tu-tu.md`, `book/03-dung-lang-phi-suc-luc.md`, `book/34-thuoc-san-trong-nha-dung-de-uong-thanh-hoa.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5, Task 6.
- Produces: phần 2 có 43 mục, phần 3 có 25 mục, phần 34 có 11 mục.

**Việc:**
- Phần 02:
  - MỞ ĐẦU PHẦN `[91a4f53, 13146a7]`.
  - SỬA mục 1 `[f5a4425]`, mục 10 `[a4e920f]`.
  - SỬA mục 14 `[37e63ea]`: PR #93 bỏ "mỗi tuần ba lần, mỗi lần 45 phút" khỏi tiêu đề. Tiêu đề phải dịch lại theo gốc.
  - MỚI mục 42 `[ed35aea]`: bật máy hút mùi, B tranh cãi. Mục 43 `[13146a7]`: liệu pháp hormone quanh mãn kinh, A tranh cãi.
- Phần 03:
  - MỞ ĐẦU PHẦN `[91a4f53, 13146a7, 3a3290a]`.
  - SỬA mục 13 `[3a3290a]`, có đổi tiêu đề.
  - MỚI mục 25 `[13146a7]`: đau bụng kinh uống ibuprofen.
- Phần 34:
  - SỬA mục 3 `[13146a7]`.
  - MỚI mục 10 `[ed35aea]`: bỏ thuốc hết hạn. Mục 11 `[ed35aea]`: kháng sinh và rượu.

- [ ] **Step 1: Xem việc** — chạy `node tools/sync-worklist.mjs NN --from bd95d3e --to 0cec2b3` cho NN = 02, 03, 34. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc song song** — mỗi phần một tab: `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh claude 02` (rồi `03`, `34`). Expected: mỗi phần `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH** cho từng phần.
- [ ] **Step 4: Soát tay** mục 02/42, 02/43, 03/25, 34/10, 34/11. Ghi chú của 02/42 và 02/43 phải mở đầu "Tranh cãi".
- [ ] **Step 5: Nhận và commit từng phần**, ba commit:
  - `Đồng bộ upstream phần 02 (bd95d3e..0cec2b3): sửa mục 1, 10, 14; thêm mục 42, 43; khối dẫn đường`
  - `Đồng bộ upstream phần 03 (bd95d3e..0cec2b3): sửa mục 13; thêm mục 25; khối dẫn đường`
  - `Đồng bộ upstream phần 34 (bd95d3e..0cec2b3): sửa mục 3; thêm mục 10, 11`

### Task 9: Phần 05, 07 (tiền)

**Files:** Modify `book/05-dung-lang-phi-tien.md`, `book/07-song-khi-khong-co-tien.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5, Task 6.
- Produces: phần 5 có 46 mục, phần 7 có 22 mục.

**Việc:**
- Phần 05:
  - MỞ ĐẦU PHẦN `[91a4f53, 51b5fb9, 7292736]`.
  - SỬA mục 7, 10 `[f28538a]`: quy lãi về lãi suất năm, chống lừa nhắm vào trẻ con.
  - SỬA mục 11 `[b808ee7]`: cách tính hòa vốn bảo hành mở rộng.
  - SỬA mục 14 `[0a867de]`: tiêu đề đổi, tính cả nước bình.
  - SỬA mục 20 `[4179e92, a70f4f3]`: tiêu đề đổi, người chịu thuế suất 3% cũng không lời.
  - MỚI mục 45 `[51b5fb9, 842e11c]`: tiền ảo. Mục 46 `[7292736, 3e5bf7a]`: tự đóng bảo hiểm hưu trí.
- Phần 07:
  - MỞ ĐẦU PHẦN `[91a4f53]`.
  - SỬA mục 1 `[3cdf015]`, mục 2 `[f1532d5]`, mục 7 `[6f6d969]`, mục 15 `[f28538a]`, mục 18 `[71b0840, 7292736]`.
  - MỚI mục 22 `[f1532d5]`: bị nợ lương thì phân rõ ai thuê mình.

- [ ] **Step 1: Xem việc** cho 05, 07. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc song song** — `SYNC_FROM=bd95d3e SYNC_TO=0cec2b3 tools/sync-worker.sh claude 05` và `... claude 07`. Expected: `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH.**
- [ ] **Step 4: Soát tay** 05/45, 05/46, 07/22, và các con số trong 05/20. Cả ba mục mới đều dựa vào luật hay chính sách Trung Quốc, nên Ghi chú phải mở đầu `Chỉ tham khảo TQ:`.
- [ ] **Step 5: Nhận và commit từng phần:**
  - `Đồng bộ upstream phần 05 (bd95d3e..0cec2b3): sửa mục 7, 10, 11, 14, 20; thêm mục 45, 46; khối dẫn đường`
  - `Đồng bộ upstream phần 07 (bd95d3e..0cec2b3): sửa mục 1, 2, 7, 15, 18; thêm mục 22; khối dẫn đường`

### Task 10: Phần 06, 13 (danh sách nên tránh, tình huống khẩn cấp)

**Files:** Modify `book/06-danh-sach-nen-tranh.md`, `book/13-tinh-huong-khan-cap.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5, Task 6.
- Produces: phần 6 có 30 mục, phần 13 có 44 mục.

**Việc:**
- Phần 06:
  - MỞ ĐẦU PHẦN `[91a4f53, d88793c, f5a4425]`.
  - SỬA mục 10 `[6f6d969]`, mục 18 `[ed35aea]`.
  - SỬA mục 20 `[2bec8ad]`: sỏi mật không triệu chứng, thêm rủi ro hai phía, đánh dấu tranh cãi.
  - SỬA mục 28 `[842e11c]`.
  - MỚI mục 29 `[d88793c]`: tư thế bê vác. Mục 30 `[f5a4425]`: bổ sung canxi sau gãy xương.
- Phần 13:
  - MỞ ĐẦU PHẦN `[91a4f53]`.
  - SỬA mục 1, 26 `[3cdf015]`, mục 25 `[fcc93eb]`.
  - SỬA mục 31 `[3a3290a]`: đổi tiêu đề.
  - SỬA mục 36 `[c14cbd4]`.
  - SỬA mục 41 `[f5a4425]`: X-quang có thể bỏ sót.
  - MỚI mục 43 `[3cdf015]`: trẻ dưới 1 tuổi hóc. Mục 44 `[3cdf015]`: hồi sinh tim phổi cho trẻ dưới 1 tuổi.

- [ ] **Step 1: Xem việc** cho 06, 13. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc song song** — `... sync-worker.sh claude 06` và `... claude 13`. Expected: `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH.**
- [ ] **Step 4: Soát tay** 06/29, 06/30, 13/43, 13/44. Số lần ấn, số lần thổi và nhịp trong 13/43, 13/44 phải khớp gốc từng con số. Ghi chú 06/20 phải mở đầu "Tranh cãi".
- [ ] **Step 5: Nhận và commit từng phần:**
  - `Đồng bộ upstream phần 06 (bd95d3e..0cec2b3): sửa mục 10, 18, 20, 28; thêm mục 29, 30; khối dẫn đường`
  - `Đồng bộ upstream phần 13 (bd95d3e..0cec2b3): sửa mục 1, 25, 26, 31, 36, 41; thêm mục 43, 44; khối dẫn đường`

### Task 11: Phần 08, 09 (pháp luật)

**Files:** Modify `book/08-dung-tu-chuoc-hoa-vao-than.md`, `book/09-lan-san-do-phap-luat-de-vi-pham.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5, Task 6.
- Produces: phần 8 có 46 mục, phần 9 có 26 mục.

**Việc:**
- Phần 08:
  - MỞ ĐẦU PHẦN `[91a4f53, c14cbd4]`.
  - SỬA mục 3, 8, 9, 17, 18, 28 `[f28538a]`: chống lừa và vay mượn.
  - SỬA mục 6, 13 `[37e63ea]`: PR #93 sửa tiêu đề cho khớp nội dung.
  - SỬA mục 10 `[c14cbd4]`, mục 12 `[f1532d5]`, mục 15 `[54ac922]`.
  - SỬA mục 36 `[dc69d08]`: link chết.
  - MỚI mục 45 `[f28538a]`: vay AB. Mục 46 `[c14cbd4]`: khóa cửa và đèn cảm ứng.
- Phần 09:
  - MỞ ĐẦU PHẦN `[91a4f53, c14cbd4]`.
  - SỬA mục 5 `[51b5fb9]`, mục 8 `[842e11c]`, mục 10 `[c14cbd4]`.
  - MỚI mục 24, 25 `[54620be, b2c4d74]`: bản quyền. Mục 26 `[c14cbd4]`: vũ khí tự vệ.

- [ ] **Step 1: Xem việc** cho 08, 09. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc song song** — `... sync-worker.sh claude 08` và `... claude 09`. Expected: `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH.** Hai phần này nặng về hậu quả pháp lý. Review phải soi kỹ chỗ nói mạnh hơn hay yếu hơn gốc: mức giảm án ở 08/6, khung hình phạt ở 08/13.
- [ ] **Step 4: Soát tay** 08/45, 08/46, 09/24–26. Ghi chú mở đầu `Chỉ tham khảo TQ:`. Ca báo chí chưa xét xử không được ghi đủ họ tên cá nhân, đúng như bản gốc.
- [ ] **Step 5: Nhận và commit từng phần:**
  - `Đồng bộ upstream phần 08 (bd95d3e..0cec2b3): sửa 12 mục; thêm mục 45, 46; khối dẫn đường`
  - `Đồng bộ upstream phần 09 (bd95d3e..0cec2b3): sửa mục 5, 8, 10; thêm mục 24–26; khối dẫn đường`

### Task 12: Phần 10, 11, 12, 14 (quan hệ, kỹ thuật, làm ăn, tài khoản)

**Files:** Modify `book/10-yeu-va-cuoi-co-dang-khong.md`, `book/11-lan-san-do-cua-dan-ky-thuat.md`, `book/12-khoi-nghiep-va-lam-an.md`, `book/14-tai-khoan-va-an-toan-thong-tin.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5, Task 6.
- Produces: phần 10 có 20 mục, phần 11 có 19 mục, phần 12 có 24 mục, phần 14 có 10 mục.

**Việc:**
- Phần 10: MỞ ĐẦU PHẦN `[91a4f53]`; SỬA mục 17 `[fcdb87a]`; MỚI mục 20 `[fcdb87a]`: trị liệu cặp đôi, A tranh cãi.
- Phần 11: SỬA mục 1 `[3a3290a]` (đổi tiêu đề), mục 2 `[b2c4d74]`, mục 9 `[842e11c]`, mục 17 `[a86f820]`; MỚI mục 18 `[9d04453]`: công cụ chặn quảng cáo app khác. Mục 19 `[a86f820]`: trạm trung chuyển AI.
- Phần 12: MỞ ĐẦU PHẦN `[91a4f53]`; SỬA mục 5 `[f28538a]`, mục 21 `[54620be]`; MỚI mục 24 `[f28538a]`: thuê vận hành shop.
- Phần 14: SỬA mục 1, 9 `[f28538a]`; MỚI mục 10 `[a86f820]`: đừng giao mã nguồn và khóa cho trạm trung chuyển AI.

- [ ] **Step 1: Xem việc** cho 10, 11, 12, 14. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc song song** — bốn tab, `... sync-worker.sh claude NN`. Expected: `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH.**
- [ ] **Step 4: Soát tay** 10/20, 11/18, 11/19, 12/24, 14/10.
- [ ] **Step 5: Nhận và commit từng phần**, bốn commit:
  - `Đồng bộ upstream phần 10 (bd95d3e..0cec2b3): sửa mục 17; thêm mục 20; khối dẫn đường`
  - `Đồng bộ upstream phần 11 (bd95d3e..0cec2b3): sửa mục 1, 2, 9, 17; thêm mục 18, 19`
  - `Đồng bộ upstream phần 12 (bd95d3e..0cec2b3): sửa mục 5, 21; thêm mục 24; khối dẫn đường`
  - `Đồng bộ upstream phần 14 (bd95d3e..0cec2b3): sửa mục 1, 9; thêm mục 10`

### Task 13: Phần 17, 19, 20, 27, 28, 30 (gia đình, đi làm)

**Files:** Modify `book/17-nha-co-nguoi-gia.md`, `book/19-di-lam-nghi-viec-va-tai-nan-lao-dong.md`, `book/20-cham-tre-so-sinh.md`, `book/27-mang-thai-va-sinh-con.md`, `book/28-dung-vi-ngoai-hinh-pha-hong-suc-khoe.md`, `book/30-con-cai-tuoi-di-hoc.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5, Task 6.
- Produces: phần 17: 9 mục, phần 19: 19 mục, phần 20: 14 mục, phần 27: 16 mục, phần 28: 9 mục, phần 30: 18 mục. Bài dài ở Task 16 trỏ tới 19/17–19.

**Việc:**
- Phần 17: MỞ ĐẦU PHẦN `[3cdf015]`; MỚI mục 9 `[3cdf015]`: phẫu thuật đục thủy tinh thể, B tranh cãi.
- Phần 19:
  - MỞ ĐẦU PHẦN `[3cdf015, 71b0840]`.
  - SỬA mục 4, 8 `[3cdf015]`.
  - SỬA mục 5, 11 `[6f6d969]`: issue #61. Tiền thay báo trước chỉ áp dụng cho Điều 40, và cách tính căn cứ. Hạn một năm nhận định tai nạn lao động không tính thời gian chậm vì lý do không do bản thân.
  - MỚI mục 17 `[3cdf015]`: giấy chứng nhận nghỉ việc. Mục 18 `[3cdf015]`: thuế thu nhập trên tiền bồi thường. Mục 19 `[71b0840]`: chuyển quan hệ bảo hiểm xã hội.
- Phần 20: SỬA mục 4 `[0cec2b3]`; MỚI mục 13 `[3cdf015]`: vàng da sơ sinh. Mục 14 `[0cec2b3]`: ăn chay thì bổ sung B12, B tranh cãi.
- Phần 27: SỬA mục 1 `[0cec2b3]`.
- Phần 28: MỚI mục 9 `[a4e920f]`: niềng răng.
- Phần 30: MỞ ĐẦU PHẦN `[fcdb87a, dcccdd9]`; SỬA mục 14 `[dcccdd9]`; MỚI mục 16, 17 `[fcdb87a]`: không đánh mắng, lớp dạy cha mẹ. Mục 18 `[dcccdd9]`: trại cai nghiện mạng khép kín.

- [ ] **Step 1: Xem việc** cho 17, 19, 20, 27, 28, 30. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc song song** — sáu tab, `... sync-worker.sh claude NN`. Expected: `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH.**
- [ ] **Step 4: Soát tay** các mục mới, nhất là 19/18 (mức miễn thuế gấp 3 lần lương bình quân) và 20/13 (các dấu hiệu phải đi viện trong ngày).
- [ ] **Step 5: Nhận và commit từng phần**, sáu commit:
  - `Đồng bộ upstream phần 17 (bd95d3e..0cec2b3): thêm mục 9; mở đầu phần`
  - `Đồng bộ upstream phần 19 (bd95d3e..0cec2b3): sửa mục 4, 5, 8, 11; thêm mục 17–19; mở đầu phần`
  - `Đồng bộ upstream phần 20 (bd95d3e..0cec2b3): sửa mục 4; thêm mục 13, 14`
  - `Đồng bộ upstream phần 27 (bd95d3e..0cec2b3): sửa mục 1`
  - `Đồng bộ upstream phần 28 (bd95d3e..0cec2b3): thêm mục 9`
  - `Đồng bộ upstream phần 30 (bd95d3e..0cec2b3): sửa mục 14; thêm mục 16–18; mở đầu phần`

### Task 14: Phần 21, 22, 23, 24, 26, 31, 33 (phần nhỏ) và kiểm cả sách

**Files:** Modify `book/21-du-lich-va-an-toan-nuoc-ngoai.md`, `book/22-thu-gian-the-nao.md`, `book/23-hoc-ky-nang-gi-dang.md`, `book/24-di-kham-benh.md`, `book/26-lam-mot-website-hoac-nen-tang.md`, `book/31-nhung-con-duong-sau-tuoi-muoi-tam.md`, `book/33-song-sau-khi-khuyet-tat.md`, cùng các file sync-stats ghi.

**Interfaces:**
- Consumes: Task 5, Task 6, và Task 7–13 đã commit.
- Produces: cả 34 phần ở trạng thái `0cec2b3`, nên `node tools/check-sync.mjs --all 0cec2b3` exit 0 và `check-refs.mjs --check` đạt mà không cần tha.

**Việc:**
- Phần 21: SỬA mục 7 `[923f168]`.
- Phần 22: SỬA mục 10 `[37e63ea]`, đổi tiêu đề.
- Phần 23: MỞ ĐẦU PHẦN `[91a4f53]`; SỬA mục 2 `[6f6d969]`; SỬA mục 3 `[b9034f0]`: thêm điều tra mẫu 1% năm 2025, giữ số tổng điều tra lần 7.
- Phần 24: SỬA mục 2 `[6f6d969]`; MỚI mục 12 `[a4e920f]`: trồng răng.
- Phần 26: SỬA mục 2 `[d95386e]`: ba trường hợp không cần giấy phép. SỬA mục 9 `[54620be]`.
- Phần 31: SỬA mục 1 `[be123f4]`, mục 4 `[6f6d969]`, mục 11 `[71b0840, 7292736]`.
- Phần 33: MỞ ĐẦU PHẦN `[91a4f53]`, chỉ khối dẫn đường.

- [ ] **Step 1: Xem việc** cho 21, 22, 23, 24, 26, 31, 33. Expected: khớp danh sách trên.
- [ ] **Step 2: Phát việc song song** — bảy tab, `... sync-worker.sh claude NN`. Expected: `KẾT QUẢ: ĐẠT`.
- [ ] **Step 3: Review tới SẠCH.**
- [ ] **Step 4: Soát tay** 24/12, các con số trong 23/3, và ba trường hợp miễn giấy phép trong 26/2.
- [ ] **Step 5: Nhận và commit từng phần**, bảy commit:
  - `Đồng bộ upstream phần 21 (bd95d3e..0cec2b3): sửa mục 7`
  - `Đồng bộ upstream phần 22 (bd95d3e..0cec2b3): sửa mục 10`
  - `Đồng bộ upstream phần 23 (bd95d3e..0cec2b3): sửa mục 2, 3; khối dẫn đường`
  - `Đồng bộ upstream phần 24 (bd95d3e..0cec2b3): sửa mục 2; thêm mục 12`
  - `Đồng bộ upstream phần 26 (bd95d3e..0cec2b3): sửa mục 2, 9`
  - `Đồng bộ upstream phần 31 (bd95d3e..0cec2b3): sửa mục 1, 4, 11`
  - `Đồng bộ upstream phần 33 (bd95d3e..0cec2b3): khối dẫn đường`
- [ ] **Step 6: Kiểm cả sách, giờ không còn trích chờ**

```bash
node tools/check-sync.mjs --all 0cec2b3 > "$TMPDIR/cs.txt"; echo "exit=$?"; grep -v ': khớp' "$TMPDIR/cs.txt"
node tools/check-refs.mjs --check | tail -2
node tools/check-plain.mjs | tail -1
node tools/sync-stats.mjs --check | head -2
```

Expected:
- `exit=0`.
- check-refs in `Kiểm tra trích dẫn đạt: cả N trích dẫn đều trỏ đúng và có anchor`.
- check-plain báo `không đạt 0`.
- Dòng số liệu: `Mục 672 ｜ phần 34 ｜ A 438 B 179 C 55 ｜ tranh cãi 70` … `link 1703`, và `Hiệu quả chi phí: cực cao 114 … cao 304 … trung bình 254`.

Lệch số liệu nào thì truy về mục gây ra: `git log -p` của phần có Mức chứng cứ, thẻ hay marker khác gốc. check-sync đã khớp mà số vẫn lệch thì so dòng `- Mức chứng cứ:` từng phần giữa VN và gốc.

---

## Pha 2 — Bài dài, README, CLAUDE.md

### Task 15: Ba bài dài có sẵn và công cụ so trích dẫn trong bài dài

**Files:**
- Create: `tools/check-sync-doc.mjs`
- Modify: `docs/cuoi-co-dang-khong.md` (bản gốc `d52b4de`: thêm mục nhỏ "tư cách pháp lý" của vợ chồng)
- Modify: `docs/danh-muc-do-dung-khan-cap-gia-dinh.md` (bản gốc `e142470`: cách dùng chăn chữa cháy)
- Modify: `docs/lam-nen-tang-can-nhung-giay-phep-gi.md` (bản gốc `d95386e`: một dòng)

**Interfaces:**
- Produces: `node tools/check-sync-doc.mjs <ref> <file-goc> <file-vn>`. In `khớp N trích` khi tập trích `第 X 节第 Y 条` của bài gốc bằng tập `phần X, mục Y` của bài VN. Exit 0 khi khớp, 1 khi lệch.

- [ ] **Step 1: Viết `tools/check-sync-doc.mjs`**

```js
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
```

- [ ] **Step 2: Chạy trên hai bài chưa sửa để thấy nền**

```bash
node tools/check-sync-doc.mjs 5881ed0 "docs/家庭应急装备清单.md" docs/danh-muc-do-dung-khan-cap-gia-dinh.md
node tools/check-sync-doc.mjs 5881ed0 "docs/做平台要办哪些证.md" docs/lam-nen-tang-can-nhung-giay-phep-gi.md
```

Expected: dòng đầu `khớp 11 trích`. Dòng hai `LỆCH: gốc 0 / VN 1; …; VN có gốc không: [26,5]`. Đây là trích người dịch thêm từ trước, được giữ lại.

- [ ] **Step 3: Vá ba bài theo diff của bản gốc**

```bash
git diff 5881ed0 0cec2b3 -- "docs/结婚划不划算.md" "docs/家庭应急装备清单.md" "docs/做平台要办哪些证.md"
```

Chỉ vá đúng đoạn bản gốc đổi, câu khác giữ nguyên. Trích điều luật viết `Điều N` kèm tên văn bản. Mục nhỏ mới của `cuoi-co-dang-khong.md` có tiêu đề `###`, dịch theo giọng spec.

- [ ] **Step 4: Kiểm**

```bash
node tools/check-sync-doc.mjs 0cec2b3 "docs/结婚划不划算.md" docs/cuoi-co-dang-khong.md
node tools/check-sync-doc.mjs 0cec2b3 "docs/家庭应急装备清单.md" docs/danh-muc-do-dung-khan-cap-gia-dinh.md
node tools/check-refs.mjs --check | tail -1
```

Expected: `khớp 1 trích`, `khớp 11 trích`, check-refs đạt.

- [ ] **Step 5: Commit**

```bash
node tools/sync-stats.mjs --no-screenshot
git add tools/check-sync-doc.mjs docs/cuoi-co-dang-khong.md docs/danh-muc-do-dung-khan-cap-gia-dinh.md docs/lam-nen-tang-can-nhung-giay-phep-gi.md docs/bang-doi-chieu-trich-dan.md
git commit -m "Đồng bộ upstream 3 bài dài: tư cách pháp lý vợ chồng, chăn chữa cháy, trường hợp không cần giấy phép

Theo upstream d52b4de, e142470, d95386e.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 16: Bốn bài dài mới dạng danh sách theo thời gian

| Bản gốc | Bản VN | Tiêu đề VN | Gắn vào phần |
|---|---|---|---|
| `docs/被裁了之后先做什么.md` (`a5b8ffa`, `20718ee`) | `docs/bi-cat-giam-roi-lam-gi-truoc.md` | Bị cắt giảm rồi, làm gì trước | 19 |
| `docs/孩子出生前后要办的事.md` (`a5b8ffa`) | `docs/viec-can-lam-truoc-va-sau-khi-sinh-con.md` | Việc cần làm trước và sau khi sinh con | 27 |
| `docs/刚确诊慢性病之后.md` (`a5b8ffa`) | `docs/vua-chan-doan-benh-man-tinh.md` | Vừa chẩn đoán bệnh mạn tính | 16 |
| `docs/换工作、换城市之前.md` (`f987402`, `37e63ea`, `3a3290a`) | `docs/truoc-khi-doi-viec-doi-thanh-pho.md` | Trước khi đổi việc, đổi thành phố | 19 |

**Files:**
- Create: bốn file ở cột "Bản VN"
- Modify: `README.md` (ô "Bài dài", câu "Bài dài riêng xem", dòng mục lục phần 16, 19, 27), `index.html` (dòng `class="doc-links"` đầu tiên), `CLAUDE.md` (tóm lược phần 16, 19, 27)

**Interfaces:**
- Consumes: Task 14 (mọi mục đích đã có), `tools/check-sync-doc.mjs` (Task 15).
- Produces: bốn bài dài mở được trong cửa sổ bài dài của trang tra cứu.

- [ ] **Step 1: Dịch từng bài**

Đọc nguyên văn bằng `git show 0cec2b3:"docs/<tên gốc>.md"`. Khuôn file:
- Dòng 1: `[← Mục lục](../README.md)`.
- Dòng 2 để trống.
- Dòng 3: `# <Tiêu đề VN>`.

Mỗi chỉ đường `见第 X 节第 Y 条（…）` viết `xem phần X, mục Y (<cụm chép từ tiêu đề VN của mục đó>)`. Bài dài không có "phần này", nên không bao giờ viết "mục Y" trần. Câu nói con số phải dùng đúng con số có trong mục được trỏ tới.

- [ ] **Step 2: Kiểm từng bài**

```bash
node tools/check-sync-doc.mjs 0cec2b3 "docs/被裁了之后先做什么.md" docs/bi-cat-giam-roi-lam-gi-truoc.md
node tools/check-sync-doc.mjs 0cec2b3 "docs/孩子出生前后要办的事.md" docs/viec-can-lam-truoc-va-sau-khi-sinh-con.md
node tools/check-sync-doc.mjs 0cec2b3 "docs/刚确诊慢性病之后.md" docs/vua-chan-doan-benh-man-tinh.md
node tools/check-sync-doc.mjs 0cec2b3 "docs/换工作、换城市之前.md" docs/truoc-khi-doi-viec-doi-thanh-pho.md
grep -c '[一-鿿]' docs/bi-cat-giam-roi-lam-gi-truoc.md docs/viec-can-lam-truoc-va-sau-khi-sinh-con.md docs/vua-chan-doan-benh-man-tinh.md docs/truoc-khi-doi-viec-doi-thanh-pho.md
node tools/check-refs.mjs --check | tail -1
```

Expected:
- Lần lượt `khớp 35 trích`, `khớp 45 trích`, `khớp 36 trích`, `khớp 65 trích`.
- `grep -c` in `:0` cho cả bốn file.
- check-refs đạt. check-refs quét bài dài, đòi anchor cho từng trích.

- [ ] **Step 3: Gắn link ở bốn chỗ cho mỗi bài**

1. `README.md`, ô "Bài dài" (dòng `[Cưới có đáng không](docs/cuoi-co-dang-khong.md) · …`): nối thêm ` · [<Tiêu đề VN>](docs/<file>.md)` cho cả bốn bài.
2. `README.md`, câu bắt đầu `Mục trong mỗi phần theo hiệu quả chi phí từ cao tới thấp sắp.`: thêm bốn link vào chuỗi "Bài dài riêng xem …" theo cùng dạng.
3. `README.md`, dòng mục lục:
   - phần 16: thêm `Bài dài xem [docs/vua-chan-doan-benh-man-tinh.md](docs/vua-chan-doan-benh-man-tinh.md).`
   - phần 19: thêm hai câu cùng dạng cho `bi-cat-giam-roi-lam-gi-truoc.md` và `truoc-khi-doi-viec-doi-thanh-pho.md`.
   - phần 27: thêm một câu cùng dạng cho `viec-can-lam-truoc-va-sau-khi-sinh-con.md`.
4. `index.html`, dòng đầu tiên có `class="doc-links">Bài dài:`: nối ` · <a href="https://github.com/chuanman2707/HowToLiveBetter/blob/main/docs/<file>.md"><Tiêu đề VN></a>` cho cả bốn bài. Tên file ASCII nên không cần mã hóa phần trăm.
5. `CLAUDE.md`: thêm "; bài dài ở docs/" vào cuối dòng tóm lược phần 16, 19, 27, trước dấu chấm.

Run:

```bash
for f in bi-cat-giam-roi-lam-gi-truoc viec-can-lam-truoc-va-sau-khi-sinh-con vua-chan-doan-benh-man-tinh truoc-khi-doi-viec-doi-thanh-pho; do printf "%s README:%s index:%s\n" $f "$(grep -c "docs/$f.md" README.md)" "$(grep -c "docs/$f.md" index.html)"; done
```

Expected: mỗi dòng `README:3 index:1`.

- [ ] **Step 4: Kiểm trong trang tra cứu**

Mở `preview_start` name `trang-tra-cuu` (file launch.json tạo ở Task 3). Chạy bằng javascript_tool:

```js
await dmOpen('docs/bi-cat-giam-roi-lam-gi-truoc.md');
document.querySelectorAll('#dm-doc .xref').length
```

Expected: ≥ 30. Không có lỗi console.

- [ ] **Step 5: Commit**

```bash
node tools/sync-stats.mjs --no-screenshot
git add docs/bi-cat-giam-roi-lam-gi-truoc.md docs/viec-can-lam-truoc-va-sau-khi-sinh-con.md docs/vua-chan-doan-benh-man-tinh.md docs/truoc-khi-doi-viec-doi-thanh-pho.md README.md index.html CLAUDE.md docs/bang-doi-chieu-trich-dan.md
git commit -m "Đồng bộ upstream 4 bài dài danh sách theo thời gian: bị cắt giảm, sinh con, bệnh mạn tính, đổi việc đổi thành phố

Theo upstream a5b8ffa, 20718ee, f987402, 37e63ea, 3a3290a.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 17: README và CLAUDE.md

**Files:**
- Modify: `README.md`
- Modify: `CLAUDE.md`

**Interfaces:**
- Consumes: Task 14–16.
- Produces: README mô tả đúng 672 mục. CLAUDE.md có quy trình đồng bộ cho đợt sau.

- [ ] **Step 1: Xem README bản gốc đổi gì**

Run: `git diff 5881ed0 0cec2b3 -- README.md`

Lấy sang các thay đổi dưới đây. Mỗi câu dịch theo giọng spec, đặt đúng vị trí tương ứng trong README tiếng Việt.

1. Câu giới thiệu đầu: thêm ý "một số ít vụ việc mà cơ quan nhà nước không công bố thì trích bài báo gốc có ký tên phóng viên, kèm bản lưu trữ web".
2. Câu tuyên bố riêng cho fork, đặt ngay dưới câu giới thiệu: `**Dự án này (cả bản gốc lẫn bản tiếng Việt) chưa từng và sẽ không phát hành bất kỳ token hay tài sản số nào.** Đồng tiền nào mang tên dự án đều không liên quan, gặp thì coi là lừa đảo, đừng mua.`
3. Bảng "Cuốn sách này trả lời những câu hỏi nào": thêm câu hỏi của dòng phần 24 (trồng một chiếc răng tốn bao nhiêu, bảo hiểm có trả không) và dòng phần 28 (muốn niềng răng). Mỗi phần vẫn chỉ một dòng.
4. Mục "Phân hạng chứng cứ": thêm hai đoạn mới của bản gốc. Đoạn một: hạng A chỉ nói "có con số cụ thể, nguồn đối chiếu được", không nói con số đó là nhân quả, phân biệt thử nghiệm ngẫu nhiên với nghiên cứu chỉ theo dõi. Đoạn hai: phần trăm trong Lợi ích và Nói dễ hiểu đa số là thấp hơn tương đối, không phải bớt mấy người trong một trăm người.
5. Dòng mục lục các phần 1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 20, 22, 24, 27, 28, 30, 34: thêm chủ đề của mục mới theo đúng dòng tương ứng ở README gốc. Ví dụ phần 3 thêm "đau bụng kinh đừng chịu đựng".
6. Bỏ qua (theo "Quyết định đã chốt"): nhóm QQ, email hợp tác, mini program WeChat, app iOS, badge Claude Code, câu "viết với Claude Code", dòng "Ngôn ngữ khác".

- [ ] **Step 2: CLAUDE.md**

1. Dòng tóm lược trong "Kết cấu mục lục" của các phần ở bước 1.5: thêm chủ đề mục mới, cùng cách viết ngắn đang có.
2. Trong "Định dạng mục", thêm quy tắc khối dẫn đường:

```markdown
- **Khối dẫn đường nhóm mục ở đầu phần** (bản gốc 2026-10-04, issue #75): phần có từ 20 mục trở lên có một đoạn ngay sau đoạn mở đầu, chia mục theo chủ đề, mỗi mục ghi "<cụm chép từ tiêu đề> (mục N)". Thứ tự và số mục không đổi. Thêm mục mới vào phần có khối này thì phải gắn mục đó vào nhóm hợp lý; đồng bộ với bản gốc thì theo cách bản gốc gắn.
```

3. Trong "Quy tắc trích nguồn", thêm quy tắc báo chí sơ cấp:

```markdown
- **Bài báo sơ cấp được nhận ở một số ca** (bản gốc 2026-10-05): chỉ khi vụ việc không có văn bản nhà nước công bố. Chỉ nhận bài gốc có ký tên phóng viên, không nhận bài đăng lại. Chỉ dùng để chứng minh "đã có chuyện như vậy", không lấy số, không nâng hạng chứng cứ. Cột Nguồn ghi link gốc kèm link lưu trữ web.archive.org. Ghi chú nói rõ tính chất nguồn. Cá nhân chưa bị xét xử thì không ghi đủ họ tên. Bản VN dịch theo đúng như vậy, không tự thêm ca báo chí.
```

4. Thêm mục mới ngay trước "## Cách làm việc":

```markdown
## Đồng bộ với bản gốc

Mốc đã đồng bộ tới đâu là `git merge-base HEAD upstream/main`. Mỗi đợt kết thúc bằng `git merge -s ours <commit gốc>`, nên mốc tự nhảy. Lần đầu trên máy mới thì chạy `git remote add upstream https://github.com/eternity4719/HowToLiveBetter && git fetch upstream`.

1. Xem việc: `node tools/sync-worklist.mjs --all --to <commit gốc>`. Ghim `<commit gốc>` cho cả đợt, đừng dùng `upstream/main` giữa chừng.
2. Có dòng `DỒN SỐ` (bản gốc xóa hay gộp mục) thì làm commit đó trước: `node tools/renumber.mjs <phần>:<mục> ...`, vá nội dung theo diff, rồi kiểm `node tools/check-sync.mjs --all <commit đó>`.
3. Từng phần: `SYNC_FROM=<mốc> SYNC_TO=<commit gốc> tools/sync-worker.sh <cli> NN`, rồi `review`, `take`, `sync-stats`, mỗi phần một commit. `check-sync --frozen HEAD` chặn việc viết lại câu bản gốc không đổi. Trích tới mục mới của phần chưa làm được `check-refs-pending.mjs` tha, hết đợt phải về 0.
4. Bài dài: vá theo diff, kiểm bằng `node tools/check-sync-doc.mjs`. Bài mới gắn link bốn chỗ như quy tắc "Kết cấu mục lục".
5. Chốt: `node tools/check-sync.mjs --all <commit gốc>` exit 0, `check-refs.mjs --check` đạt, rồi `git merge -s ours <commit gốc>`.

Không đem sang fork: `docs/核实记录/` (chỉ ghi trỏ đường trong `docs/ghi-chep-kiem-chung/`), liên hệ cá nhân và sản phẩm phái sinh của tác giả gốc trong README. Bản VN không tự thêm hay xóa mục; quy tắc viết mục mới của bản gốc chỉ dùng để hiểu vì sao bản gốc đổi.
```

- [ ] **Step 3: Kiểm**

```bash
node tools/sync-stats.mjs --check | tail -1
grep -c 'token' README.md
grep -n '## Đồng bộ với bản gốc' CLAUDE.md
```

Expected: `Số liệu thống kê đã khớp`. `grep -c` ≥ 1. Có dòng `## Đồng bộ với bản gốc`.

- [ ] **Step 4: Commit**

```bash
git add README.md CLAUDE.md
git commit -m "README và CLAUDE.md theo bản gốc 0cec2b3: hai đoạn phân hạng chứng cứ, mục lục mục mới, khối dẫn đường, nguồn báo chí sơ cấp, quy trình đồng bộ

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 18: Ghi chép kiểm chứng: file trỏ đường

**Files:**
- Create: `docs/ghi-chep-kiem-chung/dong-bo-upstream-2026-10.md`

**Interfaces:**
- Produces: người đọc biết nguồn của 38 mục mới đã được bản gốc kiểm ở đâu.

- [ ] **Step 1: Liệt kê ghi chép kiểm chứng mới của bản gốc**

Run: `git -c core.quotepath=false diff --name-status 5881ed0 0cec2b3 -- docs/核实记录/`
Expected: khoảng 30 dòng `A`, một dòng `M`.

- [ ] **Step 2: Viết file**

Khuôn:
- Dòng 1: `[← Mục lục](../../README.md)`.
- Dòng 3: `# Đồng bộ với bản gốc, đợt 1 (2026-10)`.
- Đoạn dẫn ba câu:
  1. Đợt này đưa bản VN từ `5881ed0` lên `0cec2b3`.
  2. Bản VN không kiểm lại nguồn. Dòng Nguồn chép nguyên văn bản gốc, `tools/check-sync.mjs` kiểm từng ký tự.
  3. Quá trình bản gốc kiểm nguồn của từng mục mới nằm ở các file dưới đây trong kho gốc.
- Bảng hai cột "Mục" và "Ghi chép của bản gốc". Mỗi dòng một mục mới, ví dụ `phần 1, mục 39 (đo mật độ xương)`. Cột sau là link `https://github.com/eternity4719/HowToLiveBetter/blob/0cec2b3/docs/核实记录/<tên file>`. Lấy cặp mục–file từ commit thêm mục: `git show --stat <hash>`.

Không viết "phần X, mục Y" trong ngoặc tròn kiểu trích dẫn trần, vì check-refs không quét thư mục con nên anchor không được kiểm. Vẫn giữ cụm từ khóa cho người đọc.

- [ ] **Step 3: Commit**

```bash
git add docs/ghi-chep-kiem-chung/dong-bo-upstream-2026-10.md
git commit -m "Ghi chép kiểm chứng: trỏ tới ghi chép của bản gốc cho 38 mục mới

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 19: Chốt đợt, đánh dấu điểm đồng bộ, bàn giao

**Files:**
- Không sửa file. Tạo một merge commit.

**Interfaces:**
- Consumes: Task 1–18.
- Produces: `git merge-base HEAD upstream/main` = `0cec2b3…`. Đợt sau chỉ thấy commit mới của bản gốc.

- [ ] **Step 1: Kiểm toàn bộ lần cuối**

```bash
node tools/check-sync.mjs --all 0cec2b3 > "$TMPDIR/cs.txt"; echo "exit=$?"; grep -v ': khớp' "$TMPDIR/cs.txt"
node tools/check-refs.mjs --check | tail -1
node tools/check-plain.mjs | tail -1
node tools/sync-stats.mjs --check | tail -1
node tools/check-sync.mjs --self-test
git status --short
```

Expected:
- `exit=0`.
- check-refs đạt, check-plain `không đạt 0`, `Số liệu thống kê đã khớp`, `self-test: đạt 8 ca`.
- `git status` sạch, trừ `.DS_Store`.

- [ ] **Step 2: Build thử ba bản điện tử ở máy (nếu có công cụ)**

Run: `cd tools/epub && npm ci && npm run build && cd ../..`
Expected: build xong, `dist/HowToLiveBetter.epub` tồn tại. PDF cần pandoc và typst nên để CI kiểm.

- [ ] **Step 3: Đánh dấu điểm đồng bộ**

```bash
git merge -s ours --no-ff 0cec2b3 -m "Đánh dấu đã đồng bộ bản gốc tới 0cec2b3 (đợt 1)

Nội dung đã port tay trong các commit trước của nhánh này; merge -s ours không lấy
file nào của bản gốc, chỉ để merge-base nhảy lên 0cec2b3.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git merge-base HEAD upstream/main
git diff HEAD~1 --stat | tail -1
node tools/sync-worklist.mjs --all --to 0cec2b3
```

Expected:
- merge-base in `0cec2b3…`.
- `git diff HEAD~1 --stat` không in gì: merge không đổi file nào.
- `sync-worklist` in `không có việc (0cec2b3..0cec2b3)`.

- [ ] **Step 4: Bàn giao, hỏi anh trước khi đẩy lên**

Báo cho anh:
- số commit của nhánh;
- mốc số liệu cuối;
- các mục mà review phải sửa tay;
- việc còn để sau: `split-items`, đợt đồng bộ kế tiếp tính từ `0cec2b3`.

Hỏi anh có muốn `git push -u origin dong-bo-upstream-dot-1` và mở PR vào `main` không. PR sẽ liệt kê cả 69 commit của bản gốc, vì merge `-s ours` đưa lịch sử gốc vào nhánh. Diff của PR chỉ gồm thay đổi của fork.
