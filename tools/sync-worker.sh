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
