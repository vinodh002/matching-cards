import React from 'react';
import { motion } from 'framer-motion';
import type { CardType } from '../App';

interface CardProps {
  card: CardType;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <motion.div
      className="aspect-[1/1] relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`w-full h-full rounded-lg sm:rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${
          card.isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Back face */}
        <div className="absolute w-full h-full rounded-lg sm:rounded-xl [backface-visibility:hidden]">
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl 
                        flex items-center justify-center shadow-md sm:shadow-lg">
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 sm:border-4 border-white rounded-full opacity-50" />
          </div>
        </div>

        {/* Front face */}
        <div 
          className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] 
                     rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg"
        >
          <img
            src={card.url}
            alt="card"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              card.isMatched ? 'opacity-50' : 'opacity-100'
            }`}
          />
          {card.isMatched && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl">✓</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}