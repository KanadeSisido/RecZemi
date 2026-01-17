'use client';

import { motion } from 'motion/react';
import { Drink } from '../types/drink';

interface DrinkCardProps {
  drink: Drink;
  isSelected: boolean;
  onToggle: (drink: Drink) => void;
}

export default function DrinkCard({ drink, isSelected, onToggle }: DrinkCardProps) {
  return (
    <motion.div
      className={`
        relative bg-white rounded-xl p-4 min-h-[100px]
        shadow-[0_2px_8px_rgba(0,0,0,0.08)]
        noto-sans-jp-400
        ${isSelected ? 'border-2 border-[#F06060]' : 'border border-gray-100'}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* ドリンク名 */}
      <h3 className="text-sm font-medium text-gray-800 pr-8">{drink.title}</h3>

      {/* 選択時のチェックマーク */}
      {isSelected && (
        <motion.div
          className="absolute -top-2 -right-2 w-5 h-5 bg-[#F06060] rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2,6 5,9 10,3" />
          </svg>
        </motion.div>
      )}

      {/* +/- ボタン（左上と右下が丸い、端まで届くデザイン） */}
      <button
        className={`
          absolute bottom-0 right-0 w-10 h-10
          flex items-center justify-center text-lg font-medium
          transition-colors duration-200
          ${isSelected
            ? 'bg-[#F06060] text-white rounded-tl-[9px] rounded-br-[9px]'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 rounded-tl-[9px] rounded-br-[9px]'
          }
        `}
        onClick={() => onToggle(drink)}
      >
        {isSelected ? '−' : '+'}
      </button>
    </motion.div>
  );
}
