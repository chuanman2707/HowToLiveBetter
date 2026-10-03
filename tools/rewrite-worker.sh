#!/usr/bin/env bash
# Phát lệnh "viết lại giọng" cho một CLI worker — giữ prompt chuẩn và cờ headless
# của từng CLI ở một chỗ, để orchestrator khỏi tự ráp. Spec:
# docs/superpowers/specs/2026-10-03-giong-van-nguoi-thay-design.md
#
#   tools/rewrite-worker.sh <claude|agy|grok|devin> <NN>   # worker viết lại chương NN
#   tools/rewrite-worker.sh review <NN>                    # claude review (KHÔNG sửa file)
#   tools/rewrite-worker.sh -n <cli> <NN>                  # chỉ in prompt + lệnh, không chạy
#
# Worker chỉ sửa file và chạy checker; KHÔNG commit — commit do orchestrator làm
# sau khi check-rewrite.mjs/check-plain/check-refs sạch và (với worker) claude
# review đạt.
set -euo pipefail
cd "$(dirname "$0")/.."

DRY=0
[ "${1:-}" = "-n" ] && { DRY=1; shift; }
CLI=${1:-}
CH=${2:-}
[ -n "$CLI" ] && [ -n "$CH" ] || { echo "cần: <claude|agy|grok|devin|review> <NN>" >&2; exit 2; }

FILE=$(ls "book/${CH}-"*.md 2>/dev/null | head -1)
[ -n "$FILE" ] || { echo "không thấy book/${CH}-*.md" >&2; exit 2; }

# Bản gốc tiếng Trung: file bị xóa trong cùng commit thêm file VN.
ADD=$(git log --diff-filter=A --format=%H -n1 -- "$FILE")
OLD=$(git -c core.quotepath=false show "$ADD" --name-status --format= | awk -F'\t' '$1=="D"{print $2}' | grep -F "book/${CH}-" | head -1)
[ -n "$OLD" ] || { echo "$FILE: không tìm được bản gốc TQ trong $ADD" >&2; exit 2; }

SPEC=docs/superpowers/specs/2026-10-03-giong-van-nguoi-thay-design.md

if [ "$CLI" = "review" ]; then
  read -r -d '' PROMPT <<EOF || true
Review file $FILE đang trong working tree — bản vừa được viết lại giọng "người
thầy trò chuyện". KHÔNG sửa file, KHÔNG commit.

Đọc trước: $SPEC (giọng văn + danh mục không-được-động).

Đối chiếu ba thứ:
1. Giọng: so với spec — câu có chủ ngữ rõ, nhịp tự nhiên, không calque trong
   bảng di trừ, không văn điện báo, không câu kết thăng hoa.
2. Cấu trúc: so với bản VN cũ (git show HEAD:$FILE) — danh mục không-được-động
   của spec.
3. Nghĩa: so với bản gốc tiếng Trung (git show ${ADD}^:"${OLD}") — chỗ nào viết
   lại mà lệch nghĩa, thêm hoặc mất dữ kiện.

Liệt kê lỗi theo dạng: [giọng|cấu trúc|nghĩa] mục N: <vấn đề> → <đề xuất sửa
ngắn>. Nếu không có vấn đề gì thì trả lời đúng một chữ "SẠCH".
EOF
else
  read -r -d '' PROMPT <<EOF || true
Đọc ba file này trước khi làm:
- CLAUDE.md — quy tắc dự án
- $SPEC — giọng văn "người thầy trò chuyện" + danh mục không-được-động
- /Users/binhan/.agents/skills/no-ai-slop/SKILL.md — mẫu văn AI cần di trừ

Việc: viết lại văn phong TOÀN BỘ file $FILE theo giọng trong spec.
Đây là viết lại câu chữ, không phải dịch lại nội dung — mọi dữ kiện, con số,
kết luận, nguồn trích giữ nguyên. Bản gốc tiếng Trung để đối chiếu nghĩa:
  git show ${ADD}^:"${OLD}"

Danh mục không-được-động trong spec là cứng: tiêu đề mục, tên field, thẻ
nhan-chi-phi, cột Nguồn, mọi con số, marker Ghi chú, line ending của file.

Sau khi sửa xong chạy: node tools/check-plain.mjs && node tools/check-refs.mjs --check
và tự sửa tới khi sạch. KHÔNG git add, KHÔNG git commit.
Cuối cùng in ra: số mục đã viết lại, lỗi checker còn lại (phải là 0).
EOF
fi

case $CLI in
  claude) CMD=(claude -p "$PROMPT" --dangerously-skip-permissions) ;;
  agy)    CMD=(agy -p "$PROMPT" --dangerously-skip-permissions) ;;
  grok)   CMD=(grok -p "$PROMPT" --always-approve) ;;
  devin)  CMD=(devin -p "$PROMPT" --permission-mode dangerous --respect-workspace-trust false) ;;
  review) CMD=(claude -p "$PROMPT" --dangerously-skip-permissions) ;;
  *) echo "cli không biết: $CLI" >&2; exit 2 ;;
esac

if [ $DRY = 1 ]; then
  printf '%q ' "${CMD[@]}"; echo
  echo "---PROMPT---"
  printf '%s\n' "$PROMPT"
  exit 0
fi
"${CMD[@]}"
