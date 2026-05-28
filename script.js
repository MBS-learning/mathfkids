const database = {
    'clara': {
        name: 'Clara', grade: 1, 
        theory: "<h3>Số 1, 2, 3</h3><p>Hãy đếm cùng AI nhé: 🐘=1 (Một), 🦋🦋=2 (Hai), 🍎🍎🍎=3 (Ba).</p><p>Trực quan: Ngón tay đưa lên tương ứng với số vật vật [12].</p>",
        exercises: [
            { q: "Có bao nhiêu chú voi trong hình? (🐘)", a: "1" },
            { q: "Bé đếm xem có mấy quả táo? (🍎🍎🍎)", a: "3" },
            { q: "Số nào đứng sau số 1?", a: "2" }
        ],
        autoRead: true, hasTimer: false
    },
    'cris': {
        name: 'Cris', grade: 3,
        theory: "<h3>Xem đồng hồ đúng</h3><p>Khi kim dài chỉ số 12, đó là giờ đúng. Kim ngắn chỉ số mấy thì là bấy nhiêu giờ [14].</p>",
        exercises: [
            { q: "Kim ngắn chỉ số 9, kim dài chỉ số 12 là mấy giờ?", a: "9" },
            { q: "Gấu có 25 cái bánh, mua thêm 30 cái. Tổng cộng có bao nhiêu? [15]", a: "55" },
            { q: "Một ngày có bao nhiêu giờ?", a: "24" }
        ],
        autoRead: false, hasTimer: true, timeLimit: 45
    },
    'simon': {
        name: 'Simon', grade: 4,
        theory: "<h3>Toán Tổng - Hiệu</h3><p>Sử dụng sơ đồ đoạn thẳng: Số lớn = (Tổng + Hiệu) : 2. Vẽ sơ đồ giúp con nhìn rõ bài toán hơn [16].</p>",
        exercises: [
            { q: "Tổng 2 số là 50, hiệu là 10. Tìm số lớn?", a: "30" },
            { q: "Số bé nhất có 5 chữ số là số nào?", a: "10000" },
            { q: "Tính (25 + 75) x 4?", a: "400" }
        ],
        autoRead: false, hasTimer: true, timeLimit: 30
    },
    'toro': {
        name: 'Toro', grade: 5,
        theory: "<h3>Tỉ số phần trăm</h3><p>Tìm x% của A: Lấy A nhân với x rồi chia cho 100. Ví dụ: giảm 2,5% của 360 triệu là giảm 9 triệu [13].</p>",
        exercises: [
            { q: "Giảm giá 10% cho món đồ 200k. Số tiền giảm là bao nhiêu? (k)", a: "20" },
            { q: "Vận tốc đi 120km trong 2 giờ là bao nhiêu? (km/h)", a: "60" },
            { q: "Diện tích tam giác có đáy 10m, cao 5m là bao nhiêu?", a: "25" }
        ],
        autoRead: false, hasTimer: true, timeLimit: 20
    }
};

let currentId = null;
let timer;
let mistakes = JSON.parse(localStorage.getItem('mistakes')) || {};

function selectUser(id) {
    currentId = id;
    document.getElementById('main-dashboard').style.display = 'none';
    document.getElementById('learning-zone').style.display = 'block';
    document.getElementById('user-title').innerText = "Chào mừng " + database[id].name + "!";
    loadContent('theory');
}

function loadContent(type) {
    const display = document.getElementById('content-display');
    const data = database[currentId];
    clearInterval(timer);
    document.getElementById('timer-display').innerText = "--";

    if (type === 'theory') {
        display.innerHTML = data.theory;
    } else if (type === 'exercise') {
        const ex = data.exercises[Math.floor(Math.random() * data.exercises.length)];
        display.innerHTML = `<h3>${ex.q}</h3>
                             <input type="text" id="ans" class="ipad-input" placeholder="Nhập đáp án...">
                             <br><button class="btn-action" onclick="checkAnswer('${ex.a}', '${ex.q}')">Nộp bài</button>`;
        if (data.autoRead) {
            const speech = new SpeechSynthesisUtterance(ex.q);
            speech.lang = 'vi-VN';
            window.speechSynthesis.speak(speech);
        }
        if (data.hasTimer) startTimer(data.timeLimit);
    } else if (type === 'mistakes') {
        const userMistakes = mistakes[currentId] || [];
        display.innerHTML = userMistakes.length ? 
            `<h4>Câu cần luyện lại:</h4><ul>${userMistakes.map(m => `<li>${m}</li>`).join('')}</ul>` : 
            "<p>Con chưa có câu sai nào. Rất giỏi! 🎉</p>";
    }
}

function startTimer(limit) {
    let seconds = limit;
    timer = setInterval(() => {
        document.getElementById('timer-display').innerText = seconds + "s";
        if (seconds <= 0) {
            clearInterval(timer);
            alert("Hết giờ! Con làm tiếp vẫn được nhưng sẽ bị trừ 10% điểm nhé.");
        }
        seconds--;
    }, 1000);
}

function checkAnswer(correct, question) {
    const userAns = document.getElementById('ans').value;
    if (userAns === correct) {
        alert("Chính xác! 🎉");
    } else {
        alert("Chưa đúng rồi! Câu này sẽ vào Ngân hàng lỗi sai nhé.");
        if (!mistakes[currentId]) mistakes[currentId] = [];
        if (!mistakes[currentId].includes(question)) mistakes[currentId].push(question);
        localStorage.setItem('mistakes', JSON.stringify(mistakes));
    }
    loadContent('exercise');
}

function goHome() { location.reload(); }
