'use client';

import { motion } from 'motion/react';

interface DripButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function DripButton({ onClick, disabled = false }: DripButtonProps) {
  return (
    <motion.button
      className={`
        w-full py-4 rounded-2xl
        text-white google-sans-700 text-lg
        transition-colors duration-200
        ${disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-[#F06060] hover:bg-[#E05050] active:bg-[#D04040]'
        }
      `}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      Drip
    </motion.button>
  );
}
