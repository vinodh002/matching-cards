// const cards = document.querySelectorAll('.memory-card');

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

// function flipCard() {
//   if (lockBoard) return;
//   if (this === firstCard) return;

//   this.classList.add('flip');

//   if (!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;

//     return;
//   }

//   secondCard = this;
//   checkForMatch();
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

//   isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);

//   resetBoard();
// }

// function unflipCards() {
//   lockBoard = true;

//   setTimeout(() => {
//     firstCard.classList.remove('flip');
//     secondCard.classList.remove('flip');

//     resetBoard();
//   }, 1500);
// }

// function resetBoard() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
// }

// (function shuffle() {
//   cards.forEach(card => {
//     let randomPos = Math.floor(Math.random() * 12);
//     card.style.order = randomPos;
//   });
// })();

// cards.forEach(card => card.addEventListener('click', flipCard));


const memoryGame = document.querySelector('.memory-game');
const gameOver = document.querySelector('.game-over');
let images = [];
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Fetch random images from Lorem Picsum
async function fetchImages() {
  const categories = ['animals', 'cars', 'bikes']; // Example categories for variety
  images = [];

  // Generate random images for each category
  categories.forEach((category, index) => {
    for (let i = 0; i < 2; i++) { // Add 2 images per category
      images.push({ id: `${category}-${i}-${index}`, url: `https://picsum.photos/200/300?random=${index * 10 + i}` });
    }
  });

  images = [...images, ...images]; // Duplicate images for pairs
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
  images.forEach((img, index) => {
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
  if ([...cards].every(card => card.classList.contains('flip'))) {
    setTimeout(() => {
      gameOver.classList.remove('hidden');
    }, 500);
  }
}

function restartGame() {
  gameOver.classList.add('hidden');
  fetchImages();
}

// Initialize game
fetchImages();