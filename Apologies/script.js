/**
 * ============================================
 * Script untuk Kartu Ucapan Idul Fitri
 * ============================================
 */

// ===== EDIT PESAN DI SINI =====
// Ganti teks di bawah ini sesuai keinginan kamu
const MESSAGE = `Hai bubuuu... 🤍

duduu tahu… selama ini duduu sering banget bikin bubu kesel, dan yang duduu lakukan cuma minta maaf lagi dan lagi. maafin duduu yaa, karena sering nggak bisa ada buat bubu,bahkan saat bubu udah ada di dekat duduu.

duduu juga sadar… duduu masih kurang peka, padahal bubu udah berkali-kali kasih tahu. tapi entah kenapa duduu masih sering gagal ngertiin bubu dengan baik. maafin duduu yaa kalau selama ini lebih banyak kurangnya daripada cukupnya.

mungkin tanpa duduu sadar, duduu pernah nyakitin bubu, bikin bubu nangis, bahkan bikin bubu kecewa. duduu tahu duduu nggak sempurna… dan sering lupa jadi yang terbaik buat bubu.

tapi satu hal yang duduu yakin, duduu sayang bubu… sangat sayang. lebih dari yang bisa duduu jelasin dengan kata-kata.

di hari yang suci ini, di Idul Fitri, duduu minta maaf lahir dan batin yaa bubu 🤍 untuk semua salah duduu, yang disengaja maupun tidak, untuk semua janji yang belum duduu tepati, dan untuk waktu yang seharusnya bisa duduu kasih lebih banyak ke bubu.

semoga bubu tetap mau bertahan sama duduu… karena duduu masih ingin belajar jadi yang lebih baik, buat bubu, untuk kita 🤍 🌙✨`;
// ===== AKHIR EDIT PESAN =====

// ===== KONFIGURASI =====
const TYPING_SPEED = 35; // Kecepatan mengetik (ms per karakter)
const FLOATING_ITEMS = ['🎋', '⭐', '✨', '🌙', '💫', '🕌', '☪️', '🤍']; // Ornamen melayang

// ===== DOM ELEMENTS =====
const openBtn = document.getElementById('openBtn');
const openingScreen = document.getElementById('opening');
const messageScreen = document.getElementById('message');
const messageText = document.getElementById('messageText');
const cursor = document.getElementById('cursor');
const cardFooter = document.getElementById('cardFooter');
const replayBtn = document.getElementById('replayBtn');
const backBtn = document.getElementById('backBtn');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// ===== STATE =====
let isTyping = false;
let typingTimeout = null;
let musicPlaying = false;

// ===== INITIALIZATION =====
function init() {
    setupCanvas();
    createFloatingElements('floatingElements');
    createFloatingElements('floatingElements2');
    setupEventListeners();
}

function setupCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
}

function setupEventListeners() {
    openBtn.addEventListener('click', openMessage);
    replayBtn.addEventListener('click', replayMessage);
    backBtn.addEventListener('click', goBack);
    musicBtn.addEventListener('click', toggleMusic);
}

// ===== FLOATING ELEMENTS =====
function createFloatingElements(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createSingleFloat(container), i * 800);
    }

    // Continuously add new ones
    setInterval(() => createSingleFloat(container), 2000);
}

function createSingleFloat(container) {
    const item = document.createElement('div');
    item.className = 'float-item';
    const emoji = FLOATING_ITEMS[Math.floor(Math.random() * FLOATING_ITEMS.length)];
    item.textContent = emoji;

    // Random positioning
    item.style.left = Math.random() * 100 + '%';
    item.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
    item.style.animationDuration = (12 + Math.random() * 18) + 's';
    item.style.animationDelay = Math.random() * 2 + 's';
    item.style.opacity = 0.05 + Math.random() * 0.15;

    container.appendChild(item);

    // Remove after animation
    const duration = parseFloat(item.style.animationDuration) * 1000 + 2000;
    setTimeout(() => {
        if (item.parentNode) item.parentNode.removeChild(item);
    }, duration);
}

// ===== SCREEN TRANSITIONS =====
function openMessage() {
    // Add button click animation
    openBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        openBtn.style.transform = '';

        // Transition screens
        openingScreen.classList.remove('active');
        setTimeout(() => {
            messageScreen.classList.add('active');
            startTyping();
        }, 400);
    }, 200);
}

function goBack() {
    stopTyping();
    messageScreen.classList.remove('active');
    setTimeout(() => {
        openingScreen.classList.add('active');
        // Reset message state
        messageText.textContent = '';
        cardFooter.style.opacity = '0';
        backBtn.style.opacity = '0';
        cursor.style.display = 'inline';
    }, 400);
}

// ===== TYPEWRITER EFFECT =====
function startTyping() {
    if (isTyping) return;
    isTyping = true;
    messageText.textContent = '';
    cursor.style.display = 'inline';
    cardFooter.style.opacity = '0';
    backBtn.style.opacity = '0';

    let i = 0;
    function type() {
        if (i < MESSAGE.length && isTyping) {
            // Handle newlines
            if (MESSAGE.charAt(i) === '\n') {
                messageText.innerHTML += '<br>';
            } else {
                messageText.innerHTML += MESSAGE.charAt(i);
            }
            i++;

            // Variable speed for natural feel
            let speed = TYPING_SPEED;
            const char = MESSAGE.charAt(i - 1);
            if (char === '.' || char === '!' || char === '?') speed = TYPING_SPEED * 6;
            else if (char === ',') speed = TYPING_SPEED * 3;
            else if (char === '\n') speed = TYPING_SPEED * 4;

            // Auto-scroll the message container
            const msgContainer = messageScreen;
            if (msgContainer.scrollHeight > msgContainer.clientHeight) {
                msgContainer.scrollTop = msgContainer.scrollHeight;
            }

            typingTimeout = setTimeout(type, speed);
        } else if (isTyping) {
            // Typing complete
            finishTyping();
        }
    }
    type();
}

function stopTyping() {
    isTyping = false;
    if (typingTimeout) clearTimeout(typingTimeout);
}

function finishTyping() {
    isTyping = false;
    cursor.style.display = 'none';

    // Show footer with fade-in
    setTimeout(() => {
        cardFooter.style.opacity = '1';
        backBtn.style.opacity = '1';
    }, 300);

    // Launch confetti & sparkles!
    launchConfetti();
    createSparkles();
}

function replayMessage() {
    stopTyping();
    messageText.textContent = '';
    cardFooter.style.opacity = '0';
    backBtn.style.opacity = '0';
    cursor.style.display = 'inline';
    // Scroll to top
    messageScreen.scrollTop = 0;
    setTimeout(() => startTyping(), 500);
}

// ===== CONFETTI SYSTEM =====
class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.w = 6 + Math.random() * 8;
        this.h = 4 + Math.random() * 6;
        this.speed = 1.5 + Math.random() * 3;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.15;
        this.drift = (Math.random() - 0.5) * 1;
        this.opacity = 0.7 + Math.random() * 0.3;

        // Lebaran-themed colors
        const colors = [
            '#d4af37', // Gold
            '#f0d060', // Light gold
            '#2d8f5e', // Green
            '#ffffff', // White
            '#b8860b', // Dark gold
            '#1a6b42', // Dark green
            '#ffd700', // Bright gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speed;
        this.x += this.drift + Math.sin(this.angle) * 0.5;
        this.angle += this.spin;
        this.opacity -= 0.002;
        return this.y < confettiCanvas.height && this.opacity > 0;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }
}

let confettiPieces = [];
let confettiRunning = false;

function launchConfetti() {
    confettiPieces = [];
    confettiRunning = true;

    // Add pieces in waves
    let wave = 0;
    const waveInterval = setInterval(() => {
        for (let i = 0; i < 30; i++) {
            confettiPieces.push(new Confetti());
        }
        wave++;
        if (wave >= 5) clearInterval(waveInterval);
    }, 400);

    animateConfetti();
}

function animateConfetti() {
    if (!confettiRunning) return;

    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces = confettiPieces.filter(piece => {
        const alive = piece.update();
        if (alive) piece.draw();
        return alive;
    });

    if (confettiPieces.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiRunning = false;
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// ===== SPARKLE EFFECTS =====
function createSparkles() {
    const sparkleCount = 25;
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = (10 + Math.random() * 80) + 'vw';
            sparkle.style.top = (10 + Math.random() * 80) + 'vh';
            sparkle.style.width = (2 + Math.random() * 6) + 'px';
            sparkle.style.height = sparkle.style.width;
            sparkle.style.background = Math.random() > 0.5 ? '#d4af37' : '#f0d060';
            sparkle.style.boxShadow = `0 0 ${4 + Math.random() * 8}px ${sparkle.style.background}`;
            document.body.appendChild(sparkle);

            setTimeout(() => {
                if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
            }, 1500);
        }, i * 100);
    }
}

// ===== MUSIC CONTROL =====
function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicPlaying = false;
    } else {
        bgMusic.volume = 0.3;
        bgMusic.play().then(() => {
            musicBtn.classList.add('playing');
            musicPlaying = true;
        }).catch(err => {
            console.log('Autoplay blocked:', err);
            // Try playing on next user interaction
        });
    }
}

// ===== TOUCH SPARKLE EFFECT =====
document.addEventListener('click', (e) => {
    // Don't create sparkles on button clicks
    if (e.target.closest('button')) return;

    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
        sparkle.style.top = (e.clientY + (Math.random() - 0.5) * 40) + 'px';
        sparkle.style.width = (2 + Math.random() * 4) + 'px';
        sparkle.style.height = sparkle.style.width;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
        }, 1500);
    }
});

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
