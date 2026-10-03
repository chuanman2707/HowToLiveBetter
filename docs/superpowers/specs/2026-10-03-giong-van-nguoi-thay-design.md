# Viết lại giọng văn toàn sách: "người thầy trò chuyện"

Ngày: 2026-10-03
Phạm vi: `book/01`–`book/34` (34 chương, ~318 nghìn từ). Không động `docs/`, `README.md`, `tools/`, `index.html`.

## Bối cảnh

Bản dịch hiện tại đúng nghĩa nhưng đọc biết ngay là dịch máy. Chủ sách yêu cầu viết lại câu chữ
thành văn của "một giáo sư viết sách khuyên người trẻ" — người thật viết, câu có nhịp, tôn trọng
người đọc. Đây là viết lại **văn phong**, không phải dịch lại nội dung: mọi dữ kiện, con số,
kết luận giữ nguyên.

Spec này là văn bản điều khiển toàn bộ công việc. Orchestrator (một phiên claude do chủ sách
mở trong kho này) đọc spec này cùng `CLAUDE.md` rồi tự điều phối các CLI worker; mọi lời gọi
worker đi qua `tools/rewrite-worker.sh` để dùng chung một prompt chuẩn.

## Giọng văn mục tiêu

Người thầy ngồi nói chuyện với người trẻ mình tin tưởng: thẳng, rõ, thương người đọc, không
nói lý thuyết. Nhận diện bằng các tín hiệu sau.

- **Xưng "bạn"** với người đọc. Tác giả không tự xưng; khi cần nêu chủ kiến, dùng "theo tác giả"
  hoặc lồng vào lời khuyên ("phần khó duy nhất là ngại").
- **Mỗi câu có chủ ngữ rõ** (bạn, quán, công ty, tòa án, bác sĩ, luật). Cấm câu trôi không chủ
  kiểu "Làm không được là vi phạm" — phải thành "Chủ quán làm không được là vi phạm" hoặc
  "Nếu quán không làm, đó là vi phạm".
- **Một câu một việc**, dài khoảng 30 từ, tối đa 50 từ (giữ nguyên chuẩn cứng CLAUDE.md).
- **Nhịp ngắn-vừa xen nhau.** Bản hiện tại bị hai lỗi đối lập: câu cụt lủn kiểu điện báo
  ("Mở miệng đòi một lần đơn") xen câu lùi dồn một hơi ("Mấy thứ dưới đây chiếm một là đổi
  chỗ"). Bản mới viết trọn ý, dùng "vì", "nên", "nhưng", "còn" nối hai ý có nhân quả.
- **Được phán đoán ngắn** trong giọng người thầy: "đáng", "đừng tiếc", "phần khó nhất là".
  Cấm thêm sự thật mới, cấm triết lý hóa, cấm câu kết thăng hoa, cấm an ủi sáo rỗng.
- **Vẫn đọc-một-lượt-hiểu.** Giọng giáo sư không có nghĩa là văn hoa. Người đọc chậm, người già
  vẫn đọc từng chữ một được — đây là lý do các chuẩn cứng bên dưới vẫn giữ.

## Danh mục không-được-động (cứng, vi phạm là làm lại)

1. **Tiêu đề mục** (`### N.`): chỉ được thêm từ giải thích, không bớt từ, không đổi từ
   (làm anchor cho `tools/check-refs.mjs`). Tốt nhất giữ nguyên.
2. **Tên field**: `- Chi phí:`, `- Nói dễ hiểu:`, `- Lợi ích:`, `- Mức chứng cứ:`, `- Nguồn:`,
   `- Ghi chú:` — giữ nguyên chữ, nguyên thứ tự, nguyên dạng gạch đầu dòng.
3. **Thẻ `<!-- nhan-chi-phi: ... -->`**: byte-identical, không đổi giá trị nào.
4. **Cột `- Nguồn:`**: giữ nguyên toàn bộ — nguyên văn tiếng Trung, số điều, link. Không dịch,
   không sửa chính tả, không rút gọn.
5. **Mọi con số** trong toàn mục: năm, phần trăm, OR/RR/HR, khoảng tin cậy, cỡ mẫu, tiền,
   thời hạn, số điện thoại. Chữ số giữ nguyên định dạng (45%, 0,58, 11.523). Một con số rớt
   hoặc đổi giá trị = làm lại.
6. **Marker mở đầu Ghi chú**: `Chỉ tham khảo TQ:` đứng đầu; `Tranh cãi` đứng ngay sau marker
   hoặc đứng đầu khi không có marker. Không được đẩy xuống giữa câu.
7. **Trích chéo** "phần X, mục Y (từ khóa)": giữ số phần/số mục; từ khóa trong ngoặc phải còn
   khớp tiêu đề đích. Được phép viết lại phần văn dẫn quanh nó.
8. **Ghi chú tối đa một link**; văn kiện chỉ trích ở cột Nguồn. Ghi chú dài >~700 chữ cân nhắc
   rút — nhưng việc rút nội dung cần giữ đủ ý gốc, ưu tiên nén câu chữ chứ không cắt thông tin.
9. **Cấu trúc file**: một dòng trống giữa các mục, thứ tự mục, số thứ tự `### N.` không đổi.
   Line ending của từng file giữ nguyên (có file CRLF, có file LF — không chuẩn hóa hàng loạt).
10. **Nội dung mục đầu chương** (đoạn mở sau `# NN.`): được viết lại giọng như mọi văn khác,
    nhưng giữ mọi chỉ đường "phần X, mục Y" và con số.

## Bảng di trừ calque và văn dịch-máy

Nguyên tắc: **dịch chức năng, không dịch mặt chữ**. Cùng một từ, chỗ này phải đổi, chỗ kia giữ
được — đọc ngữ cảnh rồi quyết. Thuật ngữ pháp lý TQ cần giữ thì giữ, nhưng phải kèm giải thích
đời thường ngay cạnh.

| Mẫu hiện tại | Bệnh | Cách viết lại (tùy câu) |
|---|---|---|
| nhất loạt | 一律, không ai nói | "đều", "cứ … là", "hễ … thì" |
| cấu thành | 构成 | "tính là", "phạm tội", "được xem là"; "không cấu thành lời khuyên đầu tư" → "đây không phải lời khuyên đầu tư" |
| tình tiết (nghiêm trọng/trọng đại) | 情节(严重/重大) | "trường hợp nặng", "vụ nặng và phức tạp"; khi là thuật ngữ án thì "tình tiết" được, nhưng phải đọc tự nhiên |
| kịp thời | 及时 | "ngay", "kịp lúc"; phần lớn cắt hẳn |
| đơn vị | 单位 | đổi theo thực thể: "công ty", "cơ sở", "cơ quan", "nơi làm việc"; thuật ngữ luật "đơn vị + cá nhân" viết "tổ chức lẫn cá nhân" |
| tiện | 顺便 | "nhân tiện", "luôn thể", "tiện tay" |
| bản thân (làm chủ từ) | 本身 | thường thừa — cắt; khi cần nhấn: "chính nó", "riêng việc đó" |
| gánh (trách nhiệm) | 承担 | "chịu trách nhiệm", "phải bồi", "gánh" chỉ giữ khi câu đã tự nhiên |
| đình nghiệp | 停业 | "phải nghỉ kinh doanh", "bị đình chỉ" |
| xử phạt trị an | 治安处罚 | "phạt hành chính" (khi cần giữ nét TQ thì viết "xử phạt hành chính về trật tự trị an") |
| tạm giam | 拘留 | "bị giữ X ngày", "giam X ngày"; thuật ngữ luật giữ nhưng kèm giải thích |
| bộ phận liên quan | 有关部门 | ghi tên cơ quan cụ thể nếu văn bản có; không rõ thì "cơ quan quản lý" |
| ký lục | 记录 (danh từ) | "hồ sơ", "bản ghi" |
| tiến hành + danh động từ | 进行 | động từ trực tiếp: "tiến hành kiểm tra" → "kiểm tra" |
| thực hiện (hợp đồng/nghĩa vụ) | 履行 | "giữ (hợp đồng)", "không thực hiện hợp đồng" → "không giữ hợp đồng" |
| phát sinh | 发生 | "xảy ra", "có"; thường thừa — cắt |
| tương đương | 相当于 | "bằng", "ngang" |
| đối đãi | 对待 | "đối xử" |
| chủ động | 主动 | thường thừa — cắt; khi cần: "tự", "mở miệng trước" |
| công nhận | 公认/承认 | "thừa nhận", "ai cũng thừa nhận" |
| áp dụng | 适用/应用 | "dùng", "áp dụng" giữ khi là thuật ngữ luật |
| đảm bảo | 保证/确保 | "bảo đảm" (thống nhất dấu), "cam kết" khi là nghĩa vụ |
| suy sụp | 崩溃 | "kiệt sức", "sụp đổ", "quá sức chịu" |
| trông chờ/trông đợi | 指望 | "trông đợi", "mong" |
| quan tâm | 关注/关心 | "để ý", "lo" — tùy câu |
| người làm nghề | 从业人员 | "nhân viên quán", "người phục vụ" |
| sở (cơ quan) | 所/部门 | "phòng", "cơ quan" |
| dồn qua, thất thủ, cào tuyên truyền | từ vựng TQ vay thẳng | dịch lại theo nghĩa: "dồn qua" → "cho qua chuyện", "cào tuyên truyền" → "làm số liệu ảo để quảng cáo" |
| tức / tức là | 即, lạm dụng | "nghĩa là", "—", hoặc tách thành câu riêng |
| "Nội dung đăng ký và bản sao lưu ký lục lưu không ít hơn 60 ngày" | câu trích điều lệ dịch gượng | trích văn luật được phép viết lại cho trôi chảy nhưng phải giữ đúng nội dung pháp lý (khoản mục, con số, điều kiện) |

**Thêm ba lỗi câu hay gặp:**

- **Lặp chữ trong câu**: "bán dịch vụ bán hàng", "ký lục lưu" — viết lại không được để lặp.
- **Câu xếp chồng không liên kết**: "Mấy thứ dưới đây chiếm một là đổi chỗ: phòng tầng hầm, chỉ
  một lối ra…" — viết lại thành câu có nhịp: "Chỉ cần chỗ đó trúng một trong mấy điểm sau thì
  đổi quán khác: phòng ở tầng hầm, chỉ có một lối ra…"
- **Chỉ đường mơ hồ**: "mấy thứ dưới đây", "loại chỗ này", "đầu kia" — nêu rõ thứ đang nói.

## Quy tắc theo field

- **Chi phí**: 1-3 câu, được phép giọng thầy thoải mái nhất ("Không tốn đồng nào, chỉ tốn một
  câu hỏi"). Vẫn ghi đủ tiền/thời gian/sức chịu đựng như bản gốc.
- **Nói dễ hiểu**: 2-4 câu, ≤60 từ, chỉ dịch lại Lợi ích — không thêm số, không thêm fact,
  không jargon nghiên cứu (`check-plain.mjs` kiểm). Đây là dòng người đọc thấy đầu tiên trên
  trang tra cứu — viết tự nhiên nhất có thể trong khung đó.
- **Lợi ích**: giữ mọi con số, CI, tên quần thể, năm. Được viết lại câu chữ và thêm bản dịch
  ngay cạnh giá trị gốc ("OR 0,58 (thấp khoảng 42%)") — giá trị gốc không đổi. Trích nguyên
  văn điều luật được viết lại trôi chảy nhưng giữ đúng nội dung.
- **Ghi chú**: marker giữ đầu dòng; sau marker viết tự do trong giọng thầy — đây là nơi phán
  đoán của tác giả được phép nghe rõ nhất, nhưng không thêm fact mới. Tối đa một link.
- **Mức chứng cứ, Nguồn**: không động.

## Ví dụ trước/sau

### Luật (chương 22, mục 2)

Trước:
> - Chi phí: Không tốn tiền. Mở miệng đòi một lần đơn. Khó ở chỗ hỏi giá trước mặt người ta, hơi ngại.
> - Nói dễ hiểu: Cơ sở giải trí bán dịch vụ bán hàng phải niêm yết giá và chủ động đưa bảng giá. "Rượu giá trên trời" gần như đều ra ở chỗ chưa xem bảng giá, tính theo giá nói miệng. Vào phòng đòi đơn chụp ảnh, tranh chấp gọi ngay 12315 (đường dây nóng người tiêu dùng TQ).

Sau:
> - Chi phí: Không tốn đồng nào, chỉ tốn một câu hỏi. Phần khó nhất là phải hỏi giá ngay trước mặt người phục vụ — hơi ngại một chút.
> - Nói dễ hiểu: Luật bắt quán giải trí niêm yết giá và chủ động đưa bảng giá cho khách. Mấy vụ "rượu tính giá trên trời" gần như luôn xảy ra với người không xem bảng giá, để quán thu theo giá nói miệng. Vào phòng, bạn cứ đòi bảng giá rồi chụp ảnh lại; có tranh chấp thì gọi ngay 12315 (đường dây nóng người tiêu dùng TQ).

### Luật — Ghi chú (chương 22, mục 3)

Trước:
> - Ghi chú: Chỉ tham khảo TQ: Chỉ cần có người lấy ra bột không rõ, viên, đầu pod thuốc lá điện tử, mời bạn "thử một chút", là rời ngay, đừng ở lại xem náo nhiệt. Rủi ro cá nhân bạn gánh nặng hơn cơ sở. Tự mình hút, bản thân đã phải chịu xử phạt trị an. Ở phòng mình đặt hay chỗ ở của mình "để bạn bè dùng một chút ở đây", cấu thành chứa người khác hút ma túy, thuộc tội hình sự

Sau:
> - Ghi chú: Chỉ tham khảo TQ: Chỉ cần có người móc ra bột không rõ, viên thuốc hay đầu pod mời bạn "thử một chút", hãy đi ngay — đừng ở lại xem cho vui. Rủi ro của riêng bạn nặng hơn nhiều rủi ro của quán. Bạn tự hút thì chính bạn đã bị phạt hành chính. Còn nếu bạn để bạn bè "dùng một chút" trong phòng bạn đặt hay nhà bạn, đó là phạm tội chứa người hút ma túy — tội hình sự.

### Tiền bạc (chương 5, mục 1)

Trước:
> - Chi phí: Không tốn tiền. Lật một lượt danh sách "tự động trừ tiền" của Alipay, WeChat, Apple và Android, một lần mất 10 đến 20 phút. Sau này mỗi lần gia hạn phải tự bấm thêm một lần.

Sau:
> - Chi phí: Không tốn tiền. Lật một lượt danh sách "tự động trừ tiền" của Alipay, WeChat, Apple và Android, mất chừng 10 đến 20 phút một lần. Về sau mỗi lần gia hạn bạn phải tự bấm thêm một cái.

### Mở đầu chương (chương 22)

Trước:
> Nửa đầu phần nói trong chỗ giải trí tiền nào bỏ oan, lối thoát an toàn ở đâu, thước là tiền và tự do thân thể. Nửa sau nói giảm áp lực thế nào, thước là tinh lực và tổng tử vong.

Sau:
> Nửa đầu phần này nói về tiền bỏ oan ở chỗ giải trí và lối thoát an toàn — thước đo là tiền và tự do thân thể. Nửa sau nói cách giảm áp lực — thước đo là tinh lực và tổng tử vong.

### Lặp công thức (chương 5, nhiều Ghi chú)

Trước (lặp máy móc ở cuối gần chục Ghi chú):
> Không cấu thành lời khuyên đầu tư.

Sau: viết mỗi chỗ một cách, hợp câu đang đứng:
> Đây không phải lời khuyên đầu tư. / Phần này chỉ đưa cách tính sổ, không phải lời khuyên đầu tư. / Nói trước: đây là cách nhìn, không phải lời khuyên đầu tư.

## Quy trình thực thi

### Điều phối đa CLI

**Orchestrator là claude** (2.1.282): chủ sách mở một phiên claude trong kho này, đưa nó lời
khởi động ở cuối spec; claude tự điều phối — phát chương cho worker, chạy checker, review,
commit. Session Devin viết spec này chỉ là tác giả spec và công cụ, không nằm trong vòng chạy.

| CLI | Vai trò |
|---|---|
| **claude** (2.1.282) | **Orchestrator + chuẩn**: điều phối toàn bộ; tự viết pilot chương 22 định hình giọng và các chương nặng; review các chương do worker viết; nhận lại chương nào worker bỏ cuộc sau hai lượt sửa |
| **agy** (1.2.14), **grok** (1.0.46), **devin** (3000.11.3) | Worker: mỗi lượt gọi nhận đúng một chương, viết lại file, chạy checker tới sạch, báo cáo. Không commit |

**Quy tắc chia việc**: mỗi lần gọi CLI chỉ giao **một chương** (context sạch, lỗi dễ truy,
retry rẻ). Chương nặng số liệu hoặc nhiều trích luật (01, 02, 05, 09, 15, 19) claude tự viết;
chương nhẹ chia đều cho ba worker. Một CLI hết quota hoặc lỗi giữa chừng thì hàng đợi của nó
chuyển cho CLI khác — không giữ chỗ.

**Chạy song song**: orchestrator mở tối đa 3-4 tiến trình nền, mỗi tiến trình một CLI × một
chương khác nhau — file khác nhau nên không va nhau. Worker không được `git commit`; commit
do orchestrator làm tuần tự sau khi kiểm chứng.

### Công cụ dựng sẵn (repo đã có, orchestrator chỉ gọi — không tự ráp prompt)

```bash
tools/rewrite-worker.sh <claude|agy|grok|devin> <NN>   # worker viết lại chương NN
tools/rewrite-worker.sh review <NN>                    # claude review, KHÔNG sửa file
tools/rewrite-worker.sh -n <cli> <NN>                  # chỉ in prompt + lệnh, không chạy

node tools/check-rewrite.mjs book/NN-*.md              # chữ ký cấu trúc + số, so với HEAD
node tools/check-plain.mjs && node tools/check-refs.mjs --check
```

`rewrite-worker.sh` tự tra commit dịch và đường dẫn bản TQ, ráp prompt chuẩn, gọi đúng cờ
headless của từng CLI. Nếu prompt cần sửa thì sửa trong script — mọi lời gọi cùng dùng một
prompt, không ai được viết lách tự do. Prompt chuẩn (tóm tắt): đọc `CLAUDE.md` + spec này +
`~/.agents/skills/no-ai-slop/SKILL.md`; viết lại toàn bộ file theo giọng spec; đối chiếu gốc
TQ qua `git show <commit>^:<path>`; giữ cứng danh mục không-được-động; chạy check-plain +
check-refs --check tới sạch; không commit; báo số mục và lỗi còn lại.

### Vòng làm việc của một chương

1. Worker (hoặc claude, với chương pilot/chương nặng) viết lại file qua `rewrite-worker.sh`.
2. Orchestrator chạy `check-rewrite.mjs` + `check-plain` + `check-refs --check`. Có lỗi thì
   giao lại cho worker sửa — đây là kiểm chứng độc lập, worker không tự chấm mình.
3. Chương do **worker** viết → orchestrator chạy `rewrite-worker.sh review <NN>` để claude
   review giọng và độ trung nghĩa. Có lỗi → trả danh sách lỗi cho worker sửa, tối đa hai
   lượt; không đạt thì claude tự viết lại chương đó. Chương do chính claude viết chỉ qua
   checker + orchestrator đọc diff.
4. Sạch → orchestrator `git add` file đó và commit: "Viết lại giọng chương NN (<cli>)".

`check-rewrite.mjs` kiểm (chi tiết ở đầu file script): line ending; dãy số mục; tiêu đề mục
chỉ thêm từ; số field; giá trị thẻ `nhan-chi-phi`; dòng `Nguồn` nguyên nội dung; `Mức chứng
cứ`; marker `Ghi chú`; và mọi con số của bản cũ còn đủ trong bản mới — số mất là lỗi cứng vì
spec đòi giữ ký hiệu số, số mới xuất hiện thì cho phép (bản dịch quy đổi kèm giá trị gốc).

### Rollout

- Nhánh `giong-van-nguoi-thay` (từ main), một chương một commit, message ghi rõ CLI nào viết
  (ví dụ "Viết lại giọng chương 22 (claude)") để truy chất lượng theo nguồn.
- **Pilot**: claude tự viết chương 22 → **DỪNG**, trình diff cho chủ sách duyệt → duyệt xong
  mới điều phối 33 chương còn lại.
- Nếu pilot lệch giọng: chỉnh spec trước, viết lại pilot, duyệt lại — không chạy hàng loạt
  trên giọng chưa duyệt.
- **Trạng thái & resume**: tiến độ = git log nhánh. Session orchestrator hết context hay chết
  giữa chừng → mở phiên claude mới, bảo "đọc spec + `git log --oneline main..HEAD`, tiếp tục
  từ chương kế tiếp" — không mất quá một chương đang dở.
- Sau chương cuối: `node tools/sync-stats.mjs --check` — số liệu thống kê phải không đổi;
  nếu đổi nghĩa là đã động marker, mức chứng cứ hay số mục, phải truy ngược. Merge hay mở PR
  theo ý chủ sách.

### Lời khởi động (chủ sách paste vào phiên claude)

```text
Đọc docs/superpowers/specs/2026-10-03-giong-van-nguoi-thay-design.md, CLAUDE.md
và /Users/binhan/.agents/skills/no-ai-slop/SKILL.md. Bạn là orchestrator của đợt
viết lại giọng toàn sách theo spec đó: tạo nhánh giong-van-nguoi-thay từ main,
TỰ viết pilot chương 22 (bạn là chuẩn — không giao cho worker), chạy
node tools/check-rewrite.mjs book/22-*.md + check-plain + check-refs --check
tới sạch, rồi DỪNG trình diff cho tôi duyệt. Tôi duyệt xong bạn mới điều phối
33 chương còn lại bằng tools/rewrite-worker.sh, mỗi chương một commit.
```

## Rủi ro và cách bắt

- **Rớt/đổi con số**: check-rewrite.mjs so toàn bộ số cũ→mới. Đây là rủi ro nặng nhất vì khó
  thấy bằng mắt trong 10 nghìn từ một chương.
- **Đổi tiêu đề mục làm gãy anchor**: check-refs.mjs --check + diff bảng đối chiếu.
- **Lệch nghĩa so với gốc TQ**: đối chiếu thủ công trên mẫu ngẫu nhiên mỗi chương; pilot là
  nơi chỉnh thói quen này.
- **Giọng trôi giữa các chương**: spec có ví dụ đủ thể loại; nếu chương sau nhạt dần, đưa lại
  2-3 đoạn pilot làm mốc trong prompt.
- **Mất line ending CRLF**: script kiểm so sánh số dòng + git diff --stat; file nào CRLF giữ CRLF.
- **CLI không nạp context giống nhau**: claude tự nạp CLAUDE.md, các CLI khác có thể nạp
  AGENTS.md hoặc không nạp gì — nên prompt bắt buộc đọc CLAUDE.md + spec + skill bằng đường
  dẫn tường minh, không trông đợi auto-load.
- **Quá tải review**: claude review mọi chương của worker — nếu nó chậm thành nút thắt, giảm
  còn review mẫu 30% mục mỗi chương, các chương đầu của mỗi worker vẫn review toàn phần.
- **CLI chết giữa chừng / hết quota**: file có thể nửa viết — checker sẽ bắt ngay (số mục lệch),
  checkout file lại rồi giao chương cho CLI khác. Nhờ commit theo chương nên mất tối đa một
  chương công.
- **Orchestrator tự viết thay vì điều phối**: nếu claude ôm hết chương tự viết, quota và
  context của nó cạn trước — lời khởi động đã ghi rõ chỉ pilot và chương nặng mới tự viết,
  còn lại phát qua `rewrite-worker.sh`. Thấy nó lệch thì chủ sách nhắc lại.
- **Orchestrator hết context giữa chừng**: tiến độ nằm trong git log nhánh, mở phiên mới đọc
  spec + `git log --oneline main..HEAD` là tiếp được (xem Rollout).

## Ngoài phạm vi

- Không dịch lại từ gốc TQ — chỉ viết lại văn phong tiếng Việt, đối chiếu gốc để không lệch nghĩa.
- Không sửa `docs/`, `README.md`, trang `index.html`, `skills/`, các tool hiện có trong
  `tools/`. Riêng `tools/rewrite-worker.sh` được phép sửa khi prompt chuẩn cần điều chỉnh;
  `tools/check-rewrite.mjs` chỉ sửa khi phát hiện nó bắt sai.
- Không thêm mục mới, không xóa mục, không đổi thứ tự mục, không đổi mức chứng cứ.
- Không "Việt hóa" nội dung TQ (luật, hotline, giá tiền nhân dân tệ) — đó là bản chất cuốn sách.
