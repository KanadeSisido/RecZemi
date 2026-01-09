'use client';

import { motion } from 'motion/react';

interface CupButtonProps {
  count: number;
  onClick: () => void;
}

export default function CupButton({ count, onClick }: CupButtonProps) {
  return (
    <motion.button
      className="relative bg-white rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* コップアイコン */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="#F06060"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6 L10 26 L22 26 L24 6 Z" />
        <line x1="6" y1="6" x2="26" y2="6" />
      </svg>

      {/* カウントバッジ */}
      {count > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-[#F06060] rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <span className="text-xs font-bold text-white">{count}</span>
        </motion.div>
      )}
    </motion.button>
  );
}
