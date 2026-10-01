# Bảng đối chiếu trích dẫn

File này do `node tools/check-refs.mjs` sinh ra, đừng sửa tay.

Các trích "mục X" trong thân bài chỉ ghi số mục chứ không ghi nội dung. Thêm
hay xóa một mục sẽ làm các trích phía sau trỏ lệch hàng loạt, mà số mục sau
khi lệch thường vẫn nằm trong phạm vi — chỉ kiểm vượt biên không bắt được.
Vì vậy mỗi trích được ghi kèm **tiêu đề mục nó thực sự trỏ tới** vào đây và
commit cùng repo: sau khi đổi mục chạy lại tool, trong `git diff` chỗ nào số
mục không đổi mà tiêu đề đổi là trích đã bị dồn số đẩy lệch.

Phạm vi quét: thân các mục và đoạn mở đầu của từng phần trong `book/`, cộng
các bài dài ngay dưới `docs/`. Bài dài không có khái niệm "phần này" — "mục N"
trần trong bài dài không quét, nên trích ở đó phải viết đủ "phần X, mục Y".
Cột "Nơi trích": trong mục ghi "mục N", mở đầu phần ghi "Mở đầu phần", bài
dài ghi tiêu đề nhỏ gần nhất.

Lớp bảo hiểm thứ hai là **anchor**: quanh mỗi trích phải có ít nhất một đoạn
chữ trùng với tiêu đề mục đích ("trợ cấp y tế xem mục 11" có "trợ cấp y tế",
hoặc viết tường minh "xem mục 16 (giấy vay và bảo lãnh)").
`node tools/check-refs.mjs --check` coi trích không anchor là fail — loại đó
bị dồn lệch thì diff của bảng cũng không thấy gì, chỉ có anchor chặn được.
Trích khoảng ("mục 11 đến 14") và trích cả phần ("phần 8") là ngoại lệ: trỏ
cả một khối, không ghép anchor từng mục được, chỉ trông vào diff.

Anchor đủ hay không xét theo độ dài và khoảng cách, sau khi chuẩn hóa bỏ dấu:
chuỗi con chung dài nhất giữa ngữ cảnh và tiêu đề ≥ 12 ký tự trong cả câu,
hoặc ≥ 8 ký tự trong cụm chứa trích, mới tính là anchor thật; chỉ khớp 8+ ký
tự ngoài cụm thì coi như không có anchor (đa số là từ phổ biến trùng ngẫu
nhiên). Đợt siết này bắt nguồn từ sự cố 2026-09-20 của bản TQ: chèn mục làm
một trích trôi sang mục mới, và một cụm nằm cách hai dấu phẩy tình cờ trùng
chữ trong tiêu đề mới, `--check` khi đó báo đạt.

Tổng cộng 41 trích dẫn.

## 01-dung-chet-som

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 4 | phần 13 | 13-紧急情况 (cả phần) | … Ngộ độc khí CO là chuyện khác, xem … |
| mục 16 | mục 18 | Phụ nữ trên 30 tuổi tầm soát ung thư cổ tử cung, ưu tiên xét nghiệm HPV | …cung, vaccine không thay được sàng lọc, xem … |
| mục 25 | mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … và kết cục dài hạn sau khi chưa thành, xem … |
| mục 25 | mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … Được cứu về sẽ để lại gì, xem … |
| mục 26 | phần 13, mục 12 | 大出血先用手死死压住伤口，四肢压不住就上止血带，同时打 120 | … Cách dùng garô và số cấp cứu 120 xem … |
| mục 26 | mục 3 | Lắp máy báo khói; ai mùa đông đốt than hay dùng gas sưởi trong nhà thì lắp thêm máy báo khí CO | … Máy báo khói và máy báo khí CO xem … |
| mục 28 | mục 7 | Đo huyết áp, cao thì uống thuốc hạ về mức chuẩn | … Thứ cần khám giống hệt … |
| mục 28 | mục 8 | Sau 35 tuổi chỉ cần thừa cân thì đi xét nghiệm đường huyết lúc đói một lần, bình thường cũng cứ ba năm xét lại | … Thứ cần khám giống hệt … |
| mục 28 | mục 29 | Giảm cân, bỏ thuốc, giữ huyết áp và đường huyết ổn định, chức năng cương dương khá lên theo | … Cách cải thiện xem … |
| mục 28 | mục 27 | Nước tiểu có máu nhìn thấy bằng mắt thường, dù không đau, dù hôm sau đã sạch, cũng phải đi khám một lần | … loại tín hiệu như … |
| mục 29 | phần 2, mục 1 | 戒烟，越早越好 | … bỏ thuốc xem … |
| mục 29 | phần 2, mục 33 | 把 BMI 控制在 20–25，超重就减 | …(bỏ thuốc, càng sớm càng tốt), giảm cân xem … |
| mục 29 | phần 28, mục 4 | 不要买承诺「快速瘦」的减肥药、减肥咖啡、瘦身糖果和酵素梅 | …ày, liều lượng không rõ, cách nhận biết xem … |
| mục 29 | mục 7 | Đo huyết áp, cao thì uống thuốc hạ về mức chuẩn | … (giữ BMI trong khoảng 20–25), huyết áp xem … |
| mục 30 | phần 13 | 13-紧急情况 (cả phần) | … Đã phơi nhiễm rồi thì làm sao xem … |
| mục 31 | phần 27 | 27-怀孕和生产 (cả phần) | …a bệnh trong thai kỳ và chặn lây mẹ-con xem … |
| mục 32 | phần 3, mục 19 | 情绪低落时先做性价比最高的几件事：动起来、晒太阳、按时睡、找人说、打 12356 | …ng, phơi nắng, ngủ đúng giờ, gọi 12356) xem … |
| mục 32 | phần 8, mục 15 | 身边人说出「谁也别想好过」「带着孩子一起走」，别当气话：近亲属可以直接送诊，公安接到报警也必须管 | … cạnh để lộ ý nghĩ này bạn làm được gì, xem … |
| mục 32 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … đoạn gây chết ra xa và đường dây 12356 xem … |
| mục 32 | mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … Di chứng sau khi được cứu xem … |
| mục 33 | phần 13, mục 19 | 一氧化碳报警器响了，或者一屋子人同时头痛恶心，先出门再打电话 | … Xử trí hiện trường khi ngộ độc khí CO xem … |
| mục 33 | phần 13, mục 20 | 误服清洁剂、农药、药物先别催吐，带上瓶子立刻就医；溅到眼睛或皮肤用大量清水冲 15 分钟 | … gây nôn trước, mang theo chai đi khám, xem … |
| mục 33 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …ông tích trữ thuốc trừ sâu và thuốc ngủ xem … |
| mục 34 | phần 17, mục 8 | 家里有人长期卧床，把压疮当头号敌人：上电动气垫床、定时翻身、每天看一遍骨头突出的地方 | …u mà thời gian nằm dài đáng để mắt nhất xem … |
| mục 34 | phần 13, mục 11 | 一条腿突然肿起来、发紧、按着疼，尽快就医；再加上突然喘不上气或者胸痛，立刻打 120 | …t khối tĩnh mạch sâu và thuyên tắc phổi xem … |
| mục 34 | mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … Ý nghĩ nảy ra thì làm sao xem … |
| mục 34 | mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … Hậu quả ngộ độc xem … |
| mục 35 | phần 9, mục 22 | 不卖自己的器官，也别帮人找供体：肾到手 2 万多，同一枚转手卖 20 万，钱要被没收还要按交易额罚 10 到 20 倍 | …à trách nhiệm hình sự của hiến hợp pháp xem … |
| mục 35 | phần 16, mục 1 | 药按医嘱吃满，别感觉好了就停 | …, quyết toán liên tỉnh và thuốc dài hạn xem … |
| mục 35 | phần 16, mục 2 | 先办门诊慢特病认定再办异地备案，高血压、糖尿病、放化疗、透析、抗排异就能异地直接结算 | …, quyết toán liên tỉnh và thuốc dài hạn xem … |
| mục 37 | phần 9, mục 13 | 麻将、扑克可以打，不抽头、不当庄、不组局收钱，不玩网络赌博 | … Ranh giới pháp luật của đánh bạc xem … |
| mục 37 | phần 8, mục 44 | 家里人赌博欠了债，别急着替他还：赌债法律不保护，为赌借的钱也不算夫妻共同债务 | …nhà nợ nợ cờ bạc có nên trả thay không, xem … |
| mục 37 | mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … Ý nghĩ tự tử nảy ra sau đó làm sao, xem … |
| mục 38 | phần 13, mục 38 | 可能被 HIV 暴露了，72 小时内去拿阻断药，越早越好 | … Đã xảy ra hành vi nguy cơ, cách cứu xem … |
| mục 38 | mục 30 | Quan hệ tình dục dùng bao cao su suốt quá trình, không dùng chung kim tiêm với ai | … tình dục đó, bao cao su vẫn phải dùng, xem … |

## 18-nuoi-con-co-dang-khong

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 10 | 10-恋爱和结婚划不划算 (cả phần) | … Giống như … |
| Mở đầu phần | phần 27 | 27-怀孕和生产 (cả phần) | …ng thai và cần đi thủ tục từng bước thì xem … |
| mục 3 | phần 19 | 19-在职离职和工伤 (cả phần) | … Đòi bồi thường thế nào xem … |
| mục 3 | phần 19 | 19-在职离职和工伤 (cả phần) | …ổi việc trái luật, đường đòi bồi thường xem … |
| mục 4 | phần 10 | 10-恋爱和结婚划不划算 (cả phần) | … Cách tính giống cách tính việc nhà ở … |
| mục 6 | phần 10 | 10-恋爱和结婚划不划算 (cả phần) | … Cách xét giống … |
