# Rà trôi trước fork: số và trích chéo của từng mục so với bản gốc

Ngày 2026-10-09. Nhánh `sua-troi-truoc-fork`, tách từ `dong-bo-upstream-dot-1` (73d5c04, đợt đồng bộ tháng 10 chưa gộp vào `main`).

## Vì sao rà

Lượt duyệt cuối của đợt đồng bộ tháng 10 thấy Ghi chú phần 31, mục 1 không khớp 备注 của 第 31 节第 1 条. Bản VN thiếu câu về điều kiện chính trị, khám sức khỏe, thẩm tra chính trị, và thiếu sáu trích chéo: 第 23 节第 5、4 条, 第 12 节, 本节第 16、13、14 条. Chỗ lệch này có từ trước commit gốc 567bac1, tức trước điểm fork 5881ed0.

`tools/check-sync.mjs` không bắt được loại này. Kiểm ⑦ của nó chỉ đòi những số mà mục gốc có nhiều hơn so với mốc `--since`. Chạy với `--since` là commit gốc đầu tiên (c03a8ab) cũng chỉ ra 14 báo: mục cũ ghép theo tiêu đề hay số mục, số nào đã có ở mục cũ thì không bị đòi. Vì vậy lần rà này so **toàn bộ** tập số và tập trích chéo của từng mục.

## Cách rà

- Mốc so: `0cec2b3`, commit gốc mà đợt đồng bộ đã theo tới. `upstream/main` hiện là `a18ee40`. So với mốc này chỉ thêm một chỗ: phần 2, mục 10 (bàn chải điện, commit gốc fc2800a và 7dc9c8e). Đó là thay đổi mới của bản gốc, để đợt đồng bộ sau, không phải trôi trước fork.
- Đơn vị so: mọi mục của 34 phần, cộng đoạn mở đầu mỗi phần. Bỏ dòng Nguồn (kiểm ④ của check-sync đã đòi khớp nguyên văn) và thẻ chi phí.
- Số: dùng nguyên bộ đọc `zhNumbers`/`vnNumbers` của check-sync. Thêm ba cách đọc phía VN để bớt báo nhầm: dấu chấm thập phân giữ từ bản gốc ("−0.256"), đơn vị "trăm triệu" (= 亿), và số viết bằng chữ ("mười năm", "ba tháng"). Trích chéo bị bỏ khỏi chuỗi trước khi đọc số, để danh sách số chỉ là dữ liệu.
- So hai mức. Mức mục: số của mục gốc mà cả mục VN không có. Mức field: số của một field gốc (tiêu đề, 成本, 说人话, 收益, 备注) có trong mục VN nhưng không có ở field tương ứng.
- Trích chéo: lấy từ hai bảng do hai bản check-refs sinh ra (`docs/引用对照.md` ở 0cec2b3, `docs/bang-doi-chieu-trich-dan.md` ở bản VN). Bảng gốc không ghi trích cả phần (第 12 节), nên phần đó đọc thẳng từ thân mục gốc.
- Không bắt được: câu chữ trôi mà không kéo theo số hay trích. Câu "điều kiện chính trị, khám sức khỏe" của phần 31, mục 1 thuộc loại này; lần này bắt được nhờ sáu trích đi cùng.

## Đã sửa

**Phần 31, mục 1** (`book/31-nhung-con-duong-sau-tuoi-muoi-tam.md`)

- Ghi chú: dịch lại theo 备注 hiện tại của bản gốc, giữ marker `Chỉ tham khảo TQ:`. Sáu trích đều mang anchor lấy từ tiêu đề đích: phần 23, mục 5 (trung cấp có tuyển xuyên suốt và thi riêng); phần 23, mục 4 (trợ cấp học tập, vay sinh viên); phần 12 (khởi nghiệp và làm ăn); mục 16 (vay bảo đảm khởi nghiệp); mục 13 (sư phạm sinh công phí và y sinh định hướng); mục 14 (tư cách kinh doanh hợp tác lao vụ đối ngoại).
- Nói dễ hiểu: thêm hai ngưỡng 说人话 có mà bản VN thiếu: đi làm thuê phải đủ 16 tuổi, người tốt nghiệp đại học đi lính được nới tới 24 tuổi. Dòng vẫn 4 câu, 59 từ.
- `node tools/check-refs.mjs --check`: tổng trích dẫn từ 1516 lên 1522, đúng bằng sáu trích thêm, không trích nào thiếu anchor.

## Kết quả rà, theo loại

Sau khi sửa phần 31, mục 1, không còn mục nào thiếu số hay trích chéo của bản gốc ở mức mục. Các báo còn lại chia như sau.

### Báo nhầm ở mức mục (không phải thiếu)

| Mục | Số gốc báo thiếu | Lý do |
| --- | --- | --- |
| 06/1 | 14000 | 说人话 làm tròn "1.4 万", bản VN viết số chính xác 14.641 |
| 06/2 | 26000, 15000 | như trên: "2.6 万", "1.5 万" so với 25.871, 15.480 |
| 10/7 | 351.3, 610.6 | 备注 viết phép chia "351.3 / 610.6" không kèm 万, bản VN viết 3.513.000 / 6.106.000 |
| 01/33, 05/43, 18/2, 29/3 | 10, 3, 1, 10 | bản VN viết bằng chữ: "Mười bệnh viện", "Ba tháng sau", "thêm một con", "mười năm đầu" |

### Trích chéo bản gốc có, bảng VN không thấy (không phải thiếu)

- **Bản VN ghi rõ số mục ở chỗ bản gốc chỉ gọi tên phần**: 21/10 (phần 8, mục 29), 22/6 và mở đầu phần 22 (phần 3, mục 18), 22/9 (phần 3, mục 16), 23/9 (phần 7, mục 12 và 13), 24/4 (phần 16, mục 2), 24/5 (phần 16, mục 3), 27/16 (phần 1, mục 25).
- **Trích có trong thân VN nhưng check-refs không đọc được**, xem mục "Lỗ hổng của check-refs" bên dưới: mở đầu phần 11 ("Mục 1 là mục dùng chung"), 13/23 ("Mục 22 (trời nóng…)"), 26/4 ("mục 5 tới 10"), mở đầu phần 30 ("Phần 18", "Mục 9", "Mục 10").

### Trích chéo chỉ bản VN có (để biết, không sửa)

05/9, 05/22, 06/10, 10/13, 12/11, 17/3, mở đầu phần 17, 19/8, 19/9, mở đầu phần 19, 20/11, 23/4, mở đầu phần 26. Đều là bản VN ghi rõ chỗ bản gốc viết "本节前六条", "第 11 条起", "最后一条", hoặc là trích người dịch thêm vào. Tất cả qua `check-refs --check`.

### Nói dễ hiểu lược số mà Lợi ích vẫn giữ

37 dòng, gần hết dài 54 tới 60 từ, tức đã chạm trần 60 từ của bản VN (bản gốc tính theo chữ Hán nên rộng hơn). Số bị lược vẫn còn trong cột Lợi ích hoặc Ghi chú của cùng mục, nên mục không mất dữ kiện, chỉ dòng tóm tắt mất. Muốn bổ thì phải viết lại cả dòng cho vừa 60 từ. Đây là việc lớn hơn "sửa chỗ thiếu rõ ràng", nên chưa làm, chờ chủ sách quyết.

**Nên cân nhắc bổ** (dòng tóm tắt mất một quy tắc hay một con số người đọc dùng được ngay):

| Mục | 说人话 có, Nói dễ hiểu VN không có |
| --- | --- |
| 05/42 | người trên 65 tuổi mua bảo hiểm ở ngân hàng, về nguyên tắc chỉ được mua loại lợi tức xác định |
| 08/9 | có sai thì khiếu nại được, nơi nhận phải trả lời bằng văn bản trong 20 ngày |
| 08/21 | có bảy tình huống, như đã thi hành xong, mà tòa phải xóa tên trong 3 ngày làm việc |
| 11/12 | không thỏa thuận mức bồi thường thì trả 30% lương bình quân 12 tháng trước khi nghỉ, không thấp hơn lương tối thiểu |
| 26/5 | làm sót mà không sửa thì bị phạt 2 đến 10 vạn |
| 07/2 | thanh tra lao động lập án xong phải tra xong trong 60 ngày làm việc |
| 10/7 | số kết hôn giảm hai phần mười so với năm trước; tỷ lệ 4,3‰ và 2,5‰ trong công báo chia cho toàn dân số |
| 01/32 | sau khi vào viện vì tự hại, 1 năm sau khoảng 2% và từ 9 năm trở đi khoảng 7% chết vì tự tử |
| 03/25 | lạc nội mạc tử cung trung bình 6,7 năm mới được chẩn đoán |

**Chi tiết phụ, lược được**: 01/25 (đường dây mở ít nhất 18 giờ mỗi ngày), 05/5 (doanh thu xổ số 2024 và số vào quỹ công ích), 05/14 (nước máy 0,005 tệ một lít), 05/16 (20 ngày giao dịch gần nhất), 05/32 (cửa hàng thực tế 15,1% không đạt), 08/13 (43 người bị thương), 09/5 (phạt 2,2 vạn), 09/8 (số ảo 0,1 tệ một số), 09/9 (8 viên gạch, năm 2024), 09/24 (ông chủ nhóm phụ đề bị phán 3 năm 6 tháng), 09/25 (thêm 20 vạn chi phí), 11/2 (tiền phạt cao nhất 1.000 vạn), 11/6 (phạt 3 vạn), 11/19 (tạm giữ 37 ngày), 12/3 (ví dụ ghi 100 vạn), 22/4 (phạt 1.000 đến 5.000 tệ), 22/5 (năm 2022).

**Lược đúng quy tắc của bản VN**: 10/3 (261 người) và 28/1 (44 trường) là cỡ mẫu, CLAUDE.md cấm viết trong Nói dễ hiểu. 11/3: số 12306 là tên trang bán vé, bản VN viết "vé tàu". 27/8 và 33/1: số cấp cứu 120 của Trung Quốc đổi thành "gọi cấp cứu". 08/31: trích "phần 9, mục 18 (chưa đủ 14 tuổi)" chuyển sang Lợi ích.

**Báo nhầm**: 08/32, 09/7, 09/22, 11/15, 26/6. Bản VN viết khoảng tiền gọn ("3–10 vạn", "2 đến 20 vạn"), bộ đọc số hiểu số đầu không kèm đơn vị.

## Lỗ hổng của check-refs

Hai lỗ hổng dưới đây đã sửa trên nhánh `sua-check-refs-chu-hoa-toi`, ở cả `check-refs.mjs` và `renumber.mjs`. Tổng trích dẫn từ 1522 lên 1584: thêm 64 trích vốn bị bỏ sót, bớt 2 dòng ở 31/3 vốn là khoản luật ("Điều 57 khoản 1 mục 2", "hành vi mục 2 khoản trước") bị tính nhầm là trích tới mục 2. Mọi trích mới hiện ra đều đã có anchor.

1. **Chữ hoa đầu câu không được quét.** CROSS, WHOLE, SAME khớp `mục`/`phần` phân biệt hoa thường. Trích đứng đầu câu ("Mục 22 (…)", "Phần 18 tính…") không vào bảng đối chiếu, không bị kiểm anchor, bị dồn lệch cũng không ai thấy. Chỗ đang dính: mở đầu phần 11, 12/11 (Nói dễ hiểu), 13/23 (Ghi chú), mở đầu phần 23 (sáu chỗ), 23/9 (Ghi chú, "Phần 7"), mở đầu phần 25 (hai chỗ), mở đầu phần 30 (sáu chỗ), `docs/danh-muc-do-dung-khan-cap-gia-dinh.md` dòng 53. Không đơn giản bật cờ `i`: ba chỗ "Mục N" là khoản của văn bản luật (08 dòng 326 và 362, 09 dòng 196), bật lên sẽ thành trích không anchor.
2. **Khoảng viết bằng "tới" không được bung.** RANGE và NUMS chỉ nhận "đến". "mục 5 tới 10" chỉ vào bảng thành "mục 5", các mục 6 tới 10 mất. Chỗ đang dính: 26/4, mở đầu phần 23, 25, 30, `docs/lam-nen-tang-can-nhung-giay-phep-gi.md` dòng 64.
