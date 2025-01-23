import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw } from 'lucide-react';

interface GameOverProps {
  isOpen: boolean;
  score: number;
  moves: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ isOpen, score, moves, onRestart }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-6">You've completed the game!</p>
            
            <div className="space-y-2 mb-8">
              <p className="text-gray-700">
                Final Score: <span className="font-bold text-indigo-600">{score}</span>
              </p>
              <p className="text-gray-700">
                Moves Made: <span className="font-bold text-indigo-600">{moves}</span>
              </p>
            </div>

            <button
              onClick={onRestart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg
                       transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}