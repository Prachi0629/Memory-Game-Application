let startTime;
let moves = 0;



let username = "";
let emojis = ['🐶','🐱','🐰','🦁','🐯','🐼','🐵','🐸'];
emojis = [...emojis, ...emojis];
let flippedCards = [];
let matchedCount = 0;
let score = 0;

// Prompt for username
window.onload = () => {
    username = prompt("Enter your name:");
    if (!username) username = "Player";
    startGame();
    fetchLeaderboard();
};

function startGame() {
    matchedCount = 0;
    score = 0;
    moves = 0;
    flippedCards = [];
    startTime = Date.now();

    const container = document.querySelector('.game-container');
    container.innerHTML = ''; // clear existing cards

    let shuffled = emojis.sort(() => Math.random() - 0.5);
    shuffled.forEach((emoji, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        container.appendChild(card);
    });
}


function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

function checkMatch() {
    moves++; // One pair attempt done

    let [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        score += 10;

        if (matchedCount === emojis.length) {
            endGame();
        }
    } else {
        card1.classList.remove('flipped');
        card1.textContent = '';
        card2.classList.remove('flipped');
        card2.textContent = '';
    }
    flippedCards = [];
}


document.getElementById('resetBtn').addEventListener('click', () => {
    // Reset all game state variables
    matchedCount = 0;
    score = 0;
    moves = 0;
    flippedCards = [];
    startTime = Date.now();

    // Hide congrats popup if visible
    document.getElementById('congratsPopup').classList.add('hidden');

    // Restart the game board
    startGame();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    // Hide popup if showing
    document.getElementById('congratsPopup').classList.add('hidden');

    // Restart the game
    startGame();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('congratsPopup').classList.add('hidden');
    stopConfetti();
    startGame();
});





function endGame() {
    saveScore();
    showCongrats();
}

function saveScore() {
    let time_taken = Math.floor((Date.now() - startTime) / 1000); // time in seconds
    fetch('/add-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, score, moves, time_taken })
    }).then(fetchLeaderboard);
}


function fetchLeaderboard() {
    fetch('/leaderboard')
        .then(res => res.json())
        .then(data => {
            const body = document.getElementById('leaderboardBody');
            body.innerHTML = '';
            data.forEach((row, index) => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${row.username}</td>
                    <td>${row.score}</td>
                    <td>${row.moves}</td>
                    <td>${row.time_taken}</td>
                `;
                body.appendChild(tr);
            });
        });
}


function showCongrats() {
    const popup = document.getElementById('congratsPopup');
    popup.classList.remove('hidden');
    startConfetti();
    // Keep confetti animation for 5 seconds
    setTimeout(() => {
        popup.classList.add('hidden');
        stopConfetti();
    }, 5000);
}


// 🎉 Confetti Animation
let confettiCanvas = document.getElementById('confettiCanvas');
let ctx = confettiCanvas.getContext('2d');
let confettiPieces = [];

function startConfetti() {
    confettiPieces = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        size: Math.random() * 8 + 4,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        speed: Math.random() * 3 + 2
    }));
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(p => {
        p.y += p.speed;
        if (p.y > window.innerHeight) p.y = -10;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    confettiPieces = [];
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});


window.onload = () => {
    username = prompt("Enter your name:");
    if (!username) username = "Player";
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    startGame();
    fetchLeaderboard();
};
