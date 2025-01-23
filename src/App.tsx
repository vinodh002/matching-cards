import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Trophy } from 'lucide-react';
import { Card } from './components/Card';
import { GameOver } from './components/GameOver';
import { ScoreBoard } from './components/ScoreBoard';
import { Footer } from './components/Footer';
import { shuffleArray } from './utils';

export type CardType = {
  id: number;
  imageId: string;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
};

function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newCards: CardType[] = [];
    const totalPairs = 6;
    
    for (let i = 0; i < totalPairs; i++) {
      const imageId = `image-${i}`;
      const url = `https://picsum.photos/200/300?random=${i}`;
      
      newCards.push({
        id: i * 2,
        imageId,
        url,
        isFlipped: false,
        isMatched: false,
      });
      newCards.push({
        id: i * 2 + 1,
        imageId,
        url,
        isFlipped: false,
        isMatched: false,
      });
    }

    setCards(shuffleArray(newCards));
    setMoves(0);
    setScore(0);
    setIsGameOver(false);
    setFlippedCards([]);
  };

  const handleCardClick = (clickedCard: CardType) => {
    if (clickedCard.isMatched || clickedCard.isFlipped || flippedCards.length === 2) return;

    const updatedCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);

      if (newFlippedCards[0].imageId === newFlippedCards[1].imageId) {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.imageId === newFlippedCards[0].imageId
              ? { ...card, isMatched: true }
              : card
          ));
          setScore(prev => prev + 10);
          setFlippedCards([]);

          if (updatedCards.every(card => card.isMatched)) {
            const finalScore = score + 10;
            if (finalScore > bestScore) {
              setBestScore(finalScore);
              localStorage.setItem('bestScore', finalScore.toString());
            }
            setIsGameOver(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            newFlippedCards.find(fc => fc.id === card.id)
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-4 sm:p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            Memory Game
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          </h1>
          <ScoreBoard moves={moves} score={score} bestScore={bestScore} />
          <button
            onClick={initializeGame}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg 
                     transition-all duration-200 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Game
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        <GameOver
          isOpen={isGameOver}
          score={score}
          moves={moves}
          onRestart={initializeGame}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;