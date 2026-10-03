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

Tổng cộng 765 trích dẫn.

## 01-dung-chet-som

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 4 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … Ngộ độc khí CO là chuyện khác, xem … |
| mục 16 | mục 18 | Phụ nữ trên 30 tuổi tầm soát ung thư cổ tử cung, ưu tiên xét nghiệm HPV | …cung, vaccine không thay được sàng lọc, xem … |
| mục 25 | mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … và kết cục dài hạn sau khi chưa thành, xem … |
| mục 25 | mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … Được cứu về sẽ để lại gì, xem … |
| mục 26 | phần 13, mục 12 | Chảy máu nhiều thì trước hết dùng tay ấn chặt vết thương, tay chân ấn không cầm được thì lên garô, đồng thời gọi 120 | … Cách dùng garô và số cấp cứu 120 xem … |
| mục 26 | mục 3 | Lắp máy báo khói; ai mùa đông đốt than hay dùng gas sưởi trong nhà thì lắp thêm máy báo khí CO | … Máy báo khói và máy báo khí CO xem … |
| mục 28 | mục 7 | Đo huyết áp, cao thì uống thuốc hạ về mức chuẩn | … Thứ cần khám giống hệt … |
| mục 28 | mục 8 | Sau 35 tuổi chỉ cần thừa cân thì đi xét nghiệm đường huyết lúc đói một lần, bình thường cũng cứ ba năm xét lại | … Thứ cần khám giống hệt … |
| mục 28 | mục 29 | Giảm cân, bỏ thuốc, giữ huyết áp và đường huyết ổn định, chức năng cương dương khá lên theo | … Cách cải thiện xem … |
| mục 28 | mục 27 | Nước tiểu có máu nhìn thấy bằng mắt thường, dù không đau, dù hôm sau đã sạch, cũng phải đi khám một lần | … loại tín hiệu như … |
| mục 29 | phần 2, mục 1 | Bỏ thuốc lá, càng sớm càng tốt | … bỏ thuốc xem … |
| mục 29 | phần 2, mục 33 | Giữ BMI trong khoảng 20–25, thừa cân thì giảm | …(bỏ thuốc, càng sớm càng tốt), giảm cân xem … |
| mục 29 | phần 28, mục 4 | Đừng mua thuốc giảm cân, cà phê giảm cân, kẹo gầy và mơ enzyme hứa "gầy nhanh" | …ày, liều lượng không rõ, cách nhận biết xem … |
| mục 29 | mục 7 | Đo huyết áp, cao thì uống thuốc hạ về mức chuẩn | … (giữ BMI trong khoảng 20–25), huyết áp xem … |
| mục 30 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … Đã phơi nhiễm rồi thì làm sao xem … |
| mục 31 | phần 27 | 27-mang-thai-va-sinh-con (cả phần) | …a bệnh trong thai kỳ và chặn lây mẹ-con xem … |
| mục 32 | phần 3, mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | …ng, phơi nắng, ngủ đúng giờ, gọi 12356) xem … |
| mục 32 | phần 8, mục 15 | Người thân nói "ai cũng đừng hòng sống yên" "dẫn con đi chung", đừng coi là lời giận: thân nhân gần có thể đưa thẳng đi khám, công an nhận báo cũng phải quản | … cạnh để lộ ý nghĩ này bạn làm được gì, xem … |
| mục 32 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … đoạn gây chết ra xa và đường dây 12356 xem … |
| mục 32 | mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … Di chứng sau khi được cứu xem … |
| mục 33 | phần 13, mục 19 | Máy báo khí CO kêu, hoặc cả nhà cùng đau đầu buồn nôn — đưa người ra ngoài trước rồi mới gọi điện | … Xử trí hiện trường khi ngộ độc khí CO xem … |
| mục 33 | phần 13, mục 20 | Uống nhầm chất tẩy rửa, thuốc trừ sâu, thuốc men: trước hết đừng gây nôn, mang theo chai đi viện ngay; bắn vào mắt hay da thì xả nhiều nước sạch 15 phút | … gây nôn trước, mang theo chai đi khám, xem … |
| mục 33 | mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …ông tích trữ thuốc trừ sâu và thuốc ngủ xem … |
| mục 34 | phần 17, mục 8 | Nhà có người nằm liệt lâu dài, coi loét do nằm lâu là kẻ thù số một: gắn nệm hơi điện, lật người đúng giờ, mỗi ngày nhìn một lượt chỗ xương lồi ra | …u mà thời gian nằm dài đáng để mắt nhất xem … |
| mục 34 | phần 13, mục 11 | Một chân đột nhiên sưng lên, căng, ấn đau — đi khám sớm; thêm đột nhiên không thở nổi hoặc đau ngực thì gọi ngay 120 | …t khối tĩnh mạch sâu và thuyên tắc phổi xem … |
| mục 34 | mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … Ý nghĩ nảy ra thì làm sao xem … |
| mục 34 | mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … Hậu quả ngộ độc xem … |
| mục 35 | phần 9, mục 22 | Đừng bán nội tạng của chính mình, cũng đừng giúp người tìm nguồn hiến: bán thận tay đến hơn 2 vạn, cùng quả đó bán lại 20 vạn; tiền bị tịch thu còn phạt gấp 10 đến 20 lần số giao dịch | …à trách nhiệm hình sự của hiến hợp pháp xem … |
| mục 35 | phần 16, mục 1 | Uống thuốc đủ theo chỉ định bác sĩ, đừng thấy đỡ là ngừng | …, quyết toán liên tỉnh và thuốc dài hạn xem … |
| mục 35 | phần 16, mục 2 | Đăng ký bệnh mạn tính đặc thù ngoại trú trước rồi đăng ký khám ngoại tỉnh, tăng huyết áp, tiểu đường, hóa trị xạ trị, lọc máu, chống đào thải được quyết toán trực tiếp ở tỉnh khác | …, quyết toán liên tỉnh và thuốc dài hạn xem … |
| mục 37 | phần 9, mục 13 | Mạt chược, bài được chơi, nhưng không hưởng khấu, không làm cái, không mở sới thu tiền, không chơi đánh bạc mạng | … Ranh giới pháp luật của đánh bạc xem … |
| mục 37 | phần 8, mục 44 | Người nhà đánh bạc mắc nợ, đừng vội trả thay: nợ bạc luật không bảo vệ, tiền vay để đánh bạc cũng không tính nợ chung vợ chồng | …nhà nợ nợ cờ bạc có nên trả thay không, xem … |
| mục 37 | mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … Ý nghĩ tự tử nảy ra sau đó làm sao, xem … |
| mục 38 | phần 13, mục 38 | Có thể đã phơi nhiễm HIV thì trong 72 giờ đi lấy thuốc dự phòng, càng sớm càng tốt | … Đã xảy ra hành vi nguy cơ, cách cứu xem … |
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
| mục 6 | phần 22, mục 4 | Đừng ăn kẹo và đồ ăn vặt người lạ đưa, đồ uống rời khỏi tầm mắt đừng uống, đừng nhận đầu hút người khác đưa | …abinoid tổng hợp chảy ra theo đường đó, xem … |
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
| mục 33 | phần 6, mục 26 | Đừng trông ăn sáng hay nhịn ăn kiểu 16:8 giúp kiểm soát cân nặng, giờ ăn chọn kiểu bạn giữ được lâu dài | …8 đều không có lợi thêm, xem … |
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
| mục 18 | phần 8 | 08-dung-tu-chuoc-hoa-vao-than (cả phần) | …hật sự có tổn thất thì đi đường pháp lý của … |
| mục 18 | phần 9 | 09-lan-san-do-phap-luat-de-vi-pham (cả phần) | …tổn thất thì đi đường pháp lý của phần 8 và … |
| mục 19 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …ĩ tự sát phải đi khám, gọi 12356 trước (xem … |
| mục 20 | phần 8, mục 39 | Báo án phải đòi ngay biên nhận thụ lý; không lập án phải có thông báo văn bản: trong 7 ngày xin xem xét lại, lại 7 ngày xin phúc xét, viện kiểm sát có thể báo công an lập án | …ày trích đến từ hai quy chương Bộ Công an ở … |
| mục 20 | phần 24, mục 8 | Thương bệnh nặng đi thẳng tới bàn phân loại cấp cứu, đừng xếp hàng cửa đăng ký | …ức theo bệnh tình, không theo ai đến trước (… |
| mục 20 | phần 24, mục 12 | Cảm ơn bác sĩ đã cứu bạn thì đi đường thư cảm ơn, cờ biển và đánh giá mức hài lòng, đừng đi phong bì: quy tắc cấm là tiền của, không phải lòng biết ơn | … đường thư cảm ơn và đánh giá hài lòng, xem … |
| mục 20 | phần 8, mục 40 | Đừng đưa tiền đưa thẻ cho người làm án, chấp pháp: hối lộ chính mình cũng bị phán; hối lộ người giám sát, chấp pháp, tư pháp còn bị phạt nặng | …ối lộ, và là tội văn bản ghi tăng nặng, xem … |
| mục 21 | phần 4, mục 15 | Đặt giới hạn cứng cho video ngắn và lướt màn hình không mục đích | … Sổ thời gian màn hình tổng xem … |
| mục 21 | phần 4, mục 16 | Không xem TV và tin cuộn, thông tin cần thiết xem tập trung theo giờ cố định | … Sổ thời gian màn hình tổng xem … |
| mục 21 | phần 6, mục 23 | Đừng trông mua sắm cải thiện tâm trạng hay cảm giác thân phận | …a vào mua sắm lấy lại cảm giác căn tính xem … |
| mục 21 | phần 6, mục 24 | Đừng vì "nhích lên một bậc trong đám người quanh" mà tiêu thêm tiền đổi nhà, đổi xe, đổi giới | … Tiêu thêm tiền để "nhích lên một nấc" xem … |
| mục 21 | mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | … Lúc tâm trạng suy sụp làm gì trước, xem … |
| mục 23 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …356 trước, đem thủ đoạn gây chết ra xa, xem … |
| mục 23 | phần 8, mục 15 | Người thân nói "ai cũng đừng hòng sống yên" "dẫn con đi chung", đừng coi là lời giận: thân nhân gần có thể đưa thẳng đi khám, công an nhận báo cũng phải quản | …h lộ ra ý nghĩ này thì bạn làm được gì, xem … |
| mục 23 | phần 30, mục 8 | Con 12 tới 18 tuổi làm một lần sàng lọc trầm cảm, đừng cầm bài đo tâm lý của trường làm chẩn đoán | … Sàng lọc trầm cảm cho trẻ xem … |
| mục 23 | mục 15 | Coi những ý nghĩ kiểu "mọi việc chắc chắn sẽ tệ hơn" như triệu chứng, không coi là sự thật | … Nó giống kỳ vọng bi quan trong … |
| mục 24 | phần 22, mục 9 | Muốn dịu lại ngay tại chỗ, dùng 5 phút "thở dài vòng": hít hai đoạn, thở kéo dài | … Cách dùng ngay tại chỗ xem … |
| mục 24 | phần 22, mục 7 | Tâm trạng kém thì đi bộ hoặc chạy, hiệu ứng chống trầm cảm (độ lớn hiệu ứng) tỷ lệ thuận với cường độ | …hạn, nó hiệu quả với tâm trạng suy sụp, xem … |
| mục 24 | phần 8, mục 43 | Bị bạo hành gia đình: báo cảnh sát trước để lưu hồ sơ xuất cảnh, rồi ra tòa xin lệnh bảo vệ an toàn thân thể; không cần ly hôn trước, cũng không thu phí | …ứ cần xử lý không phải cảm xúc của bạn, xem … |
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
| mục 10 | phần 8, mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | …hỉ có thể báo cảnh sát chặn thanh toán theo … |
| mục 10 | phần 8, mục 3 | Nhớ quy tắc cứng chống lừa: cuộc gọi không tin vội, thông tin không tiết lộ, link không bấm, chuyển tiền kiểm nhiều lần; bảy loại lừa đảo thường gặp nhất đều cùng một khuôn | …hiêu giả người quen, còn có AI đổi mặt, xem … |
| mục 10 | phần 8, mục 4 | Thấy mặt trong video, nghe giọng qua điện thoại đều chưa tính là kiểm chứng; liên quan chuyển tiền thì cúp trước, gọi lại bằng số cũ trong danh bạ của mình | …hiêu giả người quen, còn có AI đổi mặt, xem … |
| mục 10 | mục 9 | Con dùng điện thoại nạp tiền tặng quà, khoản lớn của trẻ từ tám tuổi không được cha mẹ thừa nhận có thể đòi trả | … Phải phân biệt rõ với … |
| mục 12 | phần 16, mục 3 | Tái khám theo đúng khoảng cách bác sĩ cho, ghi chỉ số mỗi lần vào cùng một quyển sổ | …ổi thuốc xong đừng phán theo cảm giác, theo … |
| mục 14 | phần 9 | 09-lan-san-do-phap-luat-de-vi-pham (cả phần) | … giả tạo, người đăng đã bị giữ hình sự (xem … |
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
| mục 31 | phần 8, mục 22 | Mua hàng mạng, giao dịch đồ cũ bị lừa: khiếu nại nền tảng trước, báo cảnh sát sau, rồi tính xem có đáng kiện không | …ỉ còn đường kiện, kiện nhỏ tính thế nào xem … |
| mục 31 | phần 12, mục 8 | Làm thực phẩm trước hết xem mình rơi vào nhóm nào: sản xuất và làm ăn uống phải xin phép, chỉ bán đồ đóng gói sẵn đổi sang khai báo, bán thịt rau tươi không cần giấy | … Chi tiết xem … |
| mục 31 | phần 12, mục 9 | Cho vào bao bán là thực phẩm đóng gói sẵn: trên nhãn, ngày sản xuất, hạn dùng, bảng thành phần thiếu một thứ cũng không được | … Chi tiết xem … |
| mục 31 | phần 12, mục 10 | Thực phẩm thường không được nói là chữa được bệnh: nhãn, tờ hướng dẫn, quảng cáo và lời nói trên livestream đều tính | … Chi tiết xem … |
| mục 31 | phần 12, mục 11 | Nghề thực phẩm có vạch hình sự: bán thịt chết bệnh, hàng vượt chuẩn đã đủ tội; trộn chất độc hại thì không nhìn số tiền, khung khởi đầu đã là dưới 5 năm tù | … Chi tiết xem … |
| mục 31 | mục 29 | Mua hàng mạng tin quy tắc của sàn và điều luật, không tin người phát sóng và "đánh giá tốt" | … ba lần, dưới 500 nhân dân tệ tính 500, xem … |
| mục 34 | mục 32 | Trước khi mua đồ lớn, tra thông báo kiểm nghiệm rút mẫu quốc gia, chứng nhận 3C và nhãn hiệu suất năng lượng | … Cách tra chung lúc mua đồ lớn xem … |
| mục 34 | mục 29 | Mua hàng mạng tin quy tắc của sàn và điều luật, không tin người phát sóng và "đánh giá tốt" | … Livestream có chuyện nên tìm ai, xem … |
| mục 34 | mục 30 | Hàng mua trong livestream có vấn đề, trước hết xin sàn cung cấp thông tin người bán và người dẫn hàng, sàn bắt buộc phải đưa | … Livestream có chuyện nên tìm ai, xem … |
| mục 35 | phần 6, mục 23 | Đừng trông mua sắm cải thiện tâm trạng hay cảm giác thân phận | …òng lặp "mua về rồi phai, rồi mua tiếp" xem … |
| mục 35 | mục 9 | Con dùng điện thoại nạp tiền tặng quà, khoản lớn của trẻ từ tám tuổi không được cha mẹ thừa nhận có thể đòi trả | …ại nạp tiền tặng quà hoàn tiền thế nào, xem … |
| mục 35 | mục 23 | Mua đồ đắt không cần thiết thì đặt thời gian suy nghĩ lại 24 giờ, mua mạng tận dụng trả hàng bảy ngày không cần lý do | …lại 24 giờ cho mua đắt không cần thiết, xem … |
| mục 36 | phần 12, mục 9 | Cho vào bao bán là thực phẩm đóng gói sẵn: trên nhãn, ngày sản xuất, hạn dùng, bảng thành phần thiếu một thứ cũng không được | …hực phẩm đóng gói sẵn phải ghi thế nào, xem … |
| mục 37 | mục 15 | Không mua bán cổ phiếu thường xuyên | … Mục này quản "bán hay không", … |
| mục 37 | mục 19 | Đừng dồn tiền vào một cổ phiếu, một sàn, một căn nhà | …bạn đặt vào con cổ phiếu này nhiều hơn, xem … |
| mục 38 | mục 15 | Không mua bán cổ phiếu thường xuyên | …t năm đổi gần 18 lần, tài khoản hộ Mỹ trong … |
| mục 39 | phần 21, mục 6 | Rút tiền mặt ở nước ngoài một năm không quá 10 vạn tệ, tính gộp tất cả thẻ đứng tên mình | …tiền mặt ở nước ngoài có hạn mức riêng, xem … |
| mục 39 | mục 17 | Dùng quỹ chỉ số gối rộng thay quỹ quản lý chủ động làm khoản dài hạn (phần tiền giữ yên dài hạn) | … Mua QDII cũng theo cách của … |
| mục 39 | mục 19 | Đừng dồn tiền vào một cổ phiếu, một sàn, một căn nhà | …eo cách của mục 17 (quỹ chỉ số gối rộng) và … |
| mục 40 | phần 7, mục 20 | Trước khi bệnh nặng, ngoài bảo hiểm y tế cơ bản hãy mua thêm một gói bảo hiểm y tế một năm hoặc bảo hiểm bệnh hiểm nghèo, nhìn rõ bốn chữ "bảo đảm tái bảo hiểm" | … Bảo hiểm y tế một năm xem … |
| mục 40 | phần 21, mục 4 | Mua một phần bảo hiểm có y tế nước ngoài và chuyển viện y tế, đừng chỉ mua bảo hiểm trễ chuyến bay | … Người ra nước ngoài xem … |
| mục 40 | mục 26 | Mua đủ bảo hiểm bên thứ ba: hạn mức bảo hiểm giao thông bắt buộc thống nhất cả nước và không cao, phần vượt do nhà bạn tự gánh | … Người có xe xem … |
| mục 40 | mục 41 | Nhà có người sống nhờ thu nhập của bạn, trước hết mua bảo hiểm nhân thọ định kỳ cho người kiếm tiền, đừng mua cho con trước | … Nhà có người sống nhờ thu nhập của bạn xem … |
| mục 40 | phần 7, mục 9 | Bảo hiểm y tế cư dân 400 nhân dân tệ mỗi năm đừng để đứt, hộ khó khăn được miễn giảm | … theo cách này chọn lựa, vẫn phải đóng, xem … |
| mục 40 | mục 27 | Trước hết gom đủ 3 đến 6 tháng sinh hoạt phí làm quỹ dự phòng, để chỗ rút ra bất cứ lúc nào | … Tổn thất nhỏ dựa vào gì lo, xem … |
| mục 41 | phần 7, mục 20 | Trước khi bệnh nặng, ngoài bảo hiểm y tế cơ bản hãy mua thêm một gói bảo hiểm y tế một năm hoặc bảo hiểm bệnh hiểm nghèo, nhìn rõ bốn chữ "bảo đảm tái bảo hiểm" | …i thật và bảo đảm tiếp tục xem thế nào, xem … |
| mục 42 | mục 25 | Bảo hiểm ưu tiên mua loại tiêu dùng, coi phần "hoàn trả" "chia lãi" là không bảo đảm | …iều, thời gian cân nhắc đáng dùng nhất, xem … |
| mục 43 | mục 42 | Ký bảo hiểm nhân thân trên một năm mà hối hận, trong thời gian cân nhắc lại hủy đi, phí về gần như đủ | … Đã ký rồi thì trong 15 ngày theo … |
| mục 43 | mục 44 | Muốn hủy bảo hiểm thì tự tìm công ty bảo hiểm làm, đừng tìm "đại lý hủy bảo hiểm", thấy bị lừa thì gọi 12378 khiếu nại | … Thấy bị lừa khiếu nại thế nào, xem … |
| mục 44 | mục 42 | Ký bảo hiểm nhân thân trên một năm mà hối hận, trong thời gian cân nhắc lại hủy đi, phí về gần như đủ | … Tự hủy trong thời gian cân nhắc, xem … |
| mục 45 | phần 25, mục 9 | Tiền nằm rải khắp nơi phải từng chỗ đi lĩnh: dư công tích kim, chế độ bảo hiểm xã hội, chế độ tai nạn lao động | … đi rồi từng chỗ đi lĩnh tiền khắp nơi, xem … |
| mục 45 | phần 29, mục 13 | Đừng lấy cái chết làm cách trả nợ: bảo hiểm sinh thọ trong hai năm không bồi, tai nạn lao động không nhận, nợ vẫn trừ từ di sản trước | …n đường lấy chết trả nợ đi không thông, xem … |

## 06-danh-sach-nen-tranh

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 5 | phần 2 | 02-dung-chet-tu-tu (cả phần) | …ho viêm khớp gối là giảm cân và tập cơ, xem … |
| mục 7 | phần 1 | 01-dung-chet-som (cả phần) | …CT lồng ngực liều thấp, là chuyện khác, xem … |
| mục 8 | phần 2 | 02-dung-chet-tu-tu (cả phần) | … Bản thân vận động có hiệu quả, xem … |
| mục 10 | mục 1 | Đừng uống vitamin tổng hợp để sống lâu hay phòng bệnh tim mạch | … … |
| mục 10 | mục 2 | Đừng uống dầu cá thường để phòng bệnh tim mạch | … … |
| mục 10 | mục 3 | Đừng bổ sung vitamin D cho người không thiếu để sống lâu | … … |
| mục 10 | mục 4 | Đừng uống viên chống oxy hóa để phòng ung thư (beta carotene, vitamin E, vitamin A) | … … |
| mục 10 | mục 5 | Đừng trông glucosamine (đường amin đạm) / chondroitin chữa viêm khớp gối | … … |
| mục 10 | mục 6 | Đừng trông vitamin C phòng cảm | … … |
| mục 10 | phần 1, mục 20 | Người có bệnh tim mạch và người già tiêm vaccine cúm mỗi năm | … người già đi tiêm vaccine cúm mỗi năm, xem … |
| mục 10 | phần 1, mục 21 | Sau 50 tuổi tiêm vaccine zona thần kinh (giời leo) | … Vaccine zona thần kinh sau 50 tuổi xem … |
| mục 10 | phần 1, mục 22 | Trên 65 tuổi tiêm vaccine phế cầu | … Vaccine phế cầu trên 65 tuổi xem … |
| mục 10 | phần 1, mục 7 | Đo huyết áp, cao thì uống thuốc hạ về mức chuẩn | …heo chỉ định, hạ huyết áp về đạt chuẩn, xem … |
| mục 10 | phần 1, mục 13 | Trên 60 tuổi tập thăng bằng và sức mạnh chân, cải tạo phòng tắm và cầu thang trong nhà | …p thăng bằng và sức mạnh chân cùng ông, xem … |
| mục 10 | phần 1, mục 17 | Phụ nữ từ 40 tuổi tầm soát ung thư vú, cứ hai năm chụp nhũ ảnh một lần | …g thư đến tuổi, đưa ông đi làm một lần, xem … |
| mục 10 | phần 1, mục 18 | Phụ nữ trên 30 tuổi tầm soát ung thư cổ tử cung, ưu tiên xét nghiệm HPV | …g thư đến tuổi, đưa ông đi làm một lần, xem … |
| mục 10 | phần 1, mục 19 | Từ 45 đến 50 tuổi bắt đầu tầm soát ung thư đại trực tràng, làm xét nghiệm miễn dịch hóa phân tìm máu ẩn hoặc nội soi đại tràng | …g thư đến tuổi, đưa ông đi làm một lần, xem … |
| mục 10 | phần 17, mục 7 | Người già trong nhà nằm liệt lâu dài hoặc mất khả năng mức nặng, đến cơ quan bảo hiểm y tế nơi tham gia bảo hiểm xin bảo hiểm chăm sóc dài hạn; nó không phải chỉ phát cho người già | …oét do nằm và bảo hiểm chăm sóc dài hạn xem … |
| mục 10 | phần 17, mục 8 | Nhà có người nằm liệt lâu dài, coi loét do nằm lâu là kẻ thù số một: gắn nệm hơi điện, lật người đúng giờ, mỗi ngày nhìn một lượt chỗ xương lồi ra | …oét do nằm và bảo hiểm chăm sóc dài hạn xem … |
| mục 10 | phần 17, mục 5 | Đừng đụng các kiểu "đầu tư hưu trí" bắt người già nộp tiền trước: làm thẻ, mua giường, mua căn hộ dưỡng lão, dưỡng lão lưu trú, mua sản phẩm cho người già đều là cùng một kiểu huy động vốn trái phép | …ột loại là sẽ thay thế thuốc đang uống, xem … |
| mục 16 | phần 19, mục 11 | Tổn thương do bụi, tiếng ồn, chất độc hóa học không lấy lại được: đồ bảo hộ đơn vị phải cấp, ca không có biện pháp phòng hộ có thể từ chối | …, không phải tròng chống ánh sáng xanh, xem … |
| mục 16 | phần 13, mục 6 | Một mắt vừa căng vừa đau, đỏ, nhìn đèn có một vòng cầu vồng, còn đau đầu buồn nôn muốn ói — trong ngày đi cấp cứu mắt | … giác, ngay hôm đó phải đi cấp cứu mắt, xem … |
| mục 16 | phần 30, mục 4 | Cho con mỗi ngày ở ngoài trời đủ 2 tiếng, đây là cách phòng cận thị hiện có thử nghiệm rút quẻ đỡ duy nhất | …rẻ em thiếu niên phòng cận thị thế nào, xem … |
| mục 16 | phần 30, mục 12 | Tra ra thị lực kém, đi bệnh viện làm khám khúc xạ có giãn đồng, sau đó tái khám theo khoảng bác sĩ cho | …rẻ em thiếu niên phòng cận thị thế nào, xem … |
| mục 16 | phần 30, mục 9 | Không mua sản phẩm và dịch vụ tự xưng "chữa khỏi cận thị" "giảm độ" | …rẻ em thiếu niên phòng cận thị thế nào, xem … |
| mục 18 | phần 1, mục 7 | Đo huyết áp, cao thì uống thuốc hạ về mức chuẩn | … Huyết áp, đường huyết, viêm gan B xem … |
| mục 18 | phần 1, mục 8 | Sau 35 tuổi chỉ cần thừa cân thì đi xét nghiệm đường huyết lúc đói một lần, bình thường cũng cứ ba năm xét lại | … Huyết áp, đường huyết, viêm gan B xem … |
| mục 18 | phần 1, mục 14 | Xét nghiệm năm chỉ số viêm gan B, không có kháng thể thì đi tiêm vaccine | … Huyết áp, đường huyết, viêm gan B xem … |
| mục 18 | phần 1, mục 17 | Phụ nữ từ 40 tuổi tầm soát ung thư vú, cứ hai năm chụp nhũ ảnh một lần | … Vú, cổ tử cung, đại trực tràng xem … |
| mục 18 | phần 1, mục 18 | Phụ nữ trên 30 tuổi tầm soát ung thư cổ tử cung, ưu tiên xét nghiệm HPV | … Vú, cổ tử cung, đại trực tràng xem … |
| mục 18 | phần 1, mục 19 | Từ 45 đến 50 tuổi bắt đầu tầm soát ung thư đại trực tràng, làm xét nghiệm miễn dịch hóa phân tìm máu ẩn hoặc nội soi đại tràng | … Vú, cổ tử cung, đại trực tràng xem … |
| mục 18 | phần 1, mục 23 | Xét nghiệm vi khuẩn Helicobacter pylori, dương tính thì điều trị tiệt trừ | …uẩn Helicobacter pylori và CT liều thấp xem … |
| mục 18 | phần 1, mục 24 | Người hút thuốc nặng mỗi năm chụp CT lồng ngực liều thấp một lần | …uẩn Helicobacter pylori và CT liều thấp xem … |
| mục 18 | phần 1, mục 31 | Đã có hành vi nguy cơ thì đi xét nghiệm HIV một lần, trung tâm kiểm soát bệnh tật xét miễn phí, kết quả được bảo mật | …Từng có hành vi nguy cơ cao thì đi xét, xem … |
| mục 18 | mục 7 | Đừng tự làm "PET-CT toàn thân" hay "gói dấu ấn ung thư" khi không có triệu chứng | …à dấu ấn ung thư và chụp ảnh toàn thân, xem … |
| mục 18 | mục 19 | Đừng vì khám thấy acid uric cao nhưng chưa từng đau mà bắt đầu uống thuốc hạ acid uric | …i túi mật mà chưa từng đau thì làm sao, xem … |
| mục 18 | mục 20 | Đừng vì khám thấy sỏi túi mật nhưng chưa từng đau mà đi cắt túi mật dự phòng | …mục 19 (acid uric cao không triệu chứng) và … |
| mục 19 | phần 16, mục 9 | Chẩn đoán gút thì uống thuốc hạ acid uric dài hạn, ép acid uric máu xuống dưới 360 µmol/L và giữ luôn | … Chi tiết xem … |
| mục 19 | phần 16, mục 9 | Chẩn đoán gút thì uống thuốc hạ acid uric dài hạn, ép acid uric máu xuống dưới 360 µmol/L và giữ luôn | … bị uống thì trước đi xét kiểu gen này, xem … |
| mục 21 | phần 16, mục 8 | Từng mọc sỏi thận thì uống nước đến 2,5–3 lít mỗi ngày, muối hạ xuống dưới 6 gam | … Mục uống nhiều nước xem … |
| mục 22 | phần 5, mục 33 | Chuỗi hạt, ngọc thạch, đồng hồ hiệu, đồ chơi thời thượng tính theo "tiền tiêu đi", không tính theo "tiền cất lại" | …ào, coi nó là đầu tư vì sao không đáng, xem … |
| mục 22 | phần 5, mục 34 | Ngọc đá trang sức chỉ nhận báo cáo kiểm định có dấu CMA, rồi lên trang chính thức cơ quan cấp kiểm lại cơ quan đó | …ạt, đồng hồ hiệu tính theo tiền tiêu đi) và … |
| mục 22 | mục 15 | Đừng tiêu tiền xem bói, bài tarot, cung hoàng đạo để quyết định việc | … Tiêu tiền xem bói xem … |
| mục 23 | phần 5 | 05-dung-lang-phi-tien (cả phần) | … Động tác tiết kiệm cụ thể xem … |
| mục 23 | phần 22 | 22-thu-gian-the-nao (cả phần) | …chứng cứ thật lúc tâm trạng xấu xem nửa sau … |
| mục 23 | phần 29 | 29-sau-khi-gap-cu-soc-lon (cả phần) | …ật lúc tâm trạng xấu xem nửa sau phần 22 và … |
| mục 23 | mục 24 | Đừng vì "nhích lên một bậc trong đám người quanh" mà tiêu thêm tiền đổi nhà, đổi xe, đổi giới | … thêm vì "muốn hơn người khác một bậc", xem … |
| mục 24 | phần 4, mục 18 | Chọn chỗ ở thì đặt thời gian đi làm lên trước, rút ngắn đường đi làm một chiều | … Chỗ ở nên xếp theo gì xem … |
| mục 24 | phần 3, mục 21 | Đừng coi "người khác sống thế nào" là bài buộc đọc mỗi ngày: đặt giới hạn hoặc tắt hẳn app lướt động thái của người cùng tuổi | … Trên mạng cứ so lên trên xem … |
| mục 24 | mục 23 | Đừng trông mua sắm cải thiện tâm trạng hay cảm giác thân phận | … Mức lợi ích định "vừa", là theo quy mô của … |
| mục 24 | mục 23 | Đừng trông mua sắm cải thiện tâm trạng hay cảm giác thân phận | … Mua sắm điều tiết cảm xúc xem … |
| mục 25 | phần 4, mục 10 | Để đồ cần dùng tới tay, xo đồ không muốn đụng ra xa, đừng trông vào nhịn ngay lúc đó | …hật là đổi môi trường và đổi cách viết, xem … |
| mục 25 | phần 4, mục 1 | Viết "định làm" thành "mấy giờ, ở đâu, gặp gì thì làm gì" | … 4, mục 10 (xo đồ không muốn đụng ra xa) và … |
| mục 25 | phần 3 | 03-dung-lang-phi-suc-luc (cả phần) | …khác, xử theo mấy mục giấc ngủ và giờ làm ở … |
| mục 26 | phần 1, mục 23 | Xét nghiệm vi khuẩn Helicobacter pylori, dương tính thì điều trị tiệt trừ | …à uống thuốc giảm đau dài ngày, cần xét xem … |
| mục 26 | phần 2, mục 28 | Mỗi ngày ăn đủ 5 phần (khoảng 400 g) rau củ quả | …chứng cứ thật là ăn gì và ăn bao nhiêu, xem … |
| mục 26 | phần 2, mục 29 | Ăn ít thực phẩm siêu chế biến (khoai tây chiên lát, mì gói, bánh ngọt, đồ ăn liền) | … mục 28 (mỗi ngày ăn đủ 5 phần rau củ quả), … |
| mục 26 | phần 2, mục 33 | Giữ BMI trong khoảng 20–25, thừa cân thì giảm | …, mục 29 (ăn ít thực phẩm siêu chế biến) và … |
| mục 26 | phần 28, mục 1 | Đừng dùng kiêng cữ cực đoan, nhịn ăn hoặc gây nôn để kiểm soát cân, muốn giảm thì giảm từ phía vận động | … ăn cực đoan và gây nôn là chuyện khác, xem … |
| mục 26 | mục 20 | Đừng vì khám thấy sỏi túi mật nhưng chưa từng đau mà đi cắt túi mật dự phòng | …i túi mật mà chưa từng đau thì làm sao, xem … |
| mục 27 | phần 3, mục 9 | Đến giờ thì ngủ, đừng thức khuya vì game, video ngắn, nội dung khiêu dâm | … Thức khuya xem … |
| mục 27 | phần 1, mục 28 | Chức năng cương dương có vấn đề, trước hết đi khám tim mạch, đừng xem nó chỉ là "chuyện ấy" | …m khiêu dâm xem ra vấn đề cương, trước theo … |
| mục 27 | phần 9, mục 4 | Video khiêu dâm tự xem thì phần mình; đừng phát vào nhóm, đừng bán "tài nguyên", đừng lập nhóm | … luật của phát vào nhóm, bán tài nguyên xem … |
| mục 28 | phần 30, mục 15 | Con nói mình thích cùng giới, đừng mắng, đừng đuổi ra khỏi nhà, đừng gửi đi "chỉnh chuyển": thái độ trong nhà quan hệ nó tự tử hay không | … Sau khi con nói ra nhà làm sao, xem … |

## 07-song-khi-khong-co-tien

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 7 | mục 9 | Bảo hiểm y tế cư dân 400 nhân dân tệ mỗi năm đừng để đứt, hộ khó khăn được miễn giảm | …cư dân có trợ cấp (bảo hiểm y tế cư dân xem … |
| mục 7 | mục 10 | Mắc bệnh nặng thì trước hết đi theo bảo hiểm y tế, bảo hiểm bệnh nặng, cứu trợ y tế và đăng ký khám tỉnh khác, không đụng vào vay online | …khám đi được cứu trợ y tế (cứu trợ y tế xem … |
| mục 7 | mục 3 | Không đủ tiền kiện thì xin viện trợ pháp lý, vụ đòi lương, tiền phụng dưỡng, tai nạn lao động vốn nằm trong phạm vi | … xét khó khăn kinh tế (viện trợ pháp lý xem … |
| mục 10 | phần 24, mục 9 | Không mang tiền, không mang giấy tờ, nói không rõ mình là ai, cấp cứu cũng phải cứu trước | …ạn đó do quỹ cứu trợ khẩn cấp bệnh trả, xem … |
| mục 10 | mục 15 | Không nộp tiền cọc, không giao giấy tờ, không ký "vay học nghề", không vào đa cấp, không vay nặng lãi | …h 4 lần LPR một năm (không vay nặng lãi xem … |
| mục 18 | mục 9 | Bảo hiểm y tế cư dân 400 nhân dân tệ mỗi năm đừng để đứt, hộ khó khăn được miễn giảm | …ám không được báo (bảo hiểm y tế cư dân xem … |
| mục 20 | phần 5, mục 40 | Chỉ mua bảo hiểm cho tổn thất mình gánh không nổi, tổn thất gánh được để quỹ dự phòng lo | … Thiệt hại nào đáng dùng bảo hiểm đỡ, xem … |
| mục 20 | mục 9 | Bảo hiểm y tế cư dân 400 nhân dân tệ mỗi năm đừng để đứt, hộ khó khăn được miễn giảm | … Trước hết đóng bảo hiểm y tế cư dân (… |
| mục 21 | mục 4 | Không còn đường lui thì đến trạm cứu trợ, có lo ăn ở và vé xe về quê | … Trạm cứu trợ ở … |

## 08-dung-tu-chuoc-hoa-vao-than

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 3 | mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | … cách chặn chi xem … |
| mục 4 | phần 14 | 14-tai-khoan-va-an-toan-thong-tin (cả phần) | …hông cho người ta thu mặt và giọng mình xem … |
| mục 4 | mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | … Đã lỡ chuyển tiền thì xem … |
| mục 5 | mục 33 | Bị người bịa đặt tình tiết tố cáo, có thể yêu cầu truy cứu: đủ phạt trị an thì tạm giữ từ 5 ngày, đủ tội thì tù dưới 3 năm | … Ba mục mở rộng xem … |
| mục 5 | mục 34 | Chứng cứ không đủ vốn phải phán vô tội, khẩu cung ép ra phải loại; phán rồi còn có khiếu nại và xét xử lại | … phần này (truy cứu bên bịa đặt tình tiết), … |
| mục 5 | mục 35 | Bị giam giữ rồi hủy vụ, không truy tố hoặc phán vô tội, đi xin bồi thường nhà nước, tính tiền theo ngày | …phải tuyên vô tội và khiếu nại xét xử lại), … |
| mục 6 | mục 1 | Có tai nạn giao thông thì trước hết dừng xe, cứu người, báo cảnh sát, đừng chạy | … làm thế nào xem … |
| mục 6 | mục 5 | Bị buộc tội hoặc bị triệu hồi, trước hết mời luật sư, không dàn xếp riêng, không xóa hồ sơ | … sư trước và khai thật không mâu thuẫn, xem … |
| mục 11 | phần 13, mục 37 | Bắt gặp một đám đánh nhau: lùi ra đi, đừng lên can, đừng đứng xem, đừng nhặt hung khí dưới đất; muốn báo thì lùi tới khoảng an toàn gọi 110 | … giữa người lạ, rủi ro phải tính riêng, xem … |
| mục 11 | mục 10 | Có xung đột thì báo cảnh sát trước, không ra tay; kẻ ra tay trước gần như chắc chắn thiệt | …tác mặc định vẫn là lùi ra báo cảnh sát như … |
| mục 11 | mục 5 | Bị buộc tội hoặc bị triệu hồi, trước hết mời luật sư, không dàn xếp riêng, không xóa hồ sơ | …t chính thức hỏi thì mời luật sư trước, xem … |
| mục 11 | mục 35 | Bị giam giữ rồi hủy vụ, không truy tố hoặc phán vô tội, đi xin bồi thường nhà nước, tính tiền theo ngày | … thể xin bồi thường nhà nước theo ngày, xem … |
| mục 12 | phần 7, mục 2 | Bị nợ lương thì trước hết khiếu nại thanh tra lao động, rồi xin trọng tài lao động, hai đường đều không thu phí, đa số vụ có kết quả trong vài tháng | …hế nào, xin trọng tài lao động thế nào, xem … |
| mục 12 | phần 7, mục 2 | Bị nợ lương thì trước hết khiếu nại thanh tra lao động, rồi xin trọng tài lao động, hai đường đều không thu phí, đa số vụ có kết quả trong vài tháng | …ể khiếu nại thế nào, trọng tài thế nào, xem … |
| mục 12 | phần 9, mục 15 | Đòi nợ không giữ người, không nhốt người, không theo tận nhà ở lì không cho đi | … Vạch đỏ đòi nợ xem … |
| mục 13 | mục 14 | Nảy ra ý "kéo kẻ nện chung" "cùng chết", xử như cấp cứu: rời khỏi hiện trường, giao chìa khóa xe và dao cho người khác, gọi 12356 (đường dây tâm lý TQ) | … Ý nghĩ đã đi tới bước này thì xem … |
| mục 14 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … Muốn tự làm tổn thương mình, xem … |
| mục 14 | phần 3, mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | …Lúc tinh thần suy sụp trước hết làm gì, xem … |
| mục 16 | mục 37 | Bị bạo lực mạng: mở bảo vệ trước, giữ chứng trước, rồi chọn một trong ba đường nền tảng, lệnh cấm, báo cảnh sát | … Bị bạo lực mạng rồi xử thế nào, xem … |
| mục 18 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | …ho vay thị trường TQ) tòa không bảo vệ, xem … |
| mục 19 | phần 19, mục 1 | Tiền tăng ca tính theo ba bậc 1,5 lần, 2 lần, 3 lần, không trả thì tố cáo thanh tra lao động, quá hạn không trả còn phải cộng thêm 50% đến 100% | …hưa nghỉ đi theo bộ trọng tài lao động, xem … |
| mục 19 | phần 19, mục 2 | Nghỉ phép năm theo thâm niên cộng dồn 5, 10, 15 ngày, ngày phép chưa nghỉ được quy theo 300% lương ngày | …hưa nghỉ đi theo bộ trọng tài lao động, xem … |
| mục 19 | mục 18 | Cho vay mượn tiền phải viết rõ giấy nợ; đứng bảo lãnh cho người trước hết nghĩ kỹ mình có bằng lòng trả thay không | … Giấy nợ và bảo lãnh xem … |
| mục 19 | mục 20 | Bị kiện, bị thi hành án thì khai thật tài sản, trả được bao nhiêu trả bấy nhiêu; đừng chuyển nhà và tiền cho người thân hay công ty | … Giai đoạn bị thi hành xem … |
| mục 20 | phần 7, mục 19 | Đã từng ngồi tù, từng phá sản, từng lên danh sách mất tín nhiệm, luật đều có đường làm lại, hãy đi hết thủ tục trước | …àm xong nghĩa vụ rồi khôi phục thế nào, xem … |
| mục 20 | mục 21 | Bị hạn chế tiêu dùng hoặc bị đưa vào danh sách mất tín nhiệm, trước hết tra rõ bị nạp theo mục nào, sửa được thì xin sửa | …sách, bị hạn chế tiêu dùng rồi làm sao, xem … |
| mục 21 | phần 7, mục 19 | Đã từng ngồi tù, từng phá sản, từng lên danh sách mất tín nhiệm, luật đều có đường làm lại, hãy đi hết thủ tục trước | … xóa khỏi danh sách không sửa tín dụng, xem … |
| mục 30 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … Bị cắn rồi xử thế nào xem … |
| mục 31 | phần 9, mục 18 | Đối phương chưa đủ 14 tuổi thì không được quan hệ, "cô ấy đồng ý" không phải lý do | … ấu nữ nhận thế nào xem … |
| mục 31 | phần 13, mục 42 | Sau khi bị xâm hại tình dục: trước tới chỗ an toàn gọi 110; trước khi khám thương đừng tắm, đừng giặt áo, đừng dọn phòng, trong 72 giờ đi viện | … Mình là bên bị hại, làm gì trước xem … |
| mục 31 | mục 32 | Sau phát sinh quan hệ, chat sex, bên kia lấy báo cảnh sát, phát ảnh, báo đơn vị bạn ra đòi tiền: một xu không đưa, một dòng không xóa, báo cảnh sát thẳng | … buộc tội và bị tống tiền cùng tồn tại, xem … |
| mục 32 | mục 5 | Bị buộc tội hoặc bị triệu hồi, trước hết mời luật sư, không dàn xếp riêng, không xóa hồ sơ | …ong — đó là xóa luôn chứng cứ của mình, xem … |
| mục 32 | mục 36 | Mình là nạn nhân đi đòi đền: đi đường 12315 (tổng đài tiêu dùng TQ), khởi kiện hoặc mời luật sư; đừng một mình đi gặp bên kia, đừng buộc "trả tiền" và "tôi không phơi bày" thành một câu | …uyền, số cao cũng không bằng tống tiền, xem … |
| mục 33 | mục 34 | Chứng cứ không đủ vốn phải phán vô tội, khẩu cung ép ra phải loại; phán rồi còn có khiếu nại và xét xử lại | …c tội rồi chứng minh và cứu tế thế nào, xem … |
| mục 33 | mục 35 | Bị giam giữ rồi hủy vụ, không truy tố hoặc phán vô tội, đi xin bồi thường nhà nước, tính tiền theo ngày | …c tội rồi chứng minh và cứu tế thế nào, xem … |
| mục 34 | mục 5 | Bị buộc tội hoặc bị triệu hồi, trước hết mời luật sư, không dàn xếp riêng, không xóa hồ sơ | …ăn kinh tế có thể xin viện trợ pháp lý, xem … |
| mục 34 | mục 5 | Bị buộc tội hoặc bị triệu hồi, trước hết mời luật sư, không dàn xếp riêng, không xóa hồ sơ | …, sau lần thẩm vấn đầu tiên ủy luật sư, xem … |
| mục 35 | mục 36 | Mình là nạn nhân đi đòi đền: đi đường 12315 (tổng đài tiêu dùng TQ), khởi kiện hoặc mời luật sư; đừng một mình đi gặp bên kia, đừng buộc "trả tiền" và "tôi không phơi bày" thành một câu | …nào xem quyết định thư trong vụ Quách Lợi ở … |
| mục 36 | mục 5 | Bị buộc tội hoặc bị triệu hồi, trước hết mời luật sư, không dàn xếp riêng, không xóa hồ sơ | … Bị lập án rồi xử thế nào, xem … |
| mục 36 | mục 34 | Chứng cứ không đủ vốn phải phán vô tội, khẩu cung ép ra phải loại; phán rồi còn có khiếu nại và xét xử lại | … Bị lập án rồi xử thế nào, xem … |
| mục 36 | mục 35 | Bị giam giữ rồi hủy vụ, không truy tố hoặc phán vô tội, đi xin bồi thường nhà nước, tính tiền theo ngày | … Bị lập án rồi xử thế nào, xem … |
| mục 36 | mục 32 | Sau phát sinh quan hệ, chat sex, bên kia lấy báo cảnh sát, phát ảnh, báo đơn vị bạn ra đòi tiền: một xu không đưa, một dòng không xóa, báo cảnh sát thẳng | …ên kia lấy thứ bắt bẻ đòi tiền của bạn, xem … |
| mục 37 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … Chịu không nổi thì gọi 12356, xem … |
| mục 37 | phần 14, mục 8 | Bạn có quyền xem, sao chép, sửa và xóa thông tin cá nhân của mình; bị từ chối có thể khởi kiện | …nền tảng xóa thông tin cá nhân của bạn, xem … |
| mục 37 | mục 16 | Trên mạng không chửi người, không bịa tin, không chia sẻ chuyện chưa kiểm; bị bạo lực mạng thì giữ chứng trước rồi báo cảnh sát | …lại sẽ biến chính bạn thành người bị phạt ở … |
| mục 38 | phần 9, mục 21 | Đừng làm giả sự cố, đừng phóng đại tổn thất lừa đền bảo hiểm: đó là tội lừa đảo bảo hiểm, người giúp làm chứng, giúp sửa xe, giúp định giá đều tính chung | …tội, cả người giúp làm chứng cùng tính, xem … |
| mục 38 | mục 14 | Nảy ra ý "kéo kẻ nện chung" "cùng chết", xử như cấp cứu: rời khỏi hiện trường, giao chìa khóa xe và dao cho người khác, gọi 12356 (đường dây tâm lý TQ) | …động muốn hại người nhà xử như cấp cứu, xem … |
| mục 38 | mục 15 | Người thân nói "ai cũng đừng hòng sống yên" "dẫn con đi chung", đừng coi là lời giận: thân nhân gần có thể đưa thẳng đi khám, công an nhận báo cũng phải quản | …động muốn hại người nhà xử như cấp cứu, xem … |
| mục 39 | mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | … Tiến trình chặn chi sau khi bị lừa, xem … |
| mục 39 | mục 37 | Bị bạo lực mạng: mở bảo vệ trước, giữ chứng trước, rồi chọn một trong ba đường nền tảng, lệnh cấm, báo cảnh sát | … Bị bạo lực mạng xem … |
| mục 40 | phần 24, mục 12 | Cảm ơn bác sĩ đã cứu bạn thì đi đường thư cảm ơn, cờ biển và đánh giá mức hài lòng, đừng đi phong bì: quy tắc cấm là tiền của, không phải lòng biết ơn | … trong bệnh viện thuộc bộ quy tắc khác, xem … |
| mục 40 | mục 39 | Báo án phải đòi ngay biên nhận thụ lý; không lập án phải có thông báo văn bản: trong 7 ngày xin xem xét lại, lại 7 ngày xin phúc xét, viện kiểm sát có thể báo công an lập án | … Thật gặp bên kia đòi lợi thì đi theo kênh … |
| mục 41 | phần 19, mục 8 | Trước khi nghỉ việc lưu trước phiếu lương, chấm công, hợp đồng lao động, hồ sơ bảo hiểm xã hội và tin nhắn | … Tư liệu nên lưu trước khi nghỉ việc xem … |
| mục 41 | mục 16 | Trên mạng không chửi người, không bịa tin, không chia sẻ chuyện chưa kiểm; bị bạo lực mạng thì giữ chứng trước rồi báo cảnh sát | …hể động tranh chấp riêng tư và danh dự, xem … |
| mục 42 | mục 1 | Có tai nạn giao thông thì trước hết dừng xe, cứu người, báo cảnh sát, đừng chạy | …iệc phải làm tại hiện trường giao thông xem … |
| mục 43 | mục 41 | Cuộc gọi và cuộc nói chuyện có thể quay mặt, cứ mở ghi âm: cuộc nói chuyện mình tham gia, không cần xin ý kiến bên kia trước | … Ghi âm xem … |
| mục 43 | mục 10 | Có xung đột thì báo cảnh sát trước, không ra tay; kẻ ra tay trước gần như chắc chắn thiệt | … Đừng tự lao vào can đánh nhau, lý do xem … |
| mục 44 | phần 10, mục 12 | Khoản tiền lớn vợ hoặc chồng một mình đi vay, bạn không ký cũng không công nhận sau, không tự động thành nợ của bạn | …nh, nhận định nợ chung vợ chồng thế nào xem … |
| mục 44 | phần 9, mục 15 | Đòi nợ không giữ người, không nhốt người, không theo tận nhà ở lì không cho đi | … Chủ nợ đến chặn người, giữ người, xem … |
| mục 44 | phần 1, mục 37 | Khi đánh bạc đến mức vay tiền đánh tiếp, tâm trạng tụt dốc kéo dài, hãy gọi 12356 trước, rồi giao thẻ ngân hàng và mật khẩu thanh toán cho người nhà giữ | …hân họ đã đánh bạc đến không muốn sống, xem … |

## 09-lan-san-do-phap-luat-de-vi-pham

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 3 | phần 11, mục 11 | Không bán công cụ vượt tường, tài khoản VPN, không dựng node loại đó thay người | …êng công cụ vượt tường bị phạt thế nào, xem … |
| mục 3 | mục 1 | Không chuyển tiếp trong nhóm tin tai họa, dịch bệnh, vụ án chưa rõ thật giả; không chỉnh ảnh, không dùng AI dựng cảnh hiện trường | …hắc thật giả thì càng đừng chuyển theo, xem … |
| mục 5 | phần 8, mục 8 | Không cho bất cứ ai mượn thẻ ngân hàng, SIM điện thoại, tài khoản thanh toán; "chạy điểm" (chuyển tiền hộ ăn hoa hồng) không phải việc làm thêm | … điểm" (chuyển tiền hộ để ăn hoa hồng), xem … |
| mục 6 | phần 8, mục 9 | Mỗi năm tra miễn phí hai lần báo cáo tín dụng của mình, xem có khoản vay hay thẻ nào không phải mình làm không | …hác mạo danh vay thì phát hiện thế nào, xem … |
| mục 6 | mục 5 | "Việc làm thêm" đòi bạn dùng thẻ của mình thu tiền, rút tiền mặt, chuyển khoản: dù cho hoa hồng bao nhiêu cũng không làm | … tiền, chuyển khoản thay người khác thì xem … |
| mục 8 | phần 11, mục 3 | Không viết, không bán script săn vé, săn sale, chạy đơn ảo, bào khuyến mãi, kể cả khi chỉ là "tự động bấm nút" | … Tự viết script, bán script, xem … |
| mục 8 | phần 8, mục 8 | Không cho bất cứ ai mượn thẻ ngân hàng, SIM điện thoại, tài khoản thanh toán; "chạy điểm" (chuyển tiền hộ ăn hoa hồng) không phải việc làm thêm | … bán thẻ, bán tài khoản, xem … |
| mục 8 | mục 16 | Không cho mượn căn cước, không dùng căn cước của người khác, cũng không lấy giấy tờ người khác đi đăng ký, mở thẻ, mua vé | …oản, xem  (không cho mượn thẻ ngân hàng) và … |
| mục 15 | phần 8, mục 18 | Cho vay mượn tiền phải viết rõ giấy nợ; đứng bảo lãnh cho người trước hết nghĩ kỹ mình có bằng lòng trả thay không | … Viết giấy nợ thế nào, xem … |
| mục 16 | phần 8, mục 28 | Đừng làm "pháp nhân treo tên", đừng cho mượn căn cước đi đăng ký công ty | … hậu quả của hai việc đó, xem … |
| mục 16 | phần 8, mục 8 | Không cho bất cứ ai mượn thẻ ngân hàng, SIM điện thoại, tài khoản thanh toán; "chạy điểm" (chuyển tiền hộ ăn hoa hồng) không phải việc làm thêm | … hậu quả của hai việc đó, xem … |
| mục 19 | phần 8, mục 10 | Có xung đột thì báo cảnh sát trước, không ra tay; kẻ ra tay trước gần như chắc chắn thiệt | …anh giới phòng vệ chính đáng ở đâu, bạn xem … |
| mục 19 | phần 8, mục 11 | Xâm hại không tránh được thì có thể đánh trả, nhưng chỉ đánh người đang ra tay; hắn dừng là bạn dừng | …ả khi ra tay với người khác để xả giận, xem … |
| mục 19 | phần 8, mục 12 | Kết thù với ai — bị nợ lương, bị đuổi việc, bị chơi xỏ tiền — đi đường khiếu nại, trọng tài, khởi kiện, đừng đi tìm người tính sổ | …ả khi ra tay với người khác để xả giận, xem … |
| mục 19 | phần 8, mục 13 | Hận đến đâu cũng đừng ra tay với người không liên quan: lái xe đâm vào đám đông, hành hung nơi công cộng định tội dùng phương thức nguy hiểm gây hại an toàn công cộng, khởi hình ba năm, có người chết là tử hình | …ả khi ra tay với người khác để xả giận, xem … |
| mục 19 | phần 8, mục 14 | Nảy ra ý "kéo kẻ nện chung" "cùng chết", xử như cấp cứu: rời khỏi hiện trường, giao chìa khóa xe và dao cho người khác, gọi 12356 (đường dây tâm lý TQ) | …ả khi ra tay với người khác để xả giận, xem … |
| mục 20 | phần 27, mục 7 | Thuộc lòng danh sách "đi bệnh viện ngay" này, trong thai kỳ và trong một năm sau sinh đều tính | … kỳ và sau sinh phải đi bệnh viện ngay, xem … |
| mục 20 | phần 27, mục 16 | Lần tái khám 42 ngày sau sinh đừng nhảy, nó đồng thời là sàng lọc trầm cảm sau sinh | …ồng thời là sàng lọc trầm cảm sau sinh, xem … |
| mục 20 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …tử thì gọi 12356 (đường dây tâm lý TQ), xem … |
| mục 20 | phần 27 | 27-mang-thai-va-sinh-con (cả phần) | … khám thai và nằm viện sinh, xem … |
| mục 21 | phần 5, mục 26 | Mua đủ bảo hiểm bên thứ ba: hạn mức bảo hiểm giao thông bắt buộc thống nhất cả nước và không cao, phần vượt do nhà bạn tự gánh | … Bảo hiểm xe nên mua thế nào, xem … |
| mục 21 | phần 8, mục 38 | Đường "mua bảo hiểm cho người trước rồi ra tay" luật bít từ đầu: tiền một xu không lấy được, tội tính cố ý giết người cộng lừa đảo bảo hiểm, phạt tổng hợp nhiều tội | …t viết rõ phải phạt tổng hợp nhiều tội, xem … |
| mục 21 | phần 5, mục 13 | Làm một lần liên kết dùng chung gia đình trên app bảo hiểm y tế, tiền trong tài khoản cá nhân bảo hiểm y tế công nhân viên cho vợ chồng, cha mẹ, con đi khám mua thuốc được | …tế, đều bị xử theo lừa đảo, xem ghi chú của … |
| mục 22 | phần 1, mục 35 | Đừng lấy "thiếu một quả thận không sao" đổi tiền: quả còn lại phải làm việc thay hai quả, người bán thận sau đó 86% nói sức khỏe xấu đi | … Sau mổ xem … |
| mục 22 | phần 1, mục 35 | Đừng lấy "thiếu một quả thận không sao" đổi tiền: quả còn lại phải làm việc thay hai quả, người bán thận sau đó 86% nói sức khỏe xấu đi | …ột quả thận rồi cơ thể phải trả giá gì, xem … |
| mục 22 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | …g, trước hết bạn hãy xem các kênh cứu trợ ở … |
| mục 22 | mục 6 | Ai rủ bạn "đóng gói hồ sơ" đi vay, chia bạn hoa hồng theo số tiền vay: cái nào cũng không làm | …i bẫy vay mạng và vay "đóng gói hồ sơ", xem … |
| mục 23 | phần 1, mục 30 | Quan hệ tình dục dùng bao cao su suốt quá trình, không dùng chung kim tiêm với ai | … Nguy cơ nhiễm bệnh tình dục và AIDS, xem … |
| mục 23 | phần 13, mục 38 | Có thể đã phơi nhiễm HIV thì trong 72 giờ đi lấy thuốc dự phòng, càng sớm càng tốt | …tình dục dùng bao cao su suốt quá trình) và … |
| mục 23 | phần 22 | 22-thu-gian-the-nao (cả phần) | …ên chú ý ở chính khu vui chơi giải trí, xem … |
| mục 23 | mục 18 | Đối phương chưa đủ 14 tuổi thì không được quan hệ, "cô ấy đồng ý" không phải lý do | …ử thẳng theo tội hiếp dâm và phạt nặng, xem … |

## 10-yeu-va-cuoi-co-dang-khong

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 4 | mục 15 | Giá trị cảm xúc đừng chỉ hỏi "có hay không", phải nhìn chất lượng quan hệ | … … |
| mục 12 | mục 11 | Bố mẹ góp tiền mua nhà, ngay lúc chuyển khoản đã phải ghi rõ là cho hay là vay | … Nên cái hữu dụng hơn vẫn là bước ở … |
| mục 12 | phần 8, mục 18 | Cho vay mượn tiền phải viết rõ giấy nợ; đứng bảo lãnh cho người trước hết nghĩ kỹ mình có bằng lòng trả thay không | …y tắc chung về giấy nợ và giấy bảo lãnh xem … |
| mục 13 | mục 16 | Tính chi phí rút lui: ly hôn thỏa thuận có thời gian bình tĩnh 30 ngày, ly hôn qua kiện có điều kiện luật định | …an bình tĩnh 30 ngày của đăng ký ly hôn xem … |
| mục 17 | mục 8 | Tính cả lợi ích sức khỏe vào, nhưng phải đánh giảm vì đó là số liệu quan sát | …ộc hôn nhân này lợi ích nào là của bạn, các … |
| mục 17 | mục 9 | Khoản thời gian tính theo "việc không được trả công", bàn rõ phân chia rồi hãy đi đăng ký | …ộc hôn nhân này lợi ích nào là của bạn, các … |
| mục 17 | mục 10 | Khoản tiền trước hết xem quy tắc mặc định của pháp luật, rồi mới quyết có cần thỏa thuận bằng văn bản không | …ộc hôn nhân này lợi ích nào là của bạn, các … |
| mục 17 | mục 11 | Bố mẹ góp tiền mua nhà, ngay lúc chuyển khoản đã phải ghi rõ là cho hay là vay | …ộc hôn nhân này lợi ích nào là của bạn, các … |
| mục 17 | mục 12 | Khoản tiền lớn vợ hoặc chồng một mình đi vay, bạn không ký cũng không công nhận sau, không tự động thành nợ của bạn | …ộc hôn nhân này lợi ích nào là của bạn, các … |
| mục 17 | mục 15 | Giá trị cảm xúc đừng chỉ hỏi "có hay không", phải nhìn chất lượng quan hệ | …ộc hôn nhân này lợi ích nào là của bạn, các … |
| mục 17 | mục 16 | Tính chi phí rút lui: ly hôn thỏa thuận có thời gian bình tĩnh 30 ngày, ly hôn qua kiện có điều kiện luật định | …ộc hôn nhân này lợi ích nào là của bạn, các … |
| mục 17 | mục 8 | Tính cả lợi ích sức khỏe vào, nhưng phải đánh giảm vì đó là số liệu quan sát | …động chuyển thành lợi ích sức khỏe của bạn (… |
| mục 17 | mục 15 | Giá trị cảm xúc đừng chỉ hỏi "có hay không", phải nhìn chất lượng quan hệ | …hỏe của bạn (mục 8) hay chất lượng quan hệ (… |
| mục 17 | mục 9 | Khoản thời gian tính theo "việc không được trả công", bàn rõ phân chia rồi hãy đi đăng ký | … Còn khoản thời gian (… |
| mục 17 | mục 10 | Khoản tiền trước hết xem quy tắc mặc định của pháp luật, rồi mới quyết có cần thỏa thuận bằng văn bản không | … Còn khoản thời gian (mục 9), khoản tiền (… |
| mục 17 | mục 11 | Bố mẹ góp tiền mua nhà, ngay lúc chuyển khoản đã phải ghi rõ là cho hay là vay | … Còn khoản thời gian (mục 9), khoản tiền (… |
| mục 17 | mục 12 | Khoản tiền lớn vợ hoặc chồng một mình đi vay, bạn không ký cũng không công nhận sau, không tự động thành nợ của bạn | … Còn khoản thời gian (mục 9), khoản tiền (… |
| mục 17 | mục 16 | Tính chi phí rút lui: ly hôn thỏa thuận có thời gian bình tĩnh 30 ngày, ly hôn qua kiện có điều kiện luật định | …ản tiền (mục 10 đến 12) và chi phí rút lui (… |
| mục 18 | phần 8, mục 43 | Bị bạo hành gia đình: báo cảnh sát trước để lưu hồ sơ xuất cảnh, rồi ra tòa xin lệnh bảo vệ an toàn thân thể; không cần ly hôn trước, cũng không thu phí | …vấn đề giao tiếp, là bạo hành gia đình, xem … |
| mục 18 | mục 16 | Tính chi phí rút lui: ly hôn thỏa thuận có thời gian bình tĩnh 30 ngày, ly hôn qua kiện có điều kiện luật định | …ghĩ kỹ có nên đi không, chi phí rút lui xem … |
| mục 19 | phần 17, mục 2 | Lập di chúc đi, nhớ di chúc lập sau lật đổ di chúc lập trước, di chúc công chứng không còn ưu tiên | … Lập mấy bản di chúc thì lấy bản cuối, xem … |
| mục 19 | phần 17, mục 1 | Trong lúc người già còn tỉnh táo, chỉ định người giám hộ tương lai bằng văn bản | … Giám hộ tự định làm thế nào, xem … |
| mục 20 | mục 19 | Người yêu đồng giới nhân lúc hai người còn tỉnh táo, làm xong ủy quyền, giám hộ tự định và di chúc: về luật hai người không phải thân nhân gần, không làm thì không có quyền ký và quyền thừa kế | …hân bảo vệ, tài sản phải viết rõ riêng, xem … |
| mục 20 | mục 16 | Tính chi phí rút lui: ly hôn thỏa thuận có thời gian bình tĩnh 30 ngày, ly hôn qua kiện có điều kiện luật định | … thời gian bình tĩnh 30 ngày hoặc kiện, xem … |

## 11-lan-san-do-cua-dan-ky-thuat

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 2 | mục 3 | Không viết, không bán script săn vé, săn sale, chạy đơn ảo, bào khuyến mãi, kể cả khi chỉ là "tự động bấm nút" | … Nhưng vụ săn vé ở … |
| mục 4 | mục 3 | Không viết, không bán script săn vé, săn sale, chạy đơn ảo, bào khuyến mãi, kể cả khi chỉ là "tự động bấm nút" | … lấy dữ liệu trong hệ thống, mức phán giống … |
| mục 6 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | …ại, đừng tự tay làm (trọng tài lao động xem … |
| mục 7 | mục 13 | Code viết trong giờ làm, bằng tài nguyên công ty thuộc về công ty; dự án mã nguồn mở của riêng mình làm bằng thời gian và thiết bị của mình, không trộn code công ty | …h viết" cũng thuộc về công ty, điểm này xem … |
| mục 9 | mục 8 | Không chạy chương trình của mình trên máy tính, máy chủ, camera của người khác; máy công ty không mang đi đào coin | … số tiền phạt và số năm giống … |
| mục 9 | mục 10 | Lỗ hổng báo theo đúng quy định; trước khi vá không công khai chi tiết, không phát công cụ khai thác, không giao cho phía nước ngoài | … Phát hiện lỗ hổng xong xử lý thế nào, xem … |
| mục 10 | mục 9 | Không có ủy quyền bằng văn bản thì không test hệ thống của người khác; "xuất phát từ thiện ý" và "báo cáo sau khi làm" đều không phải lý do thoát tội | … Có tư cách đi test hay không xem … |
| mục 15 | mục 4 | Crawler chỉ cào trang công khai không cần đăng nhập, không né chống cào, không đụng thông tin cá nhân, dữ liệu cào được không đem bán | …cấp thông tin cá nhân cấu thành tội thì xem … |

## 12-khoi-nghiep-va-lam-an

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 2 | phần 8, mục 18 | Cho vay mượn tiền phải viết rõ giấy nợ; đứng bảo lãnh cho người trước hết nghĩ kỹ mình có bằng lòng trả thay không | …tắc chung của giấy vay và giấy bảo lãnh xem … |
| mục 2 | mục 1 | Chỉ lấy số tiền lỗ được mà khởi nghiệp, không đụng gia sản, không vay để khai trương | … tiền bảo lãnh nằm trong con số "lỗ được" ở … |
| mục 4 | phần 8, mục 28 | Đừng làm "pháp nhân treo tên", đừng cho mượn căn cước đi đăng ký công ty | …ủa việc đứng tên làm pháp nhân treo tên xem … |
| mục 6 | mục 3 | Trước khi khai trương chọn đúng chủ thể: hộ cá thể và thành viên hợp danh phải trả đến cùng, công ty TNHH mới "hữu hạn" | …ệm của bạn, và trong 5 năm phải nộp đủ, xem … |
| mục 6 | mục 7 | Nghề cần giấy phép thì giấy chưa cấp không khai trương | …ì giấy chưa cấp không được khai trương, xem … |
| mục 7 | mục 8 | Làm thực phẩm trước hết xem mình rơi vào nhóm nào: sản xuất và làm ăn uống phải xin phép, chỉ bán đồ đóng gói sẵn đổi sang khai báo, bán thịt rau tươi không cần giấy | …óm, bán thịt rau tươi có cần giấy không xem … |
| mục 8 | phần 5, mục 31 | Mua phải thực phẩm không an toàn, ngoài hoàn tiền còn đòi được mười lần giá hàng, bồi thêm dưới một nghìn tính một nghìn | … Người mua đòi được bao nhiêu xem … |
| mục 8 | mục 6 | Trước khi đăng ký chốt tên gọi, địa điểm kinh doanh, ngành nghề và vốn điều lệ: đủ giấy tờ lĩnh giấy phép ngay tại chỗ | … chủ thể và giấy phép xem … |
| mục 8 | mục 7 | Nghề cần giấy phép thì giấy chưa cấp không khai trương | …gành nghề), nghề khác có cần giấy không xem … |
| mục 9 | phần 5, mục 31 | Mua phải thực phẩm không an toàn, ngoài hoàn tiền còn đòi được mười lần giá hàng, bồi thêm dưới một nghìn tính một nghìn | …000 (xem … |
| mục 10 | phần 6, mục 10 | Đừng tiêu nhiều tiền mua thực phẩm bảo vệ sức khỏe, cao thuốc, đồ tẩm bổ để "điều dưỡng cơ thể" | …ời mua nhận ra loại lời nói này thế nào xem … |
| mục 11 | mục 8 | Làm thực phẩm trước hết xem mình rơi vào nhóm nào: sản xuất và làm ăn uống phải xin phép, chỉ bán đồ đóng gói sẵn đổi sang khai báo, bán thịt rau tươi không cần giấy | … Làm theo cả bộ ở … |
| mục 11 | mục 8 | Làm thực phẩm trước hết xem mình rơi vào nhóm nào: sản xuất và làm ăn uống phải xin phép, chỉ bán đồ đóng gói sẵn đổi sang khai báo, bán thịt rau tươi không cần giấy | … Ranh giới với … |
| mục 11 | mục 9 | Cho vào bao bán là thực phẩm đóng gói sẵn: trên nhãn, ngày sản xuất, hạn dùng, bảng thành phần thiếu một thứ cũng không được | … Ranh giới với … |
| mục 11 | mục 10 | Thực phẩm thường không được nói là chữa được bệnh: nhãn, tờ hướng dẫn, quảng cáo và lời nói trên livestream đều tính | … Ranh giới với … |
| mục 11 | mục 8 | Làm thực phẩm trước hết xem mình rơi vào nhóm nào: sản xuất và làm ăn uống phải xin phép, chỉ bán đồ đóng gói sẵn đổi sang khai báo, bán thịt rau tươi không cần giấy | …iết kiệm công nhất vẫn là bộ động tác trong … |
| mục 12 | mục 23 | Lỗ thì rút lui theo đúng thủ tục: xóa đăng ký đơn giản được thì xóa, nợ nhiều hơn tài sản thì đi đường phá sản, đừng bỏ mặc | …g ký cũng không đi đường đơn giản được, xem … |
| mục 14 | phần 8, mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | … Đã trả tiền hoặc chuyển khoản rồi thì theo … |
| mục 19 | mục 20 | Nhập mẻ nào giữ chứng từ và thông tin nhà cung cấp của mẻ đó, giá nhập thấp hơn hẳn giá thị trường thì không nhập: hàng giả do nhân viên nhập, người bị phán là chủ | …ỏ dùng nhãn hiệu và hình của người khác xem … |
| mục 19 | mục 21 | Hình trên hàng, bao bì, nhãn treo và ảnh quảng bá hoặc tự làm hoặc mua quyền dùng; đổi màu, thêm biểu tượng không tính là "đã sửa" | …ỏ dùng nhãn hiệu và hình của người khác xem … |
| mục 20 | mục 21 | Hình trên hàng, bao bì, nhãn treo và ảnh quảng bá hoặc tự làm hoặc mua quyền dùng; đổi màu, thêm biểu tượng không tính là "đã sửa" | … Dùng hình của người khác xem … |
| mục 21 | mục 19 | Mẫu làm xong trước hết qua một vòng danh mục sản xuất hàng loạt rồi mới bàn mở xưởng | …Tra nhãn hiệu trước khi đổ vào sản xuất xem … |

## 13-tinh-huong-khan-cap

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 8, mục 3 | Nhớ quy tắc cứng chống lừa: cuộc gọi không tin vội, thông tin không tiết lộ, link không bấm, chuyển tiền kiểm nhiều lần; bảy loại lừa đảo thường gặp nhất đều cùng một khuôn | …lừa và bảy loại lừa đảo thường gặp nhất xem … |
| Mở đầu phần | phần 8, mục 32 | Sau phát sinh quan hệ, chat sex, bên kia lấy báo cảnh sát, phát ảnh, báo đơn vị bạn ra đòi tiền: một xu không đưa, một dòng không xóa, báo cảnh sát thẳng | …nh riêng tư, video chat sex ra đòi tiền xem … |
| Mở đầu phần | phần 8, mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | …dây chống lừa đảo TQ) yêu cầu chặn chi, xem … |
| mục 2 | mục 1 | Có người ngã xuống không thở, lập tức ấn mạnh vào lồng ngực, nhờ người xung quanh gọi 120 (cấp cứu TQ) và tìm AED | …em có thở không, không thở thì ấn ngực theo … |
| mục 2 | phần 1, mục 13 | Trên 60 tuổi tập thăng bằng và sức mạnh chân, cải tạo phòng tắm và cầu thang trong nhà | … Bản thân phòng té ngã xem … |
| mục 2 | phần 8, mục 16 | Trên mạng không chửi người, không bịa tin, không chia sẻ chuyện chưa kiểm; bị bạo lực mạng thì giữ chứng trước rồi báo cảnh sát | …mạng thì giữ chứng báo cảnh sát thế nào xem … |
| mục 2 | mục 10 | Người già va đầu xong vài tuần đến vài tháng sau mà đi không vững, chậm chạp, buồn ngủ hoặc yếu một bên người thì đi chụp CT sọ não | …iệu chứng muộn sau khi người già va đầu xem … |
| mục 2 | mục 39 | Cứu người mà bị thương, tốn tiền: trước tìm người gây hại và bảo hiểm y tế, rồi đi đăng ký xác nhận hành vi nghĩa cử | … Tiền khi cứu người mà bị thương xem … |
| mục 4 | mục 3 | Đột nhiên méo miệng, một bên cánh tay mất lực, nói không rõ lời — gọi ngay 120, đừng chờ, đừng tự lái xe đi | … động tác "méo miệng, giơ tay, nói chuyện" (… |
| mục 6 | phần 6, mục 16 | Đừng mua kính chống ánh sáng xanh để "bảo vệ thị lực", cũng đừng tin "nhìn màn hình vài tháng là hỏng mắt", nhưng mắt đau căng đỏ phải xem là cấp cứu | … Kính chống ánh sáng xanh có ích không xem … |
| mục 6 | mục 5 | Một mắt đột nhiên tối đi như rèm kéo xuống, dù vài phút tự khỏi, cũng phải đi cấp cứu trong ngày theo hướng đột quỵ | …y mà không đau không đỏ là chuyện khác, xem … |
| mục 10 | phần 1, mục 13 | Trên 60 tuổi tập thăng bằng và sức mạnh chân, cải tạo phòng tắm và cầu thang trong nhà | … Phòng té ngã xem … |
| mục 16 | mục 2 | Người già té ngã, có người ngã xuống: trước hết ngồi xổm gọi họ, gọi 120, đừng vội dìu người lên; với người lạ thì đi qua cũng hợp pháp, đã dừng lại thì đừng động tay bê người | …u trách nhiệm (Điều 184 Bộ luật Dân sự, xem … |
| mục 18 | mục 1 | Có người ngã xuống không thở, lập tức ấn mạnh vào lồng ngực, nhờ người xung quanh gọi 120 (cấp cứu TQ) và tìm AED | … Thoát điện rồi không thở thì ấn theo … |
| mục 18 | mục 1 | Có người ngã xuống không thở, lập tức ấn mạnh vào lồng ngực, nhờ người xung quanh gọi 120 (cấp cứu TQ) và tìm AED | …rồi không thở thì làm hồi sức tim phổi theo … |
| mục 19 | phần 1, mục 3 | Lắp máy báo khói; ai mùa đông đốt than hay dùng gas sưởi trong nhà thì lắp thêm máy báo khí CO | … Cách lắp máy báo xem … |
| mục 20 | mục 19 | Máy báo khí CO kêu, hoặc cả nhà cùng đau đầu buồn nôn — đưa người ra ngoài trước rồi mới gọi điện | … Khí CO xem … |
| mục 20 | mục 14 | Bị bỏng thì lập tức xả nước mát chảy 20 phút, đừng bôi kem đánh răng hay nước tương | …máy báo khí CO kêu), bỏng và bỏng nhiệt xem … |
| mục 21 | phần 19, mục 10 | Trước khi vào ca có bụi, tiếng ồn, hóa chất, xem trước hợp đồng có ghi nguy hại không; ba lần khám sức khỏe nghề nghiệp đơn vị sắp xếp và trả tiền | …ảo vệ và khám sức khỏe trước khi vào ca xem … |
| mục 21 | phần 19, mục 11 | Tổn thương do bụi, tiếng ồn, chất độc hóa học không lấy lại được: đồ bảo hộ đơn vị phải cấp, ca không có biện pháp phòng hộ có thể từ chối | …ảo vệ và khám sức khỏe trước khi vào ca xem … |
| mục 21 | mục 20 | Uống nhầm chất tẩy rửa, thuốc trừ sâu, thuốc men: trước hết đừng gây nôn, mang theo chai đi viện ngay; bắn vào mắt hay da thì xả nhiều nước sạch 15 phút | … Chất tẩy rửa trong nhà và uống nhầm xem … |
| mục 25 | phần 1, mục 12 | Trẻ em gần nước thì không rời mắt, chèo thuyền hay bơi ngoài tự nhiên phải mặc áo phao | …ứu phần lớn là con nhà mình, cách phòng xem … |
| mục 31 | mục 13 | Bị chó, mèo cắn hoặc cào rách da: trước hết xả nước xà phòng và nước chảy thay nhau 15 phút, trong ngày đi tiêm vaccine | … Chó cắn xử theo … |
| mục 31 | mục 13 | Bị chó, mèo cắn hoặc cào rách da: trước hết xả nước xà phòng và nước chảy thay nhau 15 phút, trong ngày đi tiêm vaccine | … Bị chó cắn xử lý theo … |
| mục 36 | phần 8, mục 32 | Sau phát sinh quan hệ, chat sex, bên kia lấy báo cảnh sát, phát ảnh, báo đơn vị bạn ra đòi tiền: một xu không đưa, một dòng không xóa, báo cảnh sát thẳng | …n thì ngược lại, một xu cũng không đưa, xem … |
| mục 37 | phần 8, mục 10 | Có xung đột thì báo cảnh sát trước, không ra tay; kẻ ra tay trước gần như chắc chắn thiệt | … Bản thân bị cuốn vào xung đột xem … |
| mục 37 | mục 36 | Nơi hoang vắng bị người lạ đòi tiền tài: đưa tiền cho họ, đừng động tay, nhớ đặc điểm, thoát thân rồi báo cảnh sát | …ớc, không ra tay), bị người lạ đòi tiền xem … |
| mục 37 | mục 39 | Cứu người mà bị thương, tốn tiền: trước tìm người gây hại và bảo hiểm y tế, rồi đi đăng ký xác nhận hành vi nghĩa cử | …mục 36, tiền khi cứu người mà bị thương xem … |
| mục 38 | phần 1, mục 30 | Quan hệ tình dục dùng bao cao su suốt quá trình, không dùng chung kim tiêm với ai | …ữa lỗi, phòng thường ngày và xét nghiệm xem … |
| mục 38 | phần 1, mục 31 | Đã có hành vi nguy cơ thì đi xét nghiệm HIV một lần, trung tâm kiểm soát bệnh tật xét miễn phí, kết quả được bảo mật | …ữa lỗi, phòng thường ngày và xét nghiệm xem … |
| mục 39 | phần 19, mục 15 | Thương tình ổn định rồi đi giám định năng lực lao động, cấp thương tật quy thẳng ra tiền | … và cách quy đổi cấp thương tật ra tiền xem … |
| mục 39 | phần 19, mục 16 | Ba khoản tiền chết vì lao động phải phân biệt: trợ cấp mai táng, trợ cấp nuôi dưỡng người thân, trợ cấp tử vong lao động một lần | … và cách quy đổi cấp thương tật ra tiền xem … |
| mục 39 | phần 7, mục 3 | Không đủ tiền kiện thì xin viện trợ pháp lý, vụ đòi lương, tiền phụng dưỡng, tai nạn lao động vốn nằm trong phạm vi | … Cách xin viện trợ pháp lý xem … |
| mục 40 | phần 24, mục 8 | Thương bệnh nặng đi thẳng tới bàn phân loại cấp cứu, đừng xếp hàng cửa đăng ký | …ng cứu ngay, đừng xếp hàng cửa đăng ký (xem … |
| mục 40 | mục 12 | Chảy máu nhiều thì trước hết dùng tay ấn chặt vết thương, tay chân ấn không cầm được thì lên garô, đồng thời gọi 120 | … ấn và cách lên garô khi chảy máu nhiều xem … |
| mục 41 | phần 24, mục 10 | Giám định thương tật phải đợi sau khi trị liệu kết thúc mới làm, làm sớm cấp sẽ bị đánh thấp | … tật không, có làm thẻ khuyết tật không xem … |
| mục 41 | phần 24, mục 11 | Trị xong thật sự còn chướng ngại chức năng, đến liên hiệp hội người khuyết tật cấp huyện nơi hộ khẩu xin thẻ khuyết tật | … tật không, có làm thẻ khuyết tật không xem … |
| mục 41 | mục 2 | Người già té ngã, có người ngã xuống: trước hết ngồi xổm gọi họ, gọi 120, đừng vội dìu người lên; với người lạ thì đi qua cũng hợp pháp, đã dừng lại thì đừng động tay bê người | …ời già té ngã nghi gãy xương thì cấm bê xem … |
| mục 41 | mục 11 | Một chân đột nhiên sưng lên, căng, ấn đau — đi khám sớm; thêm đột nhiên không thở nổi hoặc đau ngực thì gọi ngay 120 | … một chân sưng thì đề phòng huyết khối, xem … |
| mục 42 | mục 38 | Có thể đã phơi nhiễm HIV thì trong 72 giờ đi lấy thuốc dự phòng, càng sớm càng tốt | …n dân tệ, có uống không do bác sĩ phán, xem … |
| mục 42 | phần 8, mục 41 | Cuộc gọi và cuộc nói chuyện có thể quay mặt, cứ mở ghi âm: cuộc nói chuyện mình tham gia, không cần xin ý kiến bên kia trước | … Ghi âm xem … |
| mục 42 | phần 8, mục 32 | Sau phát sinh quan hệ, chat sex, bên kia lấy báo cảnh sát, phát ảnh, báo đơn vị bạn ra đòi tiền: một xu không đưa, một dòng không xóa, báo cảnh sát thẳng | …áo cảnh sát ra ép bạn cũng là phạm tội, xem … |

## 14-tai-khoan-va-an-toan-thong-tin

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 5 | phần 8, mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | …ừa tự chuyển đi phải đi theo cách khác, xem … |
| mục 5 | mục 1 | Email, thanh toán, tài khoản mạng xã hội đều bật xác minh hai bước; ưu tiên xác nhận bằng cửa sổ bật trên điện thoại, mã xác minh SMS chỉ đứng sau | …ho ai, mã xác minh không chuyển cho ai (xem … |
| mục 9 | mục 8 | Bạn có quyền xem, sao chép, sửa và xóa thông tin cá nhân của mình; bị từ chối có thể khởi kiện | …em, sửa, xóa thông tin cá nhân của mình xem … |

## 15-thue-va-mua-nha

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 1 | phần 8 | 08-dung-tu-chuoc-hoa-vao-than (cả phần) | …thì bạn đi thủ tục tố tụng giá trị nhỏ, xem … |
| mục 7 | mục 6 | Trước khi ký hợp đồng đối chiếu giấy chứng nhận quyền sở hữu và tình trạng thế chấp, mọi khoản tiền đều chuyển khoản và ghi chú mục đích | …n đều chuyển khoản và ghi chú mục đích, xem … |

## 16-song-sau-khi-mac-benh-man-tinh

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 4 | phần 6 | 06-danh-sach-nen-tranh (cả phần) | … Những loại vô hiệu thường gặp, … |
| mục 8 | phần 6, mục 21 | Đừng kiêng canxi để phòng sỏi thận | … Đừng vì phòng sỏi mà kiêng hẳn canxi, xem … |
| mục 8 | phần 1, mục 27 | Nước tiểu có máu nhìn thấy bằng mắt thường, dù không đau, dù hôm sau đã sạch, cũng phải đi khám một lần | …mà không đau thì còn thứ khác cần khám, xem … |
| mục 9 | phần 6, mục 19 | Đừng vì khám thấy acid uric cao nhưng chưa từng đau mà bắt đầu uống thuốc hạ acid uric | …c cao mà chưa từng phát là chuyện khác, xem … |
| mục 9 | phần 2, mục 7 | Không uống nước ngọt có đường, đổi sang loại không đường cũng chưa tính là giải quyết | … Đồ uống có đường và rượu xem … |
| mục 9 | phần 2, mục 20 | Uống ít rượu hoặc không uống | … Đồ uống có đường và rượu xem … |

## 17-nha-co-nguoi-gia

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 3 | phần 8 | 08-dung-tu-chuoc-hoa-vao-than (cả phần) | … quy tắc chung chống lừa xem … |
| mục 3 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … quy tắc chung chống lừa xem phần 8 và … |
| mục 4 | phần 1 | 01-dung-chet-som (cả phần) | … trượt ngã trong nhà tiện tay làm luôn, xem … |
| mục 4 | mục 3 | Tiền của người già để riêng một tài khoản, chi lớn thì đặt quy tắc hai người xác nhận | … Dùng cùng với … |
| mục 5 | phần 8, mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | …dây chống lừa đảo TQ) yêu cầu chặn chi, xem … |
| mục 5 | mục 3 | Tiền của người già để riêng một tài khoản, chi lớn thì đặt quy tắc hai người xác nhận | …ền, dùng kèm quy tắc hai người xác nhận của … |
| mục 5 | mục 6 | Ngoài bảo hiểm thế chấp ngược nhà ở của công ty bảo hiểm, các kiểu "nuôi già bằng nhà" khác đừng đụng, tuyệt đối không thế chấp nhà đi mua quản lý tài chính | … Nuôi già bằng nhà là một đường khác, xem … |
| mục 6 | phần 8, mục 17 | Trước khi ký phải đọc hết tờ giấy; không ký thay người, không ký vào giấy trắng | …y tắc chung về chữ ký và hợp đồng trắng xem … |
| mục 6 | phần 8, mục 2 | Phát hiện bị lừa, gọi ngay 110 (cảnh sát TQ) hoặc 96110 (đường dây chống lừa đảo TQ) yêu cầu chặn chi, đừng tự tra trước | …8, mục 17, cách chặn chi sau khi bị lừa xem … |
| mục 7 | phần 7, mục 8 | Có thẻ khuyết tật thì xin hai khoản trợ cấp cho người khuyết tật | …hủ tục, hai khoản tiền, không xung đột, xem … |
| mục 8 | phần 13, mục 11 | Một chân đột nhiên sưng lên, căng, ấn đau — đi khám sớm; thêm đột nhiên không thở nổi hoặc đau ngực thì gọi ngay 120 | …n, xử lý theo huyết khối tĩnh mạch sâu, xem … |
| mục 8 | phần 1, mục 34 | Đừng đánh cược "nằm vài ngày là khỏi" vào ngã từ trên cao: người vào ICU chấn thương phần lớn sống sót, cái giá tính bằng năm | …t lâu dài vì ngã hoặc chấn thương nặng, xem … |
| mục 8 | mục 7 | Người già trong nhà nằm liệt lâu dài hoặc mất khả năng mức nặng, đến cơ quan bảo hiểm y tế nơi tham gia bảo hiểm xin bảo hiểm chăm sóc dài hạn; nó không phải chỉ phát cho người già | …mà bảo hiểm chăm sóc dài hạn hoàn được, xem … |

## 18-nuoi-con-co-dang-khong

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 10 | 10-yeu-va-cuoi-co-dang-khong (cả phần) | … Giống như … |
| Mở đầu phần | phần 27 | 27-mang-thai-va-sinh-con (cả phần) | …ng thai và cần đi thủ tục từng bước thì xem … |
| mục 3 | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | … Đòi bồi thường thế nào xem … |
| mục 3 | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | …uổi việc trái luật, cách đòi bồi thường xem … |
| mục 4 | phần 10 | 10-yeu-va-cuoi-co-dang-khong (cả phần) | … Cách tính giống cách tính việc nhà ở … |
| mục 6 | phần 10 | 10-yeu-va-cuoi-co-dang-khong (cả phần) | … Cách xét giống … |

## 19-di-lam-nghi-viec-va-tai-nan-lao-dong

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 1 | phần 8, mục 19 | Bảo vệ quyền có thời hạn: thời hiệu khởi kiện dân sự 3 năm, trọng tài lao động 1 năm; quá hạn bên kia nói một câu "quá thời hiệu" là đủ | … Thời hạn trọng tài của tranh chấp xem … |
| mục 3 | phần 12, mục 16 | Người vào làm trong tháng đầu phải ký hợp đồng giấy, trong 30 ngày đăng ký bảo hiểm xã hội | … hay không, nghĩa vụ phía dùng lao động xem … |
| mục 3 | mục 6 | Công ty giải trừ trái luật, tiền bồi thường gấp đôi chuẩn bồi thường kinh tế | … Bị giải trừ trái luật tính theo … |
| mục 6 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | …yết đàm phán hay đi trọng tài, đường đi xem … |
| mục 8 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | … đường bảo vệ quyền xem … |
| mục 8 | phần 11 | 11-lan-san-do-cua-dan-ky-thuat (cả phần) | …ệu kỹ thuật của công ty, rủi ro mang đi xem … |
| mục 9 | mục 7 | Đừng ký "tự nguyện xin nghỉ vì lý do cá nhân", ký một cái là mất N | …phải ý mình mới lĩnh, đây là lý do khác của … |
| mục 9 | phần 7, mục 1 | Thất nghiệp thì trước hết xin tiền bảo hiểm thất nghiệp qua mạng | … Xin qua mạng thế nào xem … |
| mục 9 | phần 11, mục 12 | Đã ký thỏa thuận cấm cạnh tranh, sau nghỉ việc công ty không trả bồi thường hàng tháng thì thúc giục bằng văn bản, đủ 3 tháng không trả có thể hủy; vị trí chưa từng tiếp xúc bí mật thương mại có thể xin xác nhận điều khoản không có hiệu lực | …ạn mới được yêu cầu hủy thỏa thuận này, xem … |
| mục 9 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | … Tư liệu xin và cổng qua mạng xem … |
| mục 9 | phần 11 | 11-lan-san-do-cua-dan-ky-thuat (cả phần) | …ờng và điều kiện hủy của cấm cạnh tranh xem … |
| mục 9 | mục 7 | Đừng ký "tự nguyện xin nghỉ vì lý do cá nhân", ký một cái là mất N | …iền bảo hiểm thất nghiệp cũng mất cùng, xem … |
| mục 10 | mục 12 | Bị thương khi đi làm, trên đường đi làm về bị đâm, việc đầu tiên là làm nhận định tai nạn lao động, đơn vị không báo thì bạn tự báo | …ghiệp đi theo tai nạn lao động, đãi ngộ xem … |
| mục 10 | mục 13 | Đừng tin "cố lết đến chỗ làm là tính tai nạn lao động": khó chịu đột ngột trước hết gọi 120, không phải vội đi chấm thẻ | …ghiệp đi theo tai nạn lao động, đãi ngộ xem … |
| mục 10 | mục 14 | Đơn vị không đóng bảo hiểm tai nạn lao động cho bạn, đãi ngộ tai nạn lao động vẫn có y, đơn vị trả đủ theo cùng chuẩn | …ghiệp đi theo tai nạn lao động, đãi ngộ xem … |
| mục 10 | mục 15 | Thương tình ổn định rồi đi giám định năng lực lao động, cấp thương tật quy thẳng ra tiền | …ghiệp đi theo tai nạn lao động, đãi ngộ xem … |
| mục 10 | mục 16 | Ba khoản tiền chết vì lao động phải phân biệt: trợ cấp mai táng, trợ cấp nuôi dưỡng người thân, trợ cấp tử vong lao động một lần | …ghiệp đi theo tai nạn lao động, đãi ngộ xem … |
| mục 11 | phần 13, mục 21 | Hóa chất axit kiềm bắn lên người: lập tức cởi áo quần dính hóa chất, xả nhiều nước chảy, mắt phải mở mi mắt xả, xả đủ giờ rồi mới đi | …ử lý tại chỗ khi hóa chất bắn lên người xem … |
| mục 11 | mục 10 | Trước khi vào ca có bụi, tiếng ồn, hóa chất, xem trước hợp đồng có ghi nguy hại không; ba lần khám sức khỏe nghề nghiệp đơn vị sắp xếp và trả tiền | … Nên khám rời ca đặc biệt quan trọng (xem … |
| mục 17 | phần 8, mục 41 | Cuộc gọi và cuộc nói chuyện có thể quay mặt, cứ mở ghi âm: cuộc nói chuyện mình tham gia, không cần xin ý kiến bên kia trước | … Bước một, từ hôm nay ghi chép, ghi âm xem … |
| mục 17 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … Đã chịu không nổi, trước gọi 12356, xem … |
| mục 17 | mục 7 | Đừng ký "tự nguyện xin nghỉ vì lý do cá nhân", ký một cái là mất N | …ông đóng bảo hiểm xã hội bị ép đi, làm theo … |
| mục 17 | mục 8 | Trước khi nghỉ việc lưu trước phiếu lương, chấm công, hợp đồng lao động, hồ sơ bảo hiểm xã hội và tin nhắn | …ý "tự nguyện xin nghỉ vì lý do cá nhân") và … |
| mục 17 | mục 4 | Bị sa thải trước tính rõ N: đủ một năm một tháng lương, chưa đủ sáu tháng tính nửa tháng | … Bồi thường kinh tế tính thế nào, xem … |

## 20-cham-tre-so-sinh

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 27 | 27-mang-thai-va-sinh-con (cả phần) | …i làm trước khi sinh và ngày xuất viện, xem … |
| mục 2 | phần 1 | 01-dung-chet-som (cả phần) | … Sàng lọc mẹ tự phải làm xem … |
| mục 3 | mục 2 | Trong 24 tiếng sau sinh tiêm mũi vaccine viêm gan B đầu tiên | … Mũi viêm gan B đầu tiên xem … |
| mục 4 | mục 12 | Bé có chàm nặng hoặc dị ứng trứng, đừng tránh đậu phộng, theo chỉ dẫn bác sĩ thêm sớm, nhưng tuyệt đối không cho ăn nguyên hạt | …ng trứng, đậu phộng có nên tránh không, xem … |
| mục 9 | phần 3 | 03-dung-lang-phi-suc-luc (cả phần) | … Xử lý cảm xúc của mình thế nào, xem … |
| mục 10 | phần 5 | 05-dung-lang-phi-tien (cả phần) | … Cách tra thông báo kiểm tra xem … |
| mục 11 | phần 1 | 01-dung-chet-som (cả phần) | … chứng cứ của ghế an toàn xem … |
| mục 11 | phần 5 | 05-dung-lang-phi-tien (cả phần) | … an toàn xem phần 1, tiêu xài xung động xem … |
| mục 11 | phần 5 | 05-dung-lang-phi-tien (cả phần) | …ể không, áp dụng quy tắc bình tĩnh 24 tiếng … |
| mục 12 | phần 13, mục 26 | Có người nghẹn không nói được: đứng ra sau lưng làm 5 cái vỗ lưng cộng 5 cái thúc bụng, ngã xuống thì làm hồi sức tim phổi | … Bị nghẹn xử lý thế nào xem … |
| mục 12 | mục 4 | 6 tháng đầu chỉ cho bú sữa mẹ, nước cũng không cần cho uống, từ 6 tháng thêm thức ăn phụ và tiếp tục sữa mẹ | …ủ 6 tháng mới bắt đầu thêm thức ăn phụ, xem … |

## 21-du-lich-va-an-toan-nuoc-ngoai

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 4 | mục 3 | Biết bảo hộ lãnh sự làm được gì, không làm được gì: thăm được, không cõng người ra được, phí tổn vẫn tự trả | …ảo hộ lãnh sự cũng không ứng khoản này (xem … |
| mục 6 | phần 14, mục 5 | Thẻ bị gạt trộm: báo mất đóng băng trước rồi báo cảnh sát, sau đó đòi ngân hàng bồi thường, vì chứng minh "chính bạn quẹt" là việc của ngân hàng | …ẻ mất, bị nuốt hay bị gạt trộm làm sao, xem … |
| mục 7 | mục 2 | Lưu 12308 và điện thoại bảo hộ lãnh sự của sứ quán nơi đến vào điện thoại, chép thêm một bản để ví, đừng đợi có chuyện mới đi tìm | …à hai số điện thoại bảo hộ lãnh sự đã lưu ở … |
| mục 10 | phần 8, mục 29 | Xuất nhập cảnh không mang đồ hộ người lạ, không nhận hộ bưu kiện không rõ nguồn | …ại rủi ro với "không mang đồ hộ người lạ" ở … |

## 22-thu-gian-the-nao

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 3, mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | … suy sụp nên làm trước mấy việc gì, bạn xem … |
| mục 4 | phần 8, mục 29 | Xuất nhập cảnh không mang đồ hộ người lạ, không nhận hộ bưu kiện không rõ nguồn | … Chuyện mang đồ hộ người khác, bạn xem … |
| mục 4 | mục 3 | Trong chỗ có người đưa "đồ" thì đi ngay, chứa người dùng và cung cấp đều không phải "giúp bạn bè" | …viên thuốc hay đầu pod thì làm sao, bạn xem … |
| mục 5 | phần 9, mục 16 | Không cho mượn căn cước, không dùng căn cước của người khác, cũng không lấy giấy tờ người khác đi đăng ký, mở thẻ, mua vé | … này với chuyện "không cho mượn căn cước" ở … |
| mục 7 | phần 3, mục 19 | Lúc tinh thần suy sụp làm trước mấy việc đáng giá nhất: vận động, phơi nắng, ngủ đúng giờ, tìm người nói chuyện, gọi 12356 | … ý "lúc tinh thần suy sụp động lên trước" ở … |
| mục 10 | phần 3, mục 16 | Giảm bớt những quan hệ khiến bạn hao mòn, học cách từ chối yêu cầu không muốn nhận | … với "giảm bớt những quan hệ hao mòn bạn" ở … |

## 23-hoc-ky-nang-gi-dang

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | mục 2 | Đưa "đi học có dùng không" vào cả sổ tử vong: mỗi thêm một năm học, nguy cơ chết người lớn giảm khoảng 1,9% | …Phần này tính tiền và thời gian, … |
| Mở đầu phần | mục 2 | Đưa "đi học có dùng không" vào cả sổ tử vong: mỗi thêm một năm học, nguy cơ chết người lớn giảm khoảng 1,9% | …1 nói trước luật gạch đi đoạn lựa chọn nào, … |
| Mở đầu phần | mục 3 | Trước khi phán "học vấn có mất giá không", nhìn kết cấu học vấn cả nước trước: mỗi 10 vạn người chỉ có 15.467 người có trình độ đại học | …mục 2 tính quan hệ giữa đi học và tuổi thọ, … |
| Mở đầu phần | mục 5 | Không đậu THPT không bằng đường đứt: trung cấp có tuyển xuyên suốt và thi riêng, vị trí kỹ năng tuyển dụng còn có thể hạ yêu cầu học vấn | … nói học không nổi thì có những trợ cấp gì, … |
| Mở đầu phần | mục 6 | Đưa "đi học hay đi làm" thành một bài toán: ba năm lương kiếm sớm, đấu với chênh thu nhập mỗi năm của mấy chục năm sau | …gì, mục 5 nói không đậu THPT còn đường nào, … |
| mục 1 | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | … ca, nghỉ phép năm, chế độ tai nạn lao động … |
| mục 1 | mục 10 | Chọn kỹ năng ưu tiên nhìn "có phải động tay không, có phải phán đoán tại chỗ không", loại này khó bị tự động hóa thay nhất | …t đứa 16 tuổi, không học vấn, vừa đúng loại … |
| mục 2 | mục 4 | "Học không nổi" tính theo chính sách một lượt trước: học phí trung cấp đa số đã miễn, trợ cấp học tập 2300 tệ, vay sinh viên mỗi năm cao nhất 2 vạn | … lực của mấy năm học thêm, phần học phí xem … |
| mục 3 | mục 6 | Đưa "đi học hay đi làm" thành một bài toán: ba năm lương kiếm sớm, đấu với chênh thu nhập mỗi năm của mấy chục năm sau | …ụ thể đi học đáng không, phải theo cách của … |
| mục 4 | phần 7, mục 13 | Trong thời gian thất nghiệp hãy lĩnh trợ cấp đào tạo nghề, trợ cấp tập sự việc làm và trợ cấp bảo hiểm xã hội, đừng tự trả tiền học lớp | … thời thời gian thất nghiệp phần 7 đã viết (… |
| mục 4 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | …o và cứu trợ tạm thời thời gian thất nghiệp … |
| mục 4 | mục 6 | Đưa "đi học hay đi làm" thành một bài toán: ba năm lương kiếm sớm, đấu với chênh thu nhập mỗi năm của mấy chục năm sau | …hất nghiệp  đã viết ( trợ cấp đào tạo nghề, … |
| mục 5 | mục 10 | Chọn kỹ năng ưu tiên nhìn "có phải động tay không, có phải phán đoán tại chỗ không", loại này khó bị tự động hóa thay nhất | … Chọn chuyên ngành trung cấp, lấy chiều của … |
| mục 5 | mục 8 | Trước khi bỏ tiền thi chứng chỉ, tra trước chứng này có trong danh mục tư cách nghề quốc gia hay danh sách cơ sở đánh giá đăng ký với Bộ Nhân lực không | … Chứng chỉ nó phát lại theo ba bước của … |
| mục 6 | mục 7 | Nhớ vạch chuẩn trước: mỗi thêm một năm học, lợi tức tư trung bình toàn cầu (phần rơi vào thu nhập mình) khoảng 9% một năm | … Trung bình toàn cầu xem … |
| mục 6 | mục 4 | "Học không nổi" tính theo chính sách một lượt trước: học phí trung cấp đa số đã miễn, trợ cấp học tập 2300 tệ, vay sinh viên mỗi năm cao nhất 2 vạn | …ừ trước mấy khoản miễn học phí và trợ cấp ở … |
| mục 6 | mục 2 | Đưa "đi học có dùng không" vào cả sổ tử vong: mỗi thêm một năm học, nguy cơ chết người lớn giảm khoảng 1,9% | …ấp và trợ cấp học tập), ngoài ra còn sổ của … |
| mục 6 | mục 7 | Nhớ vạch chuẩn trước: mỗi thêm một năm học, lợi tức tư trung bình toàn cầu (phần rơi vào thu nhập mình) khoảng 9% một năm | … Trung bình toàn cầu 9% của … |
| mục 6 | mục 5 | Không đậu THPT không bằng đường đứt: trung cấp có tuyển xuyên suốt và thi riêng, vị trí kỹ năng tuyển dụng còn có thể hạ yêu cầu học vấn | … cửa học vấn pháp định, xem … |
| mục 6 | mục 10 | Chọn kỹ năng ưu tiên nhìn "có phải động tay không, có phải phán đoán tại chỗ không", loại này khó bị tự động hóa thay nhất | … sức chống thay thế, xem … |
| mục 9 | phần 7, mục 13 | Trong thời gian thất nghiệp hãy lĩnh trợ cấp đào tạo nghề, trợ cấp tập sự việc làm và trợ cấp bảo hiểm xã hội, đừng tự trả tiền học lớp | …trợ cấp đào tạo nghề thời gian thất nghiệp (… |
| mục 9 | phần 7, mục 12 | Đăng ký thất nghiệp xong thì tranh thủ được công nhận người khó khăn về việc làm, lấy trợ cấp bảo hiểm xã hội hoặc vị trí việc làm công ích | …đa hưởng 3 lần) và trợ cấp bảo hiểm xã hội (… |
| mục 13 | phần 4 | 04-dung-lang-phi-thoi-gian (cả phần) | … Điều kiện rút … |
| mục 14 | mục 15 | Dàn cùng thời gian ra mấy ngày, đừng học hết một lần | … Tự kiểm và … |
| mục 15 | mục 14 | Học xong gấp sách tự kiểm một lần, đừng quay đầu đọc lại | … Chồng dùng với … |
| mục 16 | mục 14 | Học xong gấp sách tự kiểm một lần, đừng quay đầu đọc lại | … Động tác thay thế xem … |
| mục 16 | mục 15 | Dàn cùng thời gian ra mấy ngày, đừng học hết một lần | …c thay thế xem mục 14 (gấp sách tự kiểm) và … |
| mục 17 | mục 16 | Đừng coi gạch chân, đọc lại nhiều lần, viết tóm tắt làm cách học chính | … Tổng quan mà … |
| mục 18 | mục 9 | Đào tạo ưu tiên đi kênh trợ cấp chính quyền, đừng vừa lên đã tự trả báo lớp thương mại | … Chuẩn chọn đào tạo xem … |
| mục 18 | mục 13 | Cùng tiền cùng thời gian, ưu tiên chọn hạng mục chu kỳ ngắn ra trường làm được ngay | …tạo ưu tiên đi kênh trợ cấp chính quyền) và … |
| mục 19 | mục 16 | Đừng coi gạch chân, đọc lại nhiều lần, viết tóm tắt làm cách học chính | …c đánh giá thấp nhất, muốn xem đánh giá xem … |
| mục 19 | mục 14 | Học xong gấp sách tự kiểm một lần, đừng quay đầu đọc lại | … gấp sách chủ động nhớ lại, cụ thể xem … |
| mục 19 | mục 15 | Dàn cùng thời gian ra mấy ngày, đừng học hết một lần | …ch tự kiểm), và phải chia mấy ngày làm, xem … |

## 24-di-kham-benh

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 7 | 07-song-khi-khong-co-tien (cả phần) | … Lĩnh được chế độ gì xem … |
| Mở đầu phần | phần 16 | 16-song-sau-khi-mac-benh-man-tinh (cả phần) | … Bệnh mạn tính dài hạn quản lý thế nào xem … |
| Mở đầu phần | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … Tại chỗ cấp cứu làm gì trước xem … |
| mục 4 | phần 16, mục 2 | Đăng ký bệnh mạn tính đặc thù ngoại trú trước rồi đăng ký khám ngoại tỉnh, tăng huyết áp, tiểu đường, hóa trị xạ trị, lọc máu, chống đào thải được quyết toán trực tiếp ở tỉnh khác | …oại bệnh nào quyết toán trực tiếp được, xem … |
| mục 5 | phần 16, mục 5 | Bệnh mạn tính ổn định, ở trung tâm y tế cộng đồng một lần có thể kê đủ 12 tuần thuốc | … ở cơ sở một lần kê được 12 tuần thuốc, xem … |
| mục 6 | phần 16, mục 3 | Tái khám theo đúng khoảng cách bác sĩ cho, ghi chỉ số mỗi lần vào cùng một quyển sổ | …ệnh mạn tính ghi vào cùng một quyển sổ, xem … |
| mục 7 | mục 6 | Mỗi lần khám xong, bệnh án, phiếu kiểm tra và phim ảnh tự lưu một bản | … Sao chép là việc thường ngày nên làm, xem … |
| mục 8 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | …báo trước bệnh viện chuẩn bị tiếp khám (xem … |
| mục 9 | phần 7, mục 10 | Mắc bệnh nặng thì trước hết đi theo bảo hiểm y tế, bảo hiểm bệnh nặng, cứu trợ y tế và đăng ký khám tỉnh khác, không đụng vào vay online | …rả vẫn quá nặng, đi đường cứu trợ y tế, xem … |
| mục 10 | phần 9 | 09-lan-san-do-phap-luat-de-vi-pham (cả phần) | …, dùng tính tiền bồi thường khuyết tật (xem … |
| mục 10 | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | …ật khác, lo là chế độ tai nạn lao động (xem … |
| mục 10 | mục 11 | Trị xong thật sự còn chướng ngại chức năng, đến liên hiệp hội người khuyết tật cấp huyện nơi hộ khẩu xin thẻ khuyết tật | …uyết tật, phải làm thêm thẻ khuyết tật (xem … |
| mục 10 | mục 6 | Mỗi lần khám xong, bệnh án, phiếu kiểm tra và phim ảnh tự lưu một bản | …ủ bệnh án, hồ sơ mổ, phim ảnh khám lại (xem … |
| mục 11 | phần 7, mục 8 | Có thẻ khuyết tật thì xin hai khoản trợ cấp cho người khuyết tật | …chăm sóc dài hạn lĩnh trợ cấp chăm sóc, xem … |
| mục 11 | mục 10 | Giám định thương tật phải đợi sau khi trị liệu kết thúc mới làm, làm sớm cấp sẽ bị đánh thấp | …o động là ba thứ, không thay nhau được (xem … |
| mục 12 | phần 8, mục 40 | Đừng đưa tiền đưa thẻ cho người làm án, chấp pháp: hối lộ chính mình cũng bị phán; hối lộ người giám sát, chấp pháp, tư pháp còn bị phạt nặng | …ình, hai việc không cùng lượng, cái sau xem … |
| mục 12 | mục 7 | Nghi ngờ việc khám chữa thì tại chỗ yêu cầu phong tỏa bệnh án, hai bên cùng có mặt, lập danh sách, mỗi bên giữ một bản | …hữa, tại chỗ yêu cầu phong tỏa bệnh án (xem … |
| mục 12 | mục 6 | Mỗi lần khám xong, bệnh án, phiếu kiểm tra và phim ảnh tự lưu một bản | …a bệnh án), và lưu giữ bệnh án và phim ảnh (… |

## 25-viec-phai-lam-khi-nguoi-than-qua-doi

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 17 | 17-nha-co-nguoi-gia (cả phần) | … dụ giám hộ ý định, di chúc, tài khoản, xem … |
| Mở đầu phần | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | … Ba khoản chế độ chết vì lao động xem … |
| mục 1 | mục 2 | Giấy chứng tử là chìa khóa của mọi việc phía sau: ai điều trị người đó khai, chết bình thường tại nhà tìm cơ sở y tế cộng đồng, trong một ngày ký phát | …iấy chứng tử ai điều trị người đó khai, xem … |
| mục 3 | mục 6 | Dịch vụ tang lễ chia hạng mục cơ bản và không cơ bản, hạng mục cơ bản có danh mục, phí theo pháp định | …hân thuộc hạng mục cơ bản, có giá định, xem … |
| mục 4 | phần 24 | 24-di-kham-benh (cả phần) | … Bệnh án phong tỏa thế nào xem … |
| mục 5 | mục 9 | Tiền nằm rải khắp nơi phải từng chỗ đi lĩnh: dư công tích kim, chế độ bảo hiểm xã hội, chế độ tai nạn lao động | … Mấy khoản tiền đó xem … |
| mục 9 | phần 17 | 17-nha-co-nguoi-gia (cả phần) | …êu cầu hình thức của di chúc và thừa kế xem … |
| mục 10 | phần 17 | 17-nha-co-nguoi-gia (cả phần) | …ết ra chỗ tài khoản và mật khẩu đi đâu, xem … |
| mục 10 | phần 14 | 14-tai-khoan-va-an-toan-thong-tin (cả phần) | …n và xóa thông tin cá nhân là hai việc, xem … |

## 26-lam-mot-website-hoac-nen-tang

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 11 | 11-lan-san-do-cua-dan-ky-thuat (cả phần) | … viên kỹ thuật đi làm thuê, làn ranh đỏ xem … |
| Mở đầu phần | phần 12 | 12-khoi-nghiep-va-lam-an (cả phần) | … ty đăng ký thế nào, khai thuế thế nào, xem … |
| Mở đầu phần | mục 11 | Chọn máy chủ trước xem ngừng máy chịu được không, rồi xem có người vận hành không, cuối cùng mới so giá | …ếp là việc nền tảng ngày nào cũng phải làm, … |
| mục 4 | mục 5 | Cho người dùng lên bán đồ, nền tảng phải kiểm nghiệm đăng ký, báo thông tin, lưu ba năm | …g nội địa, tiền trong nội địa, mấy nghĩa vụ … |
| mục 11 | phần 11, mục 16 | Website, app phải đăng ký ICP trước khi lên kệ; theo yêu cầu bảo vệ cấp độ giữ log ít nhất 6 tháng | …hĩa vụ lưu log 6 tháng và bảo vệ cấp độ xem … |

## 27-mang-thai-va-sinh-con

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 18 | 18-nuoi-con-co-dang-khong (cả phần) | …inh con, nghỉ thai sản và tiền nuôi con xem … |
| Mở đầu phần | phần 20 | 20-cham-tre-so-sinh (cả phần) | …ó đáng không), con sinh ra chăm thế nào xem … |
| Mở đầu phần | phần 13 | 13-tinh-huong-khan-cap (cả phần) | …em phần 20 (chăm trẻ sơ sinh), bệnh cấp xem … |
| mục 3 | phần 20, mục 2 | Trong 24 tiếng sau sinh tiêm mũi vaccine viêm gan B đầu tiên | …gan B và globulin miễn dịch viêm gan B (xem … |
| mục 3 | phần 1 | 01-dung-chet-som (cả phần) | … Phòng và xét nghiệm thường ngày xem … |
| mục 3 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | …ơi nhiễm khi xảy ra hành vi nguy cơ cao xem … |
| mục 4 | phần 2 | 02-dung-chet-tu-tu (cả phần) | …Tiền của thuốc rượu với chính người lớn xem … |
| mục 7 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … chỉ hướng là huyết khối tĩnh mạch sâu (xem … |
| mục 11 | phần 18, mục 2 | Nghỉ thai sản 98 ngày, trợ cấp sinh con do quỹ bảo hiểm sinh sản chi trả theo lương bình quân tháng năm trước của người lao động trong đơn vị | …ai sản và trợ cấp sinh con tính thế nào xem … |
| mục 16 | mục 7 | Thuộc lòng danh sách "đi bệnh viện ngay" này, trong thai kỳ và trong một năm sau sinh đều tính | … Trong danh sách "đi bệnh viện ngay" ở … |
| mục 16 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … Có ý nghĩ tự tử lúc xử thế nào xem … |
| mục 16 | phần 9, mục 20 | Con sinh ra nuôi không nổi chỉ có một lối ra hợp pháp là đăng ký với cơ quan dân chính: thu tiền giao con cho người có thể phán theo tội buôn bán trẻ em, bỏ mặc không nuôi là tội bỏ rơi | …ật nuôi không nổi lúc đường ra hợp pháp xem … |

## 28-dung-vi-ngoai-hinh-pha-hong-suc-khoe

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| mục 1 | phần 2, mục 33 | Giữ BMI trong khoảng 20–25, thừa cân thì giảm | … Quan hệ BMI và tỷ lệ chết xem … |
| mục 3 | mục 2 | Trước khi tiêm kim, cấy chỉ, mở dao tra hai thứ: trên giấy phép cơ sở có "thẩm mỹ y khoa" không, người động tay có phải bác sĩ chủ chẩn không | … Trước khi làm trước theo … |
| mục 5 | mục 4 | Đừng mua thuốc giảm cân, cà phê giảm cân, kẹo gầy và mơ enzyme hứa "gầy nhanh" | … Cách phán như mục thuốc giảm cân kia (… |
| mục 6 | mục 5 | Đừng dùng steroid đồng hóa ("kim tăng cơ" "thuốc uống") để lên cơ | … Steroid và hormone giới tính … |
| mục 6 | mục 7 | Thuốc loại hormone giới tính chỉ dùng khi bác sĩ kê và định kỳ tái xét, đừng mua mạng, đừng tự tăng liều | … Steroid và hormone giới tính … |

## 29-sau-khi-gap-cu-soc-lon

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | mục 9 | Đừng ngay đầu bỏ tiền làm tư vấn ai đạo, trước xem ai đạo của mình có thật sự kẹt không (mấy triệu chứng của mục 8) | … đừng ngay đầu bỏ tiền làm tư vấn ai đạo (… |
| Mở đầu phần | mục 11 | Muốn người ngồi nói chuyện gọi 12356, người chưa thành niên và thanh thiếu niên gọi 12355, muốn xem bác sĩ treo khám tâm lý | …9 phần này), gọi 12356 và treo khám tâm lý (… |
| Mở đầu phần | mục 12 | Ba tháng đầu sau biến cố, đại quyết định không đảo lại được phàm là đều để sau | …, quyết định lớn không đảo lại được để sau (… |
| Mở đầu phần | mục 13 | Đừng lấy cái chết làm cách trả nợ: bảo hiểm sinh thọ trong hai năm không bồi, tai nạn lao động không nhận, nợ vẫn trừ từ di sản trước | …au (mục 12), đừng lấy chết làm cách trả nợ (… |
| Mở đầu phần | mục 6 | Không có người thân cũng không bạn, đổi "người trông bạn" thành ba thứ: hàng xóm vào được cửa nhà, danh sách thăm viếng của cộng đồng, liên lạc khẩn cấp trong điện thoại | …"tìm người trông" rơi xuống đất thế nào xem … |
| Mở đầu phần | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … Có ý nghĩ tự tử trước gọi 12356 xem … |
| Mở đầu phần | phần 1, mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … thước thời gian của ý nghĩ xem … |
| Mở đầu phần | phần 1, mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … di chứng sau khi cứu về xem … |
| Mở đầu phần | phần 25 | 25-viec-phai-lam-khi-nguoi-than-qua-doi (cả phần) | … thân qua đời, thi thể và tiền nên lĩnh xem … |
| Mở đầu phần | phần 17 | 17-nha-co-nguoi-gia (cả phần) | …ám hộ và di chúc lúc người già còn sống xem … |
| Mở đầu phần | phần 7 | 07-song-khi-khong-co-tien (cả phần) | … Mất việc lĩnh được gì xem … |
| Mở đầu phần | phần 3 | 03-dung-lang-phi-suc-luc (cả phần) | …động và ánh sáng lúc tâm trạng sa xuống xem … |
| Mở đầu phần | phần 22 | 22-thu-gian-the-nao (cả phần) | …h sáng lúc tâm trạng sa xuống xem phần 3 và … |
| mục 1 | phần 2 | 02-dung-chet-tu-tu (cả phần) | … Đừng dựa rượu gánh qua, tiền của rượu xem … |
| mục 1 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | …g phong nhận ra thế nào, gọi xe thế nào xem … |
| mục 1 | mục 6 | Không có người thân cũng không bạn, đổi "người trông bạn" thành ba thứ: hàng xóm vào được cửa nhà, danh sách thăm viếng của cộng đồng, liên lạc khẩn cấp trong điện thoại | …y ngày này định sẵn một mình trong nhà, xem … |
| mục 2 | phần 16 | 16-song-sau-khi-mac-benh-man-tinh (cả phần) | … hạn, báo danh và tái xét sau chẩn đoán xem … |
| mục 2 | phần 24 | 24-di-kham-benh (cả phần) | …phần 16 (sống sau khi mắc bệnh mạn tính) và … |
| mục 2 | mục 6 | Không có người thân cũng không bạn, đổi "người trông bạn" thành ba thứ: hàng xóm vào được cửa nhà, danh sách thăm viếng của cộng đồng, liên lạc khẩn cấp trong điện thoại | … Không tìm được người đi cùng xem … |
| mục 3 | phần 7 | 07-song-khi-khong-co-tien (cả phần) | …i đâu lĩnh, bảo hiểm xã hội nối thế nào xem … |
| mục 3 | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | …y bồi thường bao nhiêu, đừng ký tự nghỉ xem … |
| mục 4 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …Bản thân có ý nghĩ tự tử lúc xử thế nào xem … |
| mục 5 | phần 17 | 17-nha-co-nguoi-gia (cả phần) | … Nhà có người già mất vợ/chồng, theo … |
| mục 5 | mục 6 | Không có người thân cũng không bạn, đổi "người trông bạn" thành ba thứ: hàng xóm vào được cửa nhà, danh sách thăm viếng của cộng đồng, liên lạc khẩn cấp trong điện thoại | …o việc này cho cộng đồng và điện thoại, xem … |
| mục 6 | phần 13, mục 1 | Có người ngã xuống không thở, lập tức ấn mạnh vào lồng ngực, nhờ người xung quanh gọi 120 (cấp cứu TQ) và tìm AED | … "Trong nhà có người" vì sao đáng giá, xem … |
| mục 6 | phần 22, mục 10 | Coi "gặp người định kỳ" là khoản chi sức khỏe, đừng chỉ lúc tâm trạng kém mới tìm người | …một mình 1,32, cao khoảng ba phần mười, xem … |
| mục 6 | phần 25 | 25-viec-phai-lam-khi-nguoi-than-qua-doi (cả phần) | …ồng, công an, công tích kim mấy cửa sổ (xem … |
| mục 6 | mục 11 | Muốn người ngồi nói chuyện gọi 12356, người chưa thành niên và thanh thiếu niên gọi 12355, muốn xem bác sĩ treo khám tâm lý | …a đình biến cố, thất nghiệp, thất học" (xem … |
| mục 6 | mục 11 | Muốn người ngồi nói chuyện gọi 12356, người chưa thành niên và thanh thiếu niên gọi 12355, muốn xem bác sĩ treo khám tâm lý | …p lại được, không phải chỉ gọi một lần (xem … |
| mục 7 | phần 17 | 17-nha-co-nguoi-gia (cả phần) | …hỉ định người giám hộ và an bài tài sản xem … |
| mục 7 | phần 18 | 18-nuoi-con-co-dang-khong (cả phần) | … Phí nuôi con và đi học xem … |
| mục 9 | mục 8 | Ai đạo quá nửa năm còn đứng nguyên chỗ, ngày không sống nổi, đi treo số khoa tâm thần hay tâm lý lâm sàng | … Trước đối chiếu … |
| mục 9 | mục 4 | Người thân chết vì tự tử, tai nạn hay án mạng, đừng trông cứng gánh, chủ động đi tìm trợ giúp chuyên môn | … Người mất thân nguy cơ cao kiểu … |
| mục 9 | mục 8 | Ai đạo quá nửa năm còn đứng nguyên chỗ, ngày không sống nổi, đi treo số khoa tâm thần hay tâm lý lâm sàng | …tử, tai nạn hay án mạng), người đã kẹt kiểu … |
| mục 10 | phần 8 | 08-dung-tu-chuoc-hoa-vao-than (cả phần) | … Lúc ly hôn tài sản, nợ và sính lễ xem … |
| mục 10 | phần 10 | 10-yeu-va-cuoi-co-dang-khong (cả phần) | …ly hôn tài sản, nợ và sính lễ xem phần 8 và … |
| mục 10 | phần 18 | 18-nuoi-con-co-dang-khong (cả phần) | … An bài nuôi con xem … |
| mục 11 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …n mở và mỗi ngày nhận bao lâu của 12356 xem … |
| mục 12 | phần 17 | 17-nha-co-nguoi-gia (cả phần) | …ặp nhắm vào người mất thân và người già xem … |
| mục 12 | phần 6 | 06-danh-sach-nen-tranh (cả phần) | …17 (đầu tư dưỡng lão, lấy nhà dưỡng lão) và … |
| mục 12 | phần 8 | 08-dung-tu-chuoc-hoa-vao-than (cả phần) | … Ổ của bảo lãnh và giấy vay xem … |
| mục 12 | phần 25 | 25-viec-phai-lam-khi-nguoi-than-qua-doi (cả phần) | …xã hội, ba khoản tiền chết vì lao động, xem … |
| mục 12 | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | …khoản tiền chết vì lao động, xem phần 25 và … |
| mục 12 | mục 11 | Muốn người ngồi nói chuyện gọi 12356, người chưa thành niên và thanh thiếu niên gọi 12355, muốn xem bác sĩ treo khám tâm lý | …ích như vậy, thì gọi 12356 nói một lần (xem … |
| mục 13 | mục 4 | Người thân chết vì tự tử, tai nạn hay án mạng, đừng trông cứng gánh, chủ động đi tìm trợ giúp chuyên môn | …ấy phần còn, còn phải gánh giá sức khỏe của … |
| mục 13 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … Ý nghĩ hiện lên lúc làm thế nào xem … |
| mục 13 | phần 1, mục 32 | Ý nghĩ tự tử vừa nảy ra thì nói ngay cho một người bên cạnh, giao mấy chục phút đó cho họ | … Ý nghĩ hiện lên lúc làm thế nào xem … |
| mục 13 | phần 1, mục 33 | Đừng lấy "cứu được rồi" làm điểm tựa: uống thuốc trừ sâu, hít khí than sau đó cấp cứu giữ được mạng, không giữ được phổi và não | … di chứng sau khi cứu về xem … |
| mục 13 | phần 19, mục 16 | Ba khoản tiền chết vì lao động phải phân biệt: trợ cấp mai táng, trợ cấp nuôi dưỡng người thân, trợ cấp tử vong lao động một lần | … Chuẩn ba khoản tiền chết vì lao động xem … |
| mục 13 | phần 25, mục 9 | Tiền nằm rải khắp nơi phải từng chỗ đi lĩnh: dư công tích kim, chế độ bảo hiểm xã hội, chế độ tai nạn lao động | … Thủ tục cụ thể di sản và nợ xem … |
| mục 13 | phần 1 | 01-dung-chet-som (cả phần) | … Các mục khác của phần này và … |
| mục 13 | mục 4 | Người thân chết vì tự tử, tai nạn hay án mạng, đừng trông cứng gánh, chủ động đi tìm trợ giúp chuyên môn | … Giá sức khỏe của người nhà xem … |

## 30-con-cai-tuoi-di-hoc

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 1 | 01-dung-chet-som (cả phần) | …c, giao thông, mũ bảo hiểm, vắc xin HPV xem … |
| Mở đầu phần | phần 20 | 20-cham-tre-so-sinh (cả phần) | … Trẻ nhỏ sơ sinh xem … |
| Mở đầu phần | phần 5 | 05-dung-lang-phi-tien (cả phần) | … Con bị lừa và nạp tiền game xem … |
| Mở đầu phần | phần 9 | 09-lan-san-do-phap-luat-de-vi-pham (cả phần) | …n đỏ người chưa thành niên tự không đạp xem … |
| Mở đầu phần | phần 13 | 13-tinh-huong-khan-cap (cả phần) | …ệnh cấp nhận ra thế nào, gọi xe thế nào xem … |
| Mở đầu phần | phần 29 | 29-sau-khi-gap-cu-soc-lon (cả phần) | … Con sau khi cha mẹ qua đời xem … |
| Mở đầu phần | mục 8 | Con 12 tới 18 tuổi làm một lần sàng lọc trầm cảm, đừng cầm bài đo tâm lý của trường làm chẩn đoán | …Mục 1 tới … |
| Mở đầu phần | mục 14 | Con mê game, trước xem ngủ, bài tập và ra ngoài hoạt động có bị ép mất không, đừng chỉ soi chơi bao lâu | …Mục 1 tới … |
| Mở đầu phần | mục 15 | Con nói mình thích cùng giới, đừng mắng, đừng đuổi ra khỏi nhà, đừng gửi đi "chỉnh chuyển": thái độ trong nhà quan hệ nó tự tử hay không | …Mục 1 tới … |
| Mở đầu phần | mục 11 | Con gánh không nổi có thể nghỉ học, chỗ học trường phải giữ lại cho nó, dài nhất 1 năm | …h rõ về ngủ, bài tập, thể dục, xếp hạng) và … |
| mục 1 | phần 13 | 13-tinh-huong-khan-cap (cả phần) | …ệnh cấp nhận ra thế nào, gọi xe thế nào xem … |
| mục 2 | mục 7 | Phiếu báo cáo lần khám thể học sinh mỗi năm phải tự xem một lần, hạng mục bất thường năm đó dẫn con đi bệnh viện tra | … hạng mục trọng điểm khám thể học sinh (xem … |
| mục 2 | mục 11 | Con gánh không nổi có thể nghỉ học, chỗ học trường phải giữ lại cho nó, dài nhất 1 năm | …ỉ học, dài nhất 1 năm, chỗ học giữ lại, xem … |
| mục 5 | mục 4 | Cho con mỗi ngày ở ngoài trời đủ 2 tiếng, đây là cách phòng cận thị hiện có thử nghiệm rút quẻ đỡ duy nhất | … Thật sự có thử nghiệm rút quẻ đỡ là … |
| mục 5 | mục 12 | Tra ra thị lực kém, đi bệnh viện làm khám khúc xạ có giãn đồng, sau đó tái khám theo khoảng bác sĩ cho | …dự trữ viễn thị còn bao nhiêu, cách tra xem … |
| mục 6 | mục 4 | Cho con mỗi ngày ở ngoài trời đủ 2 tiếng, đây là cách phòng cận thị hiện có thử nghiệm rút quẻ đỡ duy nhất | …Bản thân không phải làm gì, việc phải làm ở … |
| mục 6 | mục 5 | 0 tới 3 tuổi không cho màn hình, 3 tới 6 tuổi tận lực không cho, tiểu trung học sinh không phải dùng học mỗi ngày không quá 1 tiếng | …Bản thân không phải làm gì, việc phải làm ở … |
| mục 6 | mục 12 | Tra ra thị lực kém, đi bệnh viện làm khám khúc xạ có giãn đồng, sau đó tái khám theo khoảng bác sĩ cho | … Sau chẩn đoán tái khám thế nào xem … |
| mục 6 | mục 9 | Không mua sản phẩm và dịch vụ tự xưng "chữa khỏi cận thị" "giảm độ" | … Đừng mua sản phẩm tự xưng chữa khỏi, xem … |
| mục 7 | mục 12 | Tra ra thị lực kém, đi bệnh viện làm khám khúc xạ có giãn đồng, sau đó tái khám theo khoảng bác sĩ cho | …đi nhãn khoa làm khám khúc xạ có giãn đồng (… |
| mục 7 | mục 2 | Trị liệu đáng làm đừng vì "đợi thi xong" mà kéo sau, có cửa sổ đi theo tuổi xương, không đi theo lịch thi | …phải đi khoa xương hay ngoại khoa cột sống (… |
| mục 8 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … Có ý tự tử lúc xử thế nào xem … |
| mục 8 | phần 29 | 29-sau-khi-gap-cu-soc-lon (cả phần) | … Đối phó trong nhà xem … |
| mục 9 | phần 6 | 06-danh-sach-nen-tranh (cả phần) | … Kính chống ánh xanh xem … |
| mục 9 | mục 4 | Cho con mỗi ngày ở ngoài trời đủ 2 tiếng, đây là cách phòng cận thị hiện có thử nghiệm rút quẻ đỡ duy nhất | … Thật sự có chứng cứ là hai việc ở … |
| mục 9 | mục 12 | Tra ra thị lực kém, đi bệnh viện làm khám khúc xạ có giãn đồng, sau đó tái khám theo khoảng bác sĩ cho | …hứng cứ là hai việc ở mục 4 (ngoài trời) và … |
| mục 10 | phần 2 | 02-dung-chet-tu-tu (cả phần) | … Tiền ngủ của người lớn xem … |
| mục 10 | phần 3 | 03-dung-lang-phi-suc-luc (cả phần) | … Tiền ngủ của người lớn xem … |
| mục 12 | mục 7 | Phiếu báo cáo lần khám thể học sinh mỗi năm phải tự xem một lần, hạng mục bất thường năm đó dẫn con đi bệnh viện tra | … viện làm một lần tra nhãn khoa đầy đủ, xem … |
| mục 13 | mục 7 | Phiếu báo cáo lần khám thể học sinh mỗi năm phải tự xem một lần, hạng mục bất thường năm đó dẫn con đi bệnh viện tra | …điểm hướng dẫn trong khám thể học sinh, xem … |
| mục 14 | phần 5, mục 9 | Con dùng điện thoại nạp tiền tặng quà, khoản lớn của trẻ từ tám tuổi không được cha mẹ thừa nhận có thể đòi trả | … Nạp tiền và hoàn tiền xem … |
| mục 14 | mục 10 | Ngủ, bài tập, thể dục và xếp hạng đều có quy định rõ, trường làm không tới có thể đề nghị | … Yêu cầu rõ về ngủ xem … |
| mục 14 | mục 4 | Cho con mỗi ngày ở ngoài trời đủ 2 tiếng, đây là cách phòng cận thị hiện có thử nghiệm rút quẻ đỡ duy nhất | …này (ngủ, bài tập, thể dục), ngoài trời xem … |
| mục 14 | mục 5 | 0 tới 3 tuổi không cho màn hình, 3 tới 6 tuổi tận lực không cho, tiểu trung học sinh không phải dùng học mỗi ngày không quá 1 tiếng | …ngoài trời 2 tiếng), thời gian màn hình xem … |
| mục 15 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …, nói không muốn sống, trước gọi 12356, xem … |
| mục 15 | phần 6, mục 28 | Đừng tiêu tiền làm "chỉnh chuyển xu hướng tính dục" "chữa đồng tính", cũng đừng gửi người nhà đi | … "Chỉnh chuyển" vì sao đừng đụng, xem … |
| mục 15 | mục 8 | Con 12 tới 18 tuổi làm một lần sàng lọc trầm cảm, đừng cầm bài đo tâm lý của trường làm chẩn đoán | … Cũng có thể theo … |

## 31-nhung-con-duong-sau-tuoi-muoi-tam

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 23 | 23-hoc-ky-nang-gi-dang (cả phần) | …huê tính thế nào, kỹ năng chọn thế nào, xem … |
| Mở đầu phần | phần 19 | 19-di-lam-nghi-viec-va-tai-nan-lao-dong (cả phần) | …i nạn lao động và bồi thường nghỉ việc, xem … |
| Mở đầu phần | phần 12 | 12-khoi-nghiep-va-lam-an (cả phần) | …Vốn mở tiệm làm công ty và thoái tràng, xem … |
| Mở đầu phần | phần 32 | 32-du-hoc-nuoc-ngoai (cả phần) | … Du học xem … |
| Mở đầu phần | phần 7 | 07-song-khi-khong-co-tien (cả phần) | … Bảo đảm sau thất nghiệp xem … |
| mục 1 | mục 11 | Không vào đơn vị tức việc làm linh hoạt: dưỡng lão và y tế phải tự tham gia bảo hiểm nơi việc làm, hạn chế hộ tịch đã thả lỏng | …gia bảo hiểm và bảo đảm tổn thương nghề xem … |
| mục 1 | mục 12 | Giao đồ ăn, chạy xe gọi trên mạng, kéo hàng đồng thành, nền tảng theo đơn đóng phí bảo đảm tổn thương nghề cho bạn, mình không đóng | …gia bảo hiểm và bảo đảm tổn thương nghề xem … |
| mục 2 | mục 3 | Sau khi ứng chiêu từ chối phục binh dịch, trong hai năm không được xuất cảnh hay lên học phục học, còn vào không được công chức và doanh nghiệp nhà nước | … chỉ phạt người ứng chiêu rồi trở mình, xem … |
| mục 3 | mục 2 | Năm mười tám tuổi trước 31 tháng 10 phải làm đăng ký binh dịch; nghĩa vụ binh phục hiện dịch là hai năm | … Luật Binh dịch Điều 57 khoản 1 … |
| mục 3 | mục 2 | Năm mười tám tuổi trước 31 tháng 10 phải làm đăng ký binh dịch; nghĩa vụ binh phục hiện dịch là hai năm | … "có hành vi … |
| mục 3 | mục 2 | Năm mười tám tuổi trước 31 tháng 10 phải làm đăng ký binh dịch; nghĩa vụ binh phục hiện dịch là hai năm | …h không nằm trong đó, đăng ký binh dịch xem … |
| mục 10 | phần 23, mục 8 | Trước khi bỏ tiền thi chứng chỉ, tra trước chứng này có trong danh mục tư cách nghề quốc gia hay danh sách cơ sở đánh giá đăng ký với Bộ Nhân lực không | …nh" mua bằng tiền và chứng chỉ sơn trại xem … |
| mục 10 | phần 23 | 23-hoc-ky-nang-gi-dang (cả phần) | …kỹ năng nào đáng" là hai việc, việc sau xem … |
| mục 11 | phần 7, mục 18 | Bảo hiểm xã hội đứt đóng đừng hoảng: hưu trí tính theo cộng dồn, bảo hiểm y tế bù theo quy tắc | …ã hội bù thế nào, năm tích lũy thế nào, xem … |
| mục 12 | mục 11 | Không vào đơn vị tức việc làm linh hoạt: dưỡng lão và y tế phải tự tham gia bảo hiểm nơi việc làm, hạn chế hộ tịch đã thả lỏng | …ệu, mục việc làm linh hoạt cũng dẫn nó, xem … |
| mục 12 | mục 11 | Không vào đơn vị tức việc làm linh hoạt: dưỡng lão và y tế phải tự tham gia bảo hiểm nơi việc làm, hạn chế hộ tịch đã thả lỏng | …m, việc làm linh hoạt tham gia bảo hiểm xem … |
| mục 14 | phần 21, mục 5 | "Tuyển dụng nước ngoài lương cao" nhất loạt coi là lừa đảo, bị lừa đi làm điện lừa về còn bị hạn chế xuất cảnh | …ương cao ngoại cảnh và khu lừa đảo điện xem … |
| mục 14 | phần 21 | 21-du-lich-va-an-toan-nuoc-ngoai (cả phần) | …an toàn phải tra trước xuất phát và 12308 ở … |
| mục 15 | mục 14 | Muốn ra nước ngoài làm thuê, trước tra công ty này có tư cách kinh doanh hợp tác lao vụ đối ngoại không: nó không được thu bạn đặt cọc | …ủ dùng người ngoại cảnh là một bộ khác, xem … |
| mục 16 | phần 12, mục 1 | Chỉ lấy số tiền lỗ được mà khởi nghiệp, không đụng gia sản, không vay để khai trương | … Lập trường của sách này ở … |
| mục 16 | phần 7, mục 13 | Trong thời gian thất nghiệp hãy lĩnh trợ cấp đào tạo nghề, trợ cấp tập sự việc làm và trợ cấp bảo hiểm xã hội, đừng tự trả tiền học lớp | …thực tập việc làm trong kỳ thất nghiệp, xem … |
| mục 16 | phần 12 | 12-khoi-nghiep-va-lam-an (cả phần) | …giấy phép khả, báo thuế và thoái tràng, xem … |

## 32-du-hoc-nuoc-ngoai

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 21 | 21-du-lich-va-an-toan-nuoc-ngoai (cả phần) | …ế và vận chuyển ngoại cảnh mua thế nào, xem … |
| Mở đầu phần | phần 23 | 23-hoc-ky-nang-gi-dang (cả phần) | … Bút toán đọc sách hay làm thuê, xem … |
| Mở đầu phần | phần 14 | 14-tai-khoan-va-an-toan-thong-tin (cả phần) | … Tài khoản bị đánh cắp xem … |
| Mở đầu phần | phần 8 | 08-dung-tu-chuoc-hoa-vao-than (cả phần) | … đánh cắp xem phần 14, lừa đảo điện tín xem … |
| mục 6 | phần 21 | 21-du-lich-va-an-toan-nuoc-ngoai (cả phần) | …thân người ngoại cảnh và bảo hộ lãnh sự xem … |

## 33-song-sau-khi-khuyet-tat

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 1 | 01-dung-chet-som (cả phần) | … Cách ngăn không cho tàn tật đã viết ở … |
| Mở đầu phần | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … ngăn không cho tàn tật đã viết ở phần 1 và … |
| Mở đầu phần | phần 24, mục 11 | Trị xong thật sự còn chướng ngại chức năng, đến liên hiệp hội người khuyết tật cấp huyện nơi hộ khẩu xin thẻ khuyết tật | …ấp một tới cấp bốn đánh giá ra sao, bạn xem … |
| Mở đầu phần | phần 24, mục 10 | Giám định thương tật phải đợi sau khi trị liệu kết thúc mới làm, làm sớm cấp sẽ bị đánh thấp | …hương tật phải đợi tới lúc nào mới làm, xem … |
| Mở đầu phần | phần 7, mục 8 | Có thẻ khuyết tật thì xin hai khoản trợ cấp cho người khuyết tật | …khoản trợ cấp người khuyết tật thế nào, xem … |
| Mở đầu phần | phần 19, mục 15 | Thương tình ổn định rồi đi giám định năng lực lao động, cấp thương tật quy thẳng ra tiền | …à cấp thương tật quy ra bao nhiêu tiền, xem … |
| Mở đầu phần | phần 17, mục 7 | Người già trong nhà nằm liệt lâu dài hoặc mất khả năng mức nặng, đến cơ quan bảo hiểm y tế nơi tham gia bảo hiểm xin bảo hiểm chăm sóc dài hạn; nó không phải chỉ phát cho người già | …ho người mất năng lực mức nặng thế nào, xem … |
| mục 2 | phần 29, mục 11 | Muốn người ngồi nói chuyện gọi 12356, người chưa thành niên và thanh thiếu niên gọi 12355, muốn xem bác sĩ treo khám tâm lý | …có người ngồi nói chuyện thì gọi 12356, xem … |
| mục 2 | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | …ng tích trữ thuốc ngủ và thuốc trừ sâu, xem … |
| mục 2 | phần 29, mục 8 | Ai đạo quá nửa năm còn đứng nguyên chỗ, ngày không sống nổi, đi treo số khoa tâm thần hay tâm lý lâm sàng | …ám ở khoa tâm thần hay tâm lý lâm sàng, xem … |
| mục 3 | phần 8 | 08-dung-tu-chuoc-hoa-vao-than (cả phần) | …g động làm đau người thì xử lý thế nào, xem … |
| mục 4 | phần 16, mục 1 | Uống thuốc đủ theo chỉ định bác sĩ, đừng thấy đỡ là ngừng | … chính người chăm thì đừng ngừng thuốc, xem … |
| mục 5 | phần 17, mục 8 | Nhà có người nằm liệt lâu dài, coi loét do nằm lâu là kẻ thù số một: gắn nệm hơi điện, lật người đúng giờ, mỗi ngày nhìn một lượt chỗ xương lồi ra | …ồm giường đệm khí và định giờ lật mình, xem … |
| mục 5 | mục 7 | Thẻ khuyết tật làm xong rồi, đến liên hiệp hội khuyết tật cấp huyện hỏi trọn một lần mấy thứ xin được | …hát khí cụ phụ trợ kiểu cơ bản thế nào, xem … |
| mục 6 | phần 6, mục 10 | Đừng tiêu nhiều tiền mua thực phẩm bảo vệ sức khỏe, cao thuốc, đồ tẩm bổ để "điều dưỡng cơ thể" | …phẩm bảo vệ sức khỏe cũng đi đường này, xem … |
| mục 6 | phần 5, mục 29 | Mua hàng mạng tin quy tắc của sàn và điều luật, không tin người phát sóng và "đánh giá tốt" | …a mua hàng mạng và tiêu dùng trả trước, xem … |
| mục 7 | phần 7, mục 8 | Có thẻ khuyết tật thì xin hai khoản trợ cấp cho người khuyết tật | …rợ cấp hộ lý cho người khuyết tật nặng, xem … |
| mục 7 | mục 8 | Con dưới 7 tuổi lại có khuyết tật hay cô độc chứng, đến liên hiệp hội khuyết tật cấp huyện xin cứu trợ phục hồi chức năng | … phục hồi chức năng cho trẻ khuyết tật, xem … |
| mục 7 | mục 9 | Cải tạo ramp, tay vịn và phòng tắm trong nhà, có thể xin trợ cấp lên chính phủ cấp huyện trở lên | …ết bị không chướng ngại trong gia đình, xem … |
| mục 7 | mục 10 | Lúc tìm việc chủ động nói rõ mình có thẻ, doanh nghiệp chiêu bạn được trừ đi một khoản tiền | …iệc làm theo tỷ lệ và dịch vụ việc làm, xem … |
| mục 7 | mục 11 | Thuế thu nhập cá nhân của người khuyết tật có thể giảm thu, giảm bao nhiêu gọi điện hỏi cục thuế tỉnh | … Sáu là giảm thuế thu nhập cá nhân, xem … |
| mục 7 | phần 24, mục 11 | Trị xong thật sự còn chướng ngại chức năng, đến liên hiệp hội người khuyết tật cấp huyện nơi hộ khẩu xin thẻ khuyết tật | … Cách làm tấm thẻ thì xem … |
| mục 8 | mục 6 | Đừng mua liệu pháp và khí cụ "chữa được liệt, mù, điếc" | … Cơ sở hứa "bao khỏi" thì xử lý theo … |
| mục 10 | phần 7, mục 12 | Đăng ký thất nghiệp xong thì tranh thủ được công nhận người khó khăn về việc làm, lấy trợ cấp bảo hiểm xã hội hoặc vị trí việc làm công ích | …hăn việc làm và trợ cấp bảo hiểm xã hội xem … |
| mục 10 | phần 7, mục 13 | Trong thời gian thất nghiệp hãy lĩnh trợ cấp đào tạo nghề, trợ cấp tập sự việc làm và trợ cấp bảo hiểm xã hội, đừng tự trả tiền học lớp | … Trợ cấp đào tạo nghề xem … |
| mục 13 | mục 14 | Con khuyết tật xin nhập học, trường không được từ chối nhận; tới không được trường thì cục giáo dục an bài đưa dạy tới cửa | … học trường không được từ chối nhận thì xem … |
| mục 14 | phần 30, mục 3 | Con bị bắt nạt, ngay hôm đó báo lên trường và yêu cầu xử lý có văn bản, liên quan đánh người, cướp tiền, tung tin đồn trực tiếp báo cảnh sát | … thế nào, trường phải đi quy trình nào, xem … |
| mục 14 | mục 13 | Người khuyết tật thi đại học có thể xin tiện nghi hợp lý, đề dùng chữ mù thời gian thi cộng một nửa | … Tiện nghi hợp lý khi thi đại học xem … |
| mục 16 | phần 24, mục 1 | Bệnh thường khám ở cộng đồng trước, chuyển tuyến từng cấp lên trên, vạch khởi tuyến nằm viện tính nối tiếp | … đầu được bảo hiểm chi trả tính ra sao, xem … |
| mục 16 | mục 7 | Thẻ khuyết tật làm xong rồi, đến liên hiệp hội khuyết tật cấp huyện hỏi trọn một lần mấy thứ xin được | …ồi cộng đồng và cấp phát khí cụ phụ trợ xem … |
| mục 17 | mục 13 | Người khuyết tật thi đại học có thể xin tiện nghi hợp lý, đề dùng chữ mù thời gian thi cộng một nửa | …c có thể được miễn phần nghe ngoại ngữ, xem … |
| mục 17 | mục 15 | Mất chi dưới phải hay cả hai chi dưới cũng thi được bằng lái, loại chuẩn lái gọi C5 | …lực lái xe phải đeo thiết bị trợ thính, xem … |
| mục 18 | mục 19 | Người giám hộ của người lớn định theo thứ tự định pháp; người bị giám hộ làm đau người khác, do người giám hộ đền | … Người giám hộ được định thế nào thì xem … |
| mục 19 | phần 17, mục 1 | Trong lúc người già còn tỉnh táo, chỉ định người giám hộ tương lai bằng văn bản | … cách viết cụ thể xem … |
| mục 20 | phần 19, mục 8 | Trước khi nghỉ việc lưu trước phiếu lương, chấm công, hợp đồng lao động, hồ sơ bảo hiểm xã hội và tin nhắn | … cách lưu chứng và thời hạn xem … |

## 34-thuoc-san-trong-nha-dung-de-uong-thanh-hoa

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Mở đầu phần | phần 13, mục 20 | Uống nhầm chất tẩy rửa, thuốc trừ sâu, thuốc men: trước hết đừng gây nôn, mang theo chai đi viện ngay; bắn vào mắt hay da thì xả nhiều nước sạch 15 phút | …huốc hay chất tẩy rửa trước hết làm gì, xem … |
| Mở đầu phần | phần 16, mục 1 | Uống thuốc đủ theo chỉ định bác sĩ, đừng thấy đỡ là ngừng | …ốc bệnh mạn tính uống đủ theo chỉ định, xem … |
| Mở đầu phần | phần 28, mục 6 | Muốn ăn thuốc giảm cân thì tới bệnh viện lấy đơn, đừng mua ở cửa hàng mạng không cần đơn đã giao hàng | …ê đơn trên mạng phải qua xét đơn trước, xem … |
| mục 2 | phần 20, mục 8 | Em bé chưa đủ 3 tháng sốt tới 38 °C là đi thẳng viện, không theo dõi ở nhà | … Con chưa đủ 3 tháng sốt đi thẳng viện, xem … |
| mục 4 | phần 20, mục 6 | Chưa đủ 1 tuổi không cho ăn mật ong | … chưa đủ 1 tuổi không mớm mật ong được, xem … |
| mục 4 | mục 1 | Trước khi uống cùng lúc hai loại thuốc cảm hay thuốc giảm đau, nhìn bảng thành phần, paracetamol chỉ được chiếm một loại | …mol, lại ăn cùng thuốc hạ sốt là trùng, xem … |
| mục 5 | phần 27, mục 5 | Có yếu tố nguy cơ cao tiền sản giật, sau tuần thai 12 bắt đầu mỗi ngày một viên aspirin liều nhỏ | … Aspirin liều nhỏ phòng tiền sản giật, xem … |

## docs/danh-muc-do-dung-khan-cap-gia-dinh

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Danh mục đồ dùng khẩn cấ | phần 1, mục 26 | Chuẩn bị đủ bình chữa cháy, chăn chữa cháy, mặt nạ thoát hiểm và túi sơ cứu, mỗi năm kiểm tra một lần | …Tương ứng … |
| Danh mục đồ dùng khẩn cấ | phần 1, mục 3 | Lắp máy báo khói; ai mùa đông đốt than hay dùng gas sưởi trong nhà thì lắp thêm máy báo khí CO | …uông báo khí cacbonic chọn lắp thế nào, xem … |
| Danh mục đồ dùng khẩn cấ | phần 1, mục 4 | Ống mềm dẫn gas và bếp gas hết hạn thì thay, không tự sửa đường ống, người công ty gas đến nhà chào hàng có thể từ chối thẳng | … Ống dẫn gas và bếp xem … |
| Danh mục đồ dùng khẩn cấ | phần 13 | 13-tinh-huong-khan-cap (cả phần) | … độc khí cacbonic lúc đó làm gì, đều viết ở … |
| II. Bộ ba phòng cháy | phần 7 | 07-song-khi-khong-co-tien (cả phần) | …ài Thoát hiểm Tránh nạn Đám cháy Kiến trúc, … |
| II. Bộ ba phòng cháy | phần 13, mục 24 | Cháy thì bò sát đất, sờ cửa rồi mới mở, cửa nóng thì đừng mở; đi cầu thang bộ không đi thang máy, ra rồi đừng quay lại | …mở, đi cầu thang không ngồi thang máy), xem … |
| II. Bộ ba phòng cháy | phần 1, mục 3 | Lắp máy báo khói; ai mùa đông đốt than hay dùng gas sưởi trong nhà thì lắp thêm máy báo khí CO | … Chuông báo khói xem … |
| III. Trong túi cấp cứu đ | phần 13, mục 12 | Chảy máu nhiều thì trước hết dùng tay ấn chặt vết thương, tay chân ấn không cầm được thì lên garô, đồng thời gọi 120 | …dùng được, vì sao "đừng nới ra xả máu", xem … |
| III. Trong túi cấp cứu đ | phần 13, mục 14 | Bị bỏng thì lập tức xả nước mát chảy 20 phút, đừng bôi kem đánh răng hay nước tương | …làm một việc, xối nước máy mát 20 phút, xem … |
| III. Trong túi cấp cứu đ | phần 13, mục 15 | Đột nhiên nổi mẩn toàn thân, không thở nổi hoặc chóng mặt — xử lý theo sốc phản vệ, gọi ngay 120 và nói rõ | …Nó là thuốc kê đơn, phải tìm bác sĩ kê, xem … |
| V. Mỗi năm kiểm tra một  | phần 1, mục 3 | Lắp máy báo khói; ai mùa đông đốt than hay dùng gas sưởi trong nhà thì lắp thêm máy báo khí CO | … Pin mỗi năm thay một lần, xem … |
| VI. Không cần mua | phần 13, mục 1 | Có người ngã xuống không thở, lập tức ấn mạnh vào lồng ngực, nhờ người xung quanh gọi 120 (cấp cứu TQ) và tìm AED | … AED ở trường sở công cộng gần nhất về, xem … |
| VI. Không cần mua | phần 5, mục 24 | Không tích trữ vì "giá gạch ngang" và đợt khuyến mãi lớn | …hêm, cuối cùng đa số để tới hết hạn bỏ, xem … |
| VII. Mấy đồ này rốt cuộc | phần 1 | 01-dung-chet-som (cả phần) | …Chứng cứ của mục này yếu hơn các mục khác … |

## docs/gap-nguoi-la-bi-nan-co-nen-dung-lai

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Đường gặp người lạ xảy c | phần 13, mục 2 | Người già té ngã, có người ngã xuống: trước hết ngồi xổm gọi họ, gọi 120, đừng vội dìu người lên; với người lạ thì đi qua cũng hợp pháp, đã dừng lại thì đừng động tay bê người | …Đây là bản bài dài của … |
| Chi phí sau khi dừng lại | phần 19, mục 6 | Công ty giải trừ trái luật, tiền bồi thường gấp đôi chuẩn bồi thường kinh tế | …động vi pháp, tiền bồi thường tính theo 2N (… |
| Chi phí sau khi dừng lại | phần 8, mục 15 | Người thân nói "ai cũng đừng hòng sống yên" "dẫn con đi chung", đừng coi là lời giận: thân nhân gần có thể đưa thẳng đi khám, công an nhận báo cũng phải quản | …lưu chứng cứ thế nào, báo cảnh thế nào, xem … |
| Chi phí sau khi dừng lại | phần 1, mục 25 | Khi trầm cảm hoặc có ý nghĩ tự tử hãy gọi 12356, trong nhà không tích trữ thuốc ngủ và thuốc trừ sâu | … tổng đài viện trợ tâm lý 12356, xem … |
| Hai tình huống để "đi lu | phần 8, mục 1 | Có tai nạn giao thông thì trước hết dừng xe, cứu người, báo cảnh sát, đừng chạy | …o thông và gây tai bỏ chạy làm thế nào, xem … |
| Lúc quyết dừng lại, cách | phần 13, mục 1 | Có người ngã xuống không thở, lập tức ấn mạnh vào lồng ngực, nhờ người xung quanh gọi 120 (cấp cứu TQ) và tìm AED | …ông hô hấp thì dùng sức ấn lồng ngực y, xem … |
| Lúc quyết dừng lại, cách | phần 13, mục 39 | Cứu người mà bị thương, tốn tiền: trước tìm người gây hại và bảo hiểm y tế, rồi đi đăng ký xác nhận hành vi nghĩa cử | … Muốn đòi khoản tiền này lại, xem … |

## docs/lam-nen-tang-can-nhung-giay-phep-gi

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Làm nền tảng cần những g | phần 26 | 26-lam-mot-website-hoac-nen-tang (cả phần) | …Bài dài này tương ứng … |
| Làm nền tảng cần những g | phần 12 | 12-khoi-nghiep-va-lam-an (cả phần) | … Đăng ký công ty, khai thuế thế nào, xem … |
| Làm nền tảng cần những g | phần 11 | 11-lan-san-do-cua-dan-ky-thuat (cả phần) | …uật đi làm thuê đừng đạp những vạch đó, xem … |
| Ba điểm dễ nhầm | phần 12 | 12-khoi-nghiep-va-lam-an (cả phần) | … Mở công ty thế nào xem … |
| II. Nghĩa vụ hàng ngày c | phần 26 | 26-lam-mot-website-hoac-nen-tang (cả phần) | …ược phạt bao nhiêu tiền, viết trong các mục … |
| III. Chọn máy chủ: ba bậ | phần 26, mục 5 | Cho người dùng lên bán đồ, nền tảng phải kiểm nghiệm đăng ký, báo thông tin, lưu ba năm | … Những nghĩa vụ nền tảng … |
| IV. Ranh giới của tài li | phần 26 | 26-lam-mot-website-hoac-nen-tang (cả phần) | …điều khoản viết trên đây, lấy cột Nguồn của … |

## docs/nhip-dong-ho-sinh-hoc-va-ca-dem

| Nơi trích | Cú pháp | Mục trỏ tới | Ngữ cảnh |
| --- | --- | --- | --- |
| Cơ thể nhận giờ thế nào, | phần 2, mục 40 | Càng làm ca đêm lâu nguy cơ tim mạch càng cao, chuyển được ca thì chuyển sớm | …Đây là bản bài dài của … |
| II. Đồng hồ này dựa ánh  | phần 3, mục 2 | Cố định giờ thức dậy, cuối tuần cũng vậy | …Đây cũng là lý do … |
| IX. Bài này không nói | phần 2, mục 40 | Càng làm ca đêm lâu nguy cơ tim mạch càng cao, chuyển được ca thì chuyển sớm | … cao bao nhiêu, theo số năm tính thế nào, ở … |
| IX. Bài này không nói | phần 2, mục 39 | Thức khuya thì đêm hôm sau ngủ bù ngay, đừng dồn tới cuối tuần | …Thức khuya rồi bù giấc về thế nào, ở … |
| IX. Bài này không nói | phần 2, mục 13 | Mỗi đêm ngủ khoảng 7 giờ, giờ giấc cố định | … ngủ bao lâu, tác tức quy luật hay không, ở … |
| IX. Bài này không nói | phần 3, mục 2 | Cố định giờ thức dậy, cuối tuần cũng vậy | …Sáng sớm gặp sáng và cố định giờ dậy, ở … |
