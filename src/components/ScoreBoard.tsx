import React from 'react';
import { Medal, Move, Trophy } from 'lucide-react';

interface ScoreBoardProps {
  moves: number;
  score: number;
  bestScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ moves, score, bestScore }) => {
  return (
    <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-white">
        <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <Move className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Moves:</span>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{moves}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-white">
        <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <Medal className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Score:</span>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{score}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-white">
        <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Best:</span>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{bestScore}</p>
      </div>
    </div>
  );
}