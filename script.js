const database = {
    'clara': {
        name: 'Clara', grade: 1, 
        theory: "<h3>🌟 Học đếm và So sánh (Phạm vi 10)</h3><p>Sử dụng ngón tay và vật thật để đếm. Số đứng sau luôn lớn hơn số đứng trước.</p>",
        exercises: [
            { q: "Có bao nhiêu chú voi? (🐘)", a: "1" },
            { q: "Bé đếm xem có mấy quả táo? (🍎🍎🍎)", a: "3" },
            { q: "Số nào lớn nhất: 1, 5 hay 2?", a: "5" },
            { q: "Điền số tiếp theo vào dãy: 1, 2, 3, ...", a: "4" },
            // ... Bạn sẽ copy thêm 16 câu từ AI vào đây theo hướng dẫn dưới ...
        ],
        autoRead: true, hasTimer: false
    },
    'cris': {
        name: 'Cris', grade: 3,
        theory: "<h3>⏰ Xem giờ và Tính toán nhiều bước</h3><p>Ghi nhớ bảng cửu chương và quy tắc kim đồng hồ chỉ số 12 là giờ đúng.</p>",
        exercises: [
            { q: "Kim ngắn chỉ số 9, kim dài chỉ số 12 là mấy giờ?", a: "9" },
            { q: "Mỗi bạn có 5 cái kẹo, 4 bạn có bao nhiêu cái?", a: "20" },
            { q: "Gấu có 40 kẹo chia đều cho 10 bạn, mỗi bạn được mấy cái?", a: "4" },
            { q: "Một ngày có bao nhiêu giờ?", a: "24" },
            // ... Copy thêm 16 câu từ AI ...
        ],
        autoRead: false, hasTimer: true, timeLimit: 45
    },
    'simon': {
        name: 'Simon', grade: 4,
        theory: "<h3>📊 Toán Tổng - Hiệu & Sơ đồ đoạn thẳng</h3><p>Công thức: Số lớn = (Tổng + Hiệu) : 2. Luôn vẽ sơ đồ trước khi giải.</p>",
        exercises: [
            { q: "Tổng 2 số là 50, hiệu là 10. Tìm số lớn?", a: "30" },
            { q: "Simon có 15 bi, nhiều hơn Cris 5 viên. Cris có mấy viên?", a: "10" },
            { q: "Số bé nhất có 5 chữ số?", a: "10000" },
            { q: "Tính nhanh: (25 + 75) x 4?", a: "400" },
            // ... Copy thêm 16 câu từ AI ...
        ],
        autoRead: false, hasTimer: true, timeLimit: 30
    },
    'toro': {
        name: 'Toro', grade: 5,
        theory: "<h3>📈 Tỉ số % và Toán Chuyển động</h3><p>Vận tốc = Quãng đường : Thời gian. Tỉ số % = (Giá trị : Tổng) x 100.</p>",
        exercises: [
            { q: "Giảm 10% cho món đồ 200k. Số tiền giảm là bao nhiêu? (k)", a: "20" },
            { q: "Đi 120km trong 2 giờ, vận tốc là bao nhiêu? (km/h)", a: "60" },
            { q: "Diện tích tam giác đáy 10m, cao 5m?", a: "25" },
            { q: "360 triệu giảm giá 2,5% thì giảm bao nhiêu triệu?", a: "9" },
            // ... Copy thêm 16 câu từ AI ...
        ],
        autoRead: false, hasTimer: true, timeLimit: 20
    }
};
