'use client';

import { motion } from 'motion/react';

interface LoadingScreenProps {
  message?: string;
  preventInitFade?: boolean;
}

export default function LoadingScreen({ message = 'Loading...', preventInitFade = false }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#F5A0A0]"
      initial={preventInitFade ? { opacity: 1 } : { opacity: 0 }}
      animate={preventInitFade ? { opacity: 1 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 背景のテキスト */}
      <div className="absolute -top-2 left-0 text-[#F5B0B0] text-6xl google-sans-700 opacity-50 z-10">
        {message}
      </div>

      {/* 波のアニメーション（下から上に上昇） */}
      <motion.div
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        initial={{ height: '0%' }}
        animate={{ height: '110%' }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        <div className="relative w-full h-full">
          {/* 波形SVG */}
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-full"
            animate={{
              x: ['-50%', '0%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="absolute top-0 w-full h-24"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
            >
              <path
                fill="#F06060"
                d="M 0 60 C 240 120 480 0 720 60 C 960 120 1200 0 1440 60 C 1680 120 1920 0 2160 60 C 2400 120 2640 0 2880 60 L 2880 120 L 0 120 Z"
              />
            </svg>
          </motion.div>
          {/* 波の下の塗りつぶし */}
          <div className="absolute top-[60px] left-0 w-full h-full bg-[#F06060]" />
        </div>
      </motion.div>

      {/* 回転するコップアイコン（中央に固定） */}
      <motion.div
        className="relative z-10"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* コップの形状 */}
          <path d="M12 8 L14 40 L34 40 L36 8 Z" />
          <line x1="10" y1="8" x2="38" y2="8" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
