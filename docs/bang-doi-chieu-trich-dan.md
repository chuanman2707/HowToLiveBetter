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

Tổng cộng 162 trích dẫn.

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
| mục 29 | phần 2, mục 1 | Bỏ thuốc lá, càng sớm càng tốt | … bỏ thuốc xem … |
| mục 29 | phần 2, mục 33 | Giữ BMI trong khoảng 20–25, thừa cân thì giảm | …(bỏ thuốc, càng sớm càng tốt), giảm cân xem … |
| mục 29 | phần 28, mục 4 | 不要买承诺「快速瘦」的减肥药、减肥咖啡、瘦身糖果和酵素梅 | …ày, liều lượng không rõ, cách nhận biết xem … |
| mục 29 | mục 7 | Đo huyết áp, cao thì uống thuốc hạ về mức chuẩn | … (giữ BMI trong khoảng 20–25), huyết áp xem … |
| mục 30 | phần 13 | 13-紧急情况 (cả phần) | … Đã phơi nhiễm rồi thì làm sao xem … |
| mục 31 | phần 27 | 27-怀孕和生产 (cả phần) | …a bệnh trong thai kỳ và chặn lây mẹ-con xem … |
| mục 32 | phần 3, mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | …ng, phơi nắng, ngủ đúng giờ, gọi 12356) xem … |
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

## 02-dung-chet-tu-tu

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 1 | mục 3 | Cai thuốc đừng chỉ nhịn, trước hết lấy thuốc: tỷ lệ thành công tăng hơn gấp đôi | … … |
| mục 1 | mục 4 | Đặt một ngày cai thuốc, đến ngày đó dừng hẳn một lần, đừng giảm dần trước | … mục 3 (lấy thuốc cai thuốc), … |
| mục 1 | mục 5 | Đi phòng khám cai thuốc, hoặc gọi 12320 hỏi địa phương có dịch vụ cai thuốc không | …cai thuốc), mục 4 (đặt một ngày cai thuốc), … |
| mục 1 | mục 6 | Cai không được rồi mới cân nhắc thuốc lá điện tử, người vốn không hút thuốc đừng động vào | …ai thuốc), mục 5 (đi phòng khám cai thuốc), … |
| mục 2 | mục 1 | Bỏ thuốc lá, càng sớm càng tốt | … Tự bỏ thuốc lá xem … |
| mục 3 | mục 4 | Đặt một ngày cai thuốc, đến ngày đó dừng hẳn một lần, đừng giảm dần trước | …ải quyết dịp "thèm hút", nên phải dùng cùng … |
| mục 3 | mục 5 | Đi phòng khám cai thuốc, hoặc gọi 12320 hỏi địa phương có dịch vụ cai thuốc không | …dùng cùng mục 4 (đặt một ngày cai thuốc) và … |
| mục 5 | mục 3 | Cai thuốc đừng chỉ nhịn, trước hết lấy thuốc: tỷ lệ thành công tăng hơn gấp đôi | … Thuốc cần phối hợp xem … |
| mục 6 | phần 22, mục 4 | 不吃陌生人给的糖和零食，不喝离开过视线的饮料，不接别人递的烟弹 | …abinoid tổng hợp chảy ra theo đường đó, xem … |
| mục 6 | mục 3 | Cai thuốc đừng chỉ nhịn, trước hết lấy thuốc: tỷ lệ thành công tăng hơn gấp đôi | … Về thứ tự thử trước … |
| mục 11 | mục 14 | Mỗi tuần cộng đủ 150–300 phút vận động cường độ vừa, đi bộ nhanh là được | … Mục này và … |
| mục 13 | mục 39 | Thức khuya thì đêm hôm sau ngủ bù ngay, đừng dồn tới cuối tuần | … Sau thức khuya bù thế nào xem … |
| mục 14 | mục 11 | Mỗi ngày đi đủ 7.000–8.000 bước | … Mục này và … |
| mục 17 | phần 1 | 01-dung-chet-som (cả phần) | …é ngã, giữ được cơ bắp, những cái đó viết ở … |
| mục 20 | mục 22 | Muốn uống ít rượu đi, trước hết đếm xem một tuần uống bao nhiêu, rồi nói với bác sĩ vài phút | … Muốn uống ít đi thì làm sao xem … |
| mục 20 | mục 21 | Người ngày nào cũng uống rượu, ngừng lại là run tay hồi hộp, đừng tự mình cai gắng | …y nào cũng uống không được tự cai gắng, xem … |
| mục 21 | mục 20 | Uống ít rượu hoặc không uống | … Mỗi tuần uống bao nhiêu tính là nhiều xem … |
| mục 21 | mục 22 | Muốn uống ít rượu đi, trước hết đếm xem một tuần uống bao nhiêu, rồi nói với bác sĩ vài phút | …ặc không uống), muốn uống ít đi làm sao xem … |
| mục 22 | mục 21 | Người ngày nào cũng uống rượu, ngừng lại là run tay hồi hộp, đừng tự mình cai gắng | … Đã xuất hiện triệu chứng cai thì xem … |
| mục 29 | mục 7 | Không uống nước ngọt có đường, đổi sang loại không đường cũng chưa tính là giải quyết | … lớn với nước ngọt có đường, thịt chế biến (… |
| mục 29 | mục 19 | Ăn ít thịt chế biến (giăm bông, thịt ba chỉ xông khói, xúc xích, thịt hộp) | … lớn với nước ngọt có đường, thịt chế biến (… |
| mục 29 | mục 7 | Không uống nước ngọt có đường, đổi sang loại không đường cũng chưa tính là giải quyết | … Nên làm được … |
| mục 29 | mục 19 | Ăn ít thịt chế biến (giăm bông, thịt ba chỉ xông khói, xúc xích, thịt hộp) | … Nên làm được … |
| mục 33 | phần 6, mục 26 | 不要指望吃早餐或 16:8 轻断食帮你控制体重，吃饭时间挑你能长期坚持的 | …8 đều không có lợi thêm, xem … |
| mục 38 | phần 3, mục 11 | Chiều buồn ngủ thì chợp 10 phút, đừng ngủ nửa tiếng | … Cách chợp ngắn để tỉnh táo xem … |
| mục 38 | mục 13 | Mỗi đêm ngủ khoảng 7 giờ, giờ giấc cố định | … Đêm ngủ bao lâu xem … |
| mục 39 | phần 3, mục 2 | Cố định giờ thức dậy, cuối tuần cũng vậy | … Mục cuối tuần cũng dậy cố định xem … |
| mục 39 | mục 13 | Mỗi đêm ngủ khoảng 7 giờ, giờ giấc cố định | …i, bản thân nó liên quan bệnh tim mạch, xem … |
| mục 40 | mục 1 | Bỏ thuốc lá, càng sớm càng tốt | … bỏ thuốc xem … |
| mục 40 | mục 12 | Có tăng huyết áp, mỡ máu cao thì uống thuốc đều theo lời bác sĩ, đừng tự ý ngừng | …lá, càng sớm càng tốt), huyết áp mỡ máu xem … |
| mục 40 | mục 39 | Thức khuya thì đêm hôm sau ngủ bù ngay, đừng dồn tới cuối tuần | …eo chỉ định), sau ca đêm ngủ bù thế nào xem … |

## 03-dung-lang-phi-suc-luc

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | mục 20 | Coi cảnh sát, bác sĩ, nhân viên quầy là người đi làm theo quy định, đừng coi như nhân vật: thứ đẩy việc tới trước là giấy tờ và thời hạn, không phải cảm xúc | … Riêng … |
| Mở đầu phần | mục 15 | Coi những ý nghĩ kiểu "mọi việc chắc chắn sẽ tệ hơn" như triệu chứng, không coi là sự thật | … Trong đó … |
| Mở đầu phần | mục 23 | Coi "người khác đòi tôi phải hoàn hảo" như triệu chứng, không coi là sự thật | … 15 (coi ý nghĩ bi quan như triệu chứng) và … |
| mục 2 | phần 2, mục 39 | Thức khuya thì đêm hôm sau ngủ bù ngay, đừng dồn tới cuối tuần | …hỉnh thoảng thức khuya xong bù thế nào, xem … |
| mục 4 | mục 3 | Ngủ đủ 7 đến 8 tiếng mỗi đêm, đừng coi 6 tiếng là đủ | …ine đổi lại là thời lượng ngủ, cộng dồn với … |
| mục 6 | mục 1 | Tắt thông báo không cần thiết, lúc làm việc để điện thoại ngoài tầm nhìn | … Loại sau phải phối hợp … |
| mục 6 | mục 5 | Đổi email và tin nhắn sang xử lý theo đợt, vài lần cố định mỗi ngày | …ợp mục 1 (tắt thông báo không cần thiết) và … |
| mục 9 | mục 3 | Ngủ đủ 7 đến 8 tiếng mỗi đêm, đừng coi 6 tiếng là đủ | … Cái giá của bản thân việc thức khuya xem … |
| mục 11 | phần 2, mục 38 | Giữ giấc ngủ trưa trong nửa tiếng, đừng quá một tiếng; phải ngủ một hai tiếng mới chịu được thì đi kiểm tra nguyên nhân | … và nguy cơ bệnh tim mạch vành cao hơn, xem … |
| mục 18 | phần 8 | 08-别把自己搭进去 (cả phần) | …hật sự có tổn thất thì đi đường pháp lý của … |
| mục 18 | phần 9 | 09-普通人容易踩的法律红线 (cả phần) | …tổn thất thì đi đường pháp lý của phần 8 và … |
| mục 19 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …ĩ tự sát phải đi khám, gọi 12356 trước (xem … |
| mục 20 | phần 8, mục 39 | 报警当场要受案回执，不立案要书面通知：7 日内可申请复议，再 7 日可申请复核，检察院能通知公安立案 | …ày trích đến từ hai quy chương Bộ Công an ở … |
| mục 20 | phần 24, mục 8 | 急重的伤病直奔急诊预检分诊台，别去挂号窗口排队 | …ức theo bệnh tình, không theo ai đến trước (… |
| mục 20 | phần 24, mục 12 | 谢救过你的医生，走感谢信、锦旗和满意度评价，别走红包：准则禁的是财物，不是谢意 | … đường thư cảm ơn và đánh giá hài lòng, xem … |
| mục 20 | phần 8, mục 40 | 别给办案、执法的人送钱送卡：行贿自己也判，对监察、执法、司法人员行贿还要从重 | …ối lộ, và là tội văn bản ghi tăng nặng, xem … |
| mục 21 | phần 4, mục 15 | Đặt giới hạn cứng cho video ngắn và lướt màn hình không mục đích | … Sổ thời gian màn hình tổng xem … |
| mục 21 | phần 4, mục 16 | Không xem TV và tin cuộn, thông tin cần thiết xem tập trung theo giờ cố định | … Sổ thời gian màn hình tổng xem … |
| mục 21 | phần 6, mục 23 | 不要指望买东西改善心情或身份感 | …a vào mua sắm lấy lại cảm giác căn tính xem … |
| mục 21 | phần 6, mục 24 | 不要为了「在周围人里往上挪一档」多花钱换房、换车、换圈子 | … Tiêu thêm tiền để "nhích lên một nấc" xem … |
| mục 21 | mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | … Lúc tâm trạng suy sụp làm gì trước, xem … |
| mục 23 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …356 trước, đem thủ đoạn gây chết ra xa, xem … |
| mục 23 | phần 8, mục 15 | 身边人说出「谁也别想好过」「带着孩子一起走」，别当气话：近亲属可以直接送诊，公安接到报警也必须管 | …h lộ ra ý nghĩ này thì bạn làm được gì, xem … |
| mục 23 | phần 30, mục 8 | 12 到 18 岁的孩子做一次抑郁筛查，别拿学校的心理测评当诊断 | … Sàng lọc trầm cảm cho trẻ xem … |
| mục 23 | mục 15 | Coi những ý nghĩ kiểu "mọi việc chắc chắn sẽ tệ hơn" như triệu chứng, không coi là sự thật | … Nó giống kỳ vọng bi quan trong … |
| mục 24 | phần 22, mục 9 | 当场想缓过来，用 5 分钟「循环叹息」：吸气两段，呼气拉长 | … Cách dùng ngay tại chỗ xem … |
| mục 24 | phần 22, mục 7 | 心情差就去走或者跑，抗抑郁的效应量（效果大小）跟强度成正比 | …hạn, nó hiệu quả với tâm trạng suy sụp, xem … |
| mục 24 | phần 8, mục 43 | 被家暴了：先报警留下出警记录，再去法院申请人身安全保护令，不用先离婚，也不收费 | …ứ cần xử lý không phải cảm xúc của bạn, xem … |
| mục 24 | mục 18 | Lúc tức giận rời khỏi chỗ đó trước, coi đối phương như thời tiết chứ không phải kẻ thù | … dùng ngay tại chỗ xem  (thở dài vòng), còn … |
| mục 25 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … chịu thì dừng lại, đổi sang gọi 12356, xem … |

## 04-dung-lang-phi-thoi-gian

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 2 | mục 3 | Quyết định có tiếp tục không thì chỉ nhìn đầu tư tương lai và hồi báo tương lai, đừng nhìn đã đổ vào bao nhiêu | … đầu tư tương lai và hồi báo tương lai, xem … |
| mục 9 | mục 1 | Viết "định làm" thành "mấy giờ, ở đâu, gặp gì thì làm gì" | … Động tác cụ thể ở … |
| mục 9 | mục 7 | Chia việc lớn thành việc con rồi mới ước thời gian, mới bắt tay | …thành "mấy giờ, ở đâu, gặp gì thì làm gì"), … |
| mục 9 | mục 8 | Việc không có hạn chót bên ngoài thì tự đặt cho nó một ngày | …gì"), mục 7 (chia việc lớn thành việc con), … |
| mục 10 | phần 3, mục 1 | Tắt thông báo không cần thiết, lúc làm việc để điện thoại ngoài tầm nhìn | …goài tầm nhìn đã có người đo trực tiếp, xem … |
| mục 11 | phần 2, mục 3 | Cai thuốc đừng chỉ nhịn, trước hết lấy thuốc: tỷ lệ thành công tăng hơn gấp đôi | … Cai thuốc bản thân cai thế nào xem … |
| mục 12 | mục 1 | Viết "định làm" thành "mấy giờ, ở đâu, gặp gì thì làm gì" | …buộc động tác vào một bối cảnh cố định, xem … |
| mục 13 | phần 3, mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | …ạng sa sút hoặc lo âu rõ thì trước làm theo … |
| mục 13 | mục 10 | Để đồ cần dùng tới tay, xo đồ không muốn đụng ra xa, đừng trông vào nhịn ngay lúc đó | … Thứ kiểm soát kích thích đó ở … |
| mục 15 | phần 3, mục 21 | Đừng coi "người khác sống thế nào" là bài buộc đọc mỗi ngày: đặt giới hạn hoặc tắt hẳn app lướt động thái của người cùng tuổi | …lại bao nhiêu, tâm trạng đổi bao nhiêu, xem … |

## 05-dung-lang-phi-tien

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 8 | mục 9 | Con dùng điện thoại nạp tiền tặng quà, khoản lớn của trẻ từ tám tuổi không được cha mẹ thừa nhận có thể đòi trả | …5 Bộ luật dân sự đã được trích nguyên chữ ở … |
| mục 9 | mục 8 | Không tặng quà cho người phát sóng, không nạp tiền game, không đặt mua theo cảm xúc | …ính bạn tặng quà nạp tiền theo cảm xúc, xem … |
| mục 10 | phần 8, mục 2 | 发现被骗，立刻打 110 或 96110 要求止付，别先自己查 | …hỉ có thể báo cảnh sát chặn thanh toán theo … |
| mục 10 | phần 8, mục 3 | 记住反诈硬规则：来电不轻信、信息不透露、链接不点击、转账多核实，七种最常见的骗局都是这个形状 | …hiêu giả người quen, còn có AI đổi mặt, xem … |
| mục 10 | phần 8, mục 4 | 视频里看见脸、电话里听见声音都不算核实，涉及转账先挂断，用自己通讯录里的旧号码打回去 | …hiêu giả người quen, còn có AI đổi mặt, xem … |
| mục 10 | mục 9 | Con dùng điện thoại nạp tiền tặng quà, khoản lớn của trẻ từ tám tuổi không được cha mẹ thừa nhận có thể đòi trả | … Phải phân biệt rõ với … |
| mục 12 | phần 16, mục 3 | 复查按医生给的间隔做，把每次的指标记在同一个本子上 | …ổi thuốc xong đừng phán theo cảm giác, theo … |
| mục 14 | phần 9 | 09-普通人容易踩的法律红线 (cả phần) | … giả tạo, người đăng đã bị giữ hình sự (xem … |
| mục 16 | mục 7 | Không dùng trả tối thiểu thẻ tín dụng, không vì tiêu dùng mà mở trả góp hay vay tiêu dùng | … đòn bẩy biến tướng, lãi suất của chúng xem … |
| mục 19 | mục 17 | Dùng quỹ chỉ số gối rộng thay quỹ quản lý chủ động làm khoản dài hạn (phần tiền giữ yên dài hạn) | … Mua quỹ chỉ số gối rộng (xem … |
| mục 20 | mục 27 | Trước hết gom đủ 3 đến 6 tháng sinh hoạt phí làm quỹ dự phòng, để chỗ rút ra bất cứ lúc nào | …óa quỹ dự phòng vào trong (quỹ dự phòng xem … |
| mục 20 | mục 17 | Dùng quỹ chỉ số gối rộng thay quỹ quản lý chủ động làm khoản dài hạn (phần tiền giữ yên dài hạn) | … Luật chọn sản phẩm giống … |
| mục 20 | mục 18 | Cùng loại quỹ ưu tiên chọn phí thấp | … Luật chọn sản phẩm giống … |
| mục 20 | mục 2 | Mỗi năm từ tháng 3 đến tháng 6 làm một lần quyết toán thuế thu nhập cá nhân, khoản khấu trừ chuyên mục nào nên điền thì điền | … quyết toán năm sau mới trừ (quyết toán xem … |
| mục 22 | mục 21 | Phòng gym trả theo lần hoặc chu kỳ ngắn, trừ khi đã có hơn một năm đi đều | … Nên trước hết theo … |
| mục 27 | mục 7 | Không dùng trả tối thiểu thẻ tín dụng, không vì tiêu dùng mà mở trả góp hay vay tiêu dùng | …iêu dùng và trả tối thiểu thẻ tín dụng, xem … |
| mục 29 | mục 32 | Trước khi mua đồ lớn, tra thông báo kiểm nghiệm rút mẫu quốc gia, chứng nhận 3C và nhãn hiệu suất năng lượng | … được chỉ có kết quả rút kiểm tổng thể (xem … |
| mục 29 | mục 23 | Mua đồ đắt không cần thiết thì đặt thời gian suy nghĩ lại 24 giờ, mua mạng tận dụng trả hàng bảy ngày không cần lý do | … Trả hàng bảy ngày không cần lý do xem … |
| mục 31 | phần 8, mục 22 | 网购、二手交易被骗，先平台投诉，再报警，再算值不值得起诉 | …ỉ còn đường kiện, kiện nhỏ tính thế nào xem … |
| mục 31 | phần 12, mục 8 | 做食品先看自己落在哪一档：生产和做餐饮要许可，只卖预包装的改备案，卖生鲜肉菜不用证 | … Chi tiết xem … |
| mục 31 | phần 12, mục 9 | 装袋卖就是预包装食品：标签上生产日期、保质期、配料表一样都不能少 | … Chi tiết xem … |
| mục 31 | phần 12, mục 10 | 普通食品不许说能治病：标签、说明书、广告和直播话术都算 | … Chi tiết xem … |
| mục 31 | phần 12, mục 11 | 食品这一行有刑事线：卖病死肉、超标货就够罪，掺了有毒有害的不看金额、起刑五年 | … Chi tiết xem … |
| mục 31 | mục 29 | Mua hàng mạng tin quy tắc của sàn và điều luật, không tin người phát sóng và "đánh giá tốt" | … ba lần, dưới 500 nhân dân tệ tính 500, xem … |
| mục 34 | mục 32 | Trước khi mua đồ lớn, tra thông báo kiểm nghiệm rút mẫu quốc gia, chứng nhận 3C và nhãn hiệu suất năng lượng | … Cách tra chung lúc mua đồ lớn xem … |
| mục 34 | mục 29 | Mua hàng mạng tin quy tắc của sàn và điều luật, không tin người phát sóng và "đánh giá tốt" | … Livestream có chuyện nên tìm ai, xem … |
| mục 34 | mục 30 | Hàng mua trong livestream có vấn đề, trước hết xin sàn cung cấp thông tin người bán và người dẫn hàng, sàn bắt buộc phải đưa | … Livestream có chuyện nên tìm ai, xem … |
| mục 35 | phần 6, mục 23 | 不要指望买东西改善心情或身份感 | …òng lặp "mua về rồi phai, rồi mua tiếp" xem … |
| mục 35 | mục 9 | Con dùng điện thoại nạp tiền tặng quà, khoản lớn của trẻ từ tám tuổi không được cha mẹ thừa nhận có thể đòi trả | …ại nạp tiền tặng quà hoàn tiền thế nào, xem … |
| mục 35 | mục 23 | Mua đồ đắt không cần thiết thì đặt thời gian suy nghĩ lại 24 giờ, mua mạng tận dụng trả hàng bảy ngày không cần lý do | …lại 24 giờ cho mua đắt không cần thiết, xem … |
| mục 36 | phần 12, mục 9 | 装袋卖就是预包装食品：标签上生产日期、保质期、配料表一样都不能少 | …hực phẩm đóng gói sẵn phải ghi thế nào, xem … |
| mục 37 | mục 15 | Không mua bán cổ phiếu thường xuyên | … Mục này quản "bán hay không", … |
| mục 37 | mục 19 | Đừng dồn tiền vào một cổ phiếu, một sàn, một căn nhà | …bạn đặt vào con cổ phiếu này nhiều hơn, xem … |
| mục 38 | mục 15 | Không mua bán cổ phiếu thường xuyên | …t năm đổi gần 18 lần, tài khoản hộ Mỹ trong … |
| mục 39 | phần 21, mục 6 | 境外取现一年不能超过 10 万元人民币，是本人名下所有卡合起来算的 | …tiền mặt ở nước ngoài có hạn mức riêng, xem … |
| mục 39 | mục 17 | Dùng quỹ chỉ số gối rộng thay quỹ quản lý chủ động làm khoản dài hạn (phần tiền giữ yên dài hạn) | … Mua QDII cũng theo cách của … |
| mục 39 | mục 19 | Đừng dồn tiền vào một cổ phiếu, một sàn, một căn nhà | …eo cách của mục 17 (quỹ chỉ số gối rộng) và … |
| mục 40 | phần 7, mục 20 | 大病之前，基本医保之外配一份一年期医疗险或重疾险，看清「保证续保」四个字 | … Bảo hiểm y tế một năm xem … |
| mục 40 | phần 21, mục 4 | 买一份含境外医疗和医疗转运的保险，别只买航班延误险 | … Người ra nước ngoài xem … |
| mục 40 | mục 26 | Mua đủ bảo hiểm bên thứ ba: hạn mức bảo hiểm giao thông bắt buộc thống nhất cả nước và không cao, phần vượt do nhà bạn tự gánh | … Người có xe xem … |
| mục 40 | mục 41 | Nhà có người sống nhờ thu nhập của bạn, trước hết mua bảo hiểm nhân thọ định kỳ cho người kiếm tiền, đừng mua cho con trước | … Nhà có người sống nhờ thu nhập của bạn xem … |
| mục 40 | phần 7, mục 9 | 居民医保每年 400 元不要断，困难户可减免 | … theo cách này chọn lựa, vẫn phải đóng, xem … |
| mục 40 | mục 27 | Trước hết gom đủ 3 đến 6 tháng sinh hoạt phí làm quỹ dự phòng, để chỗ rút ra bất cứ lúc nào | … Tổn thất nhỏ dựa vào gì lo, xem … |
| mục 41 | phần 7, mục 20 | 大病之前，基本医保之外配一份一年期医疗险或重疾险，看清「保证续保」四个字 | …i thật và bảo đảm tiếp tục xem thế nào, xem … |
| mục 42 | mục 25 | Bảo hiểm ưu tiên mua loại tiêu dùng, coi phần "hoàn trả" "chia lãi" là không bảo đảm | …iều, thời gian cân nhắc đáng dùng nhất, xem … |
| mục 43 | mục 42 | Ký bảo hiểm nhân thân trên một năm mà hối hận, trong thời gian cân nhắc lại hủy đi, phí về gần như đủ | … Đã ký rồi thì trong 15 ngày theo … |
| mục 43 | mục 44 | Muốn hủy bảo hiểm thì tự tìm công ty bảo hiểm làm, đừng tìm "đại lý hủy bảo hiểm", thấy bị lừa thì gọi 12378 khiếu nại | … Thấy bị lừa khiếu nại thế nào, xem … |
| mục 44 | mục 42 | Ký bảo hiểm nhân thân trên một năm mà hối hận, trong thời gian cân nhắc lại hủy đi, phí về gần như đủ | … Tự hủy trong thời gian cân nhắc, xem … |
| mục 45 | phần 25, mục 9 | 分散在各处的钱要逐个去取：公积金余额、社保待遇、工伤待遇 | … đi rồi từng chỗ đi lĩnh tiền khắp nơi, xem … |
| mục 45 | phần 29, mục 13 | 别拿死当还债的办法：两年内的寿险不赔，工伤不认，债照样先从遗产里扣 | …n đường lấy chết trả nợ đi không thông, xem … |

## 18-nuoi-con-co-dang-khong

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 10 | 10-恋爱和结婚划不划算 (cả phần) | … Giống như … |
| Mở đầu phần | phần 27 | 27-怀孕和生产 (cả phần) | …ng thai và cần đi thủ tục từng bước thì xem … |
| mục 3 | phần 19 | 19-在职离职和工伤 (cả phần) | … Đòi bồi thường thế nào xem … |
| mục 3 | phần 19 | 19-在职离职和工伤 (cả phần) | …ổi việc trái luật, đường đòi bồi thường xem … |
| mục 4 | phần 10 | 10-恋爱和结婚划不划算 (cả phần) | … Cách tính giống cách tính việc nhà ở … |
| mục 6 | phần 10 | 10-恋爱和结婚划不划算 (cả phần) | … Cách xét giống … |
