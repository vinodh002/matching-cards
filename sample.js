const memoryGame = document.querySelector('.memory-game');
const gameOver = document.querySelector('.game-over');
let images = [];
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Fetch random images from Lorem Picsum
async function fetchImages() {
  const categories = ['nature', 'tech', 'architecture']; // Categories for variety
  images = [];

  categories.forEach((category, index) => {
    for (let i = 0; i < 2; i++) { // Add 2 unique images per category
      images.push({ id: `${category}-${i}`, url: `https://picsum.photos/200/300?random=${index * 10 + i}` });
    }
  });

  images = [...images, ...images]; // Duplicate for pairs
  shuffleImages();
}

// Shuffle images
function shuffleImages() {
  images = images.sort(() => Math.random() - 0.5);
  renderCards();
}

// Render cards dynamically
function renderCards() {
  memoryGame.innerHTML = '';
  images.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.framework = img.id;

    card.innerHTML = `
      <img class="front-face" src="${img.url}" alt="${img.id}" />
      <div class="back-face"></div>
    `;

    memoryGame.appendChild(card);
  });

  cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => card.addEventListener('click', flipCard));
  resetBoard();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
  checkWinCondition();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkWinCondition() {
  // Check if all cards are flipped
  if ([...cards].every(card => card.classList.contains('flip'))) {
    setTimeout(() => {
      gameOver.classList.remove('hidden'); // Show the "game over" modal
      gameOver.style.display = 'block';   // Ensure modal is visible
    }, 500);
  }
}

function restartGame() {
  gameOver.classList.add('hidden');
  gameOver.style.display = 'none';
  fetchImages(); // Restart game by fetching images again
}

// Initialize game
fetchImages();
