const database = {
    'clara': {
        grade: 1,
        theory: "<h3>Số 1, 2, 3</h3><p>Quan sát hình vẽ: 🍎=1, 🍎🍎=2, 🍎🍎🍎=3</p>",
        exercises: [
            { q: "Có bao nhiêu quả táo trong hình? (🍎🍎)", a: "2" },
            { q: "Số nào lớn nhất: 1, 2 hay 3?", a: "3" }
        ]
    },
    'cris': {
        grade: 3,
        theory: "<h3>Xem đồng hồ</h3><p>Kim dài chỉ số 12 là giờ đúng.</p>",
        exercises: [
            { q: "Gấu có 25 cái bánh, mua thêm 30 cái. Tổng cộng?", a: "55" },
            { q: "Một ngày có bao nhiêu giờ?", a: "24" }
        ]
    },
    'simon': {
        grade: 4,
        theory: "<h3>Tổng và Hiệu</h3><p>Dùng sơ đồ đoạn thẳng để giải.</p>",
        exercises: [
            { q: "Tổng 2 số là 50, hiệu là 10. Số lớn?", a: "30" }
        ]
    },
    'toro': {
        grade: 5,
        theory: "<h3>Tỉ số phần trăm</h3><p>Dạng toán thực tế đi chợ.</p>",
        exercises: [
            { q: "Nhà thầu giảm giá 2.5% cho ngôi nhà 360 triệu. Số tiền giảm?", a: "9" }
        ]
    }
};

let currentId = null;
let timer;
let mistakes = JSON.parse(localStorage.getItem('mistakes')) || {};

function selectUser(id) {
    currentId = id;
    document.getElementById('main-dashboard').style.display = 'none';
    document.getElementById('learning-zone').style.display = 'block';
    document.getElementById('user-title').innerText = "Khu vực của " + id.toUpperCase();
    loadContent('theory');
}

function loadContent(type) {
    const display = document.getElementById('content-display');
    const data = database[currentId];
    clearInterval(timer);

    if (type === 'theory') {
        display.innerHTML = data.theory;
    } else if (type === 'exercise') {
        const ex = data.exercises[Math.floor(Math.random() * data.exercises.length)];
        display.innerHTML = `<h3>${ex.q}</h3><input type="text" id="ans" class="ipad-input">
                             <button class="btn-topic" onclick="checkAnswer('${ex.a}', '${ex.q}')">Nộp bài</button>`;
        
        // Tính năng Clara: Tự động đọc [11]
        if (currentId === 'clara') {
            const speech = new SpeechSynthesisUtterance(ex.q);
            speech.lang = 'vi-VN';
            window.speechSynthesis.speak(speech);
        } else {
            startTimer(); // Bộ đếm giờ cho các bé lớn [History]
        }
    } else if (type === 'mistakes') {
        const userMistakes = mistakes[currentId] || [];
        display.innerHTML = userMistakes.length ? `<ul>${userMistakes.map(m => `<li>${m}</li>`).join('')}</ul>` : "Con chưa có câu sai nào. Giỏi quá!";
    }
}

function startTimer() {
    let seconds = 30;
    timer = setInterval(() => {
        document.getElementById('timer-display').innerText = seconds + "s";
        if (seconds <= 0) {
            clearInterval(timer);
            alert("Hết giờ! Con sẽ bị trừ 10% điểm hoàn thành nhé.");
        }
        seconds--;
    }, 1000);
}

function checkAnswer(correct, question) {
    const userAns = document.getElementById('ans').value;
    if (userAns === correct) {
        alert("Chính xác! 🎉");
    } else {
        alert("Tiếc quá, con làm lại nhé!");
        if (!mistakes[currentId]) mistakes[currentId] = [];
        mistakes[currentId].push(question);
        localStorage.setItem('mistakes', JSON.stringify(mistakes));
    }
    loadContent('exercise');
}

function goHome() {
    location.reload();
}
