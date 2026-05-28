const kids = {
    'clara': { name: 'Clara', grade: 1, timer: false, mistakes: [], progress: 0 },
    'cris': { name: 'Cris', grade: 3, timer: true, timeLimit: 60, mistakes: [], progress: 0 },
    'simon': { name: 'Simon', grade: 4, timer: true, timeLimit: 45, mistakes: [], progress: 0 },
    'toro': { name: 'Toro', grade: 5, timer: true, timeLimit: 30, mistakes: [], progress: 0 }
};

let currentUser = null;
let timerId = null;

// Khởi tạo khu vực của từng bé
function initUser(id) {
    currentUser = kids[id];
    document.querySelector('.dashboard').style.display = 'none';
    document.getElementById('learning-zone').style.display = 'block';
    document.getElementById('welcome-msg').innerText = `Khu rừng Toán học của ${currentUser.name}`;
    showSection('theory');
}

// Chuyển đổi giữa các mục: Lý thuyết, Bài tập, Lỗi sai
function showSection(sectionId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'exercise') {
        startMiniGame();
    } else if (sectionId === 'theory') {
        loadTheory();
    }
}

// Tính năng 1: Lý thuyết trực quan với hình ảnh (Canva AI) [7]
function loadTheory() {
    const theoryDiv = document.getElementById('theory');
    let content = "";
    if (currentUser.grade === 1) {
        content = `<img src="images/grade1_numbers.jpg" style="width:100%">
                   <p>Hôm nay chúng mình học đếm số qua hình ảnh bông hoa nhé!</p>`;
    }
    // (Bổ sung tương tự cho lớp 3, 4, 5 dựa trên GDPT 2018) [8]
    theoryDiv.innerHTML = content;
}

// Tính năng 2: Mini Game Bài tập tự AI tạo ra [9, 10]
function startMiniGame() {
    const exDiv = document.getElementById('exercise');
    const question = "Có 5 quả táo, Simon cho Cris 2 quả. Hỏi Simon còn mấy quả?"; // Giả lập AI sinh ra [11]
    
    // Feature: Tự động đọc cho Clara [5]
    if (!currentUser.timer) {
        const speech = new SpeechSynthesisUtterance(question);
        speech.lang = 'vi-VN';
        window.speechSynthesis.speak(speech);
    }

    // Feature: Bộ đếm giờ & Quy tắc trừ 10% cho các bé lớn [History]
    if (currentUser.timer) {
        let timeLeft = currentUser.timeLimit;
        clearInterval(timerId);
        timerId = setInterval(() => {
            document.getElementById('timer-display').innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerId);
                alert("Hết giờ! Con làm tiếp sẽ bị trừ 10% tiến độ nhé.");
                currentUser.progress -= 10; 
            }
            timeLeft--;
        }, 1000);
    }

    exDiv.innerHTML = `<h3>${question}</h3>
                       <input type="number" id="ans">
                       <button onclick="checkAnswer()">Nộp bài</button>`;
}

function checkAnswer() {
    clearInterval(timerId);
    const userAns = document.getElementById('ans').value;
    if (userAns == "3") {
        alert("Tuyệt vời! Con đã làm đúng.");
        currentUser.progress += 20;
    } else {
        alert("Chưa đúng rồi, câu này sẽ được đưa vào Ngân hàng lỗi sai nhé!");
        currentUser.mistakes.push("Lỗi phép trừ cơ bản");
    }
    backToDashboard();
}

function backToDashboard() {
    document.querySelector('.dashboard').style.display = 'flex';
    document.getElementById('learning-zone').style.display = 'none';
    clearInterval(timerId);
    // Lưu LocalStorage tại đây để giữ lịch sử [History]
}