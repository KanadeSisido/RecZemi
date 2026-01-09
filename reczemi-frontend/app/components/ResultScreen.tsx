'use client';

import { motion } from 'motion/react';

interface ResultScreenProps {
  drinkName: string;
  category: string;
  description: string;
  onShare: () => void;
  onClose: () => void;
}

export default function ResultScreen({
  drinkName,
  category,
  description,
  onShare,
  onClose,
}: ResultScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#FCF8F9] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen px-6 py-8 pb-32 relative">
        {/* 閉じるボタン */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        {/* ヘッダーテキスト */}
        <div className="google-sans-700 text-[#F5C0C0] text-7xl opacity-50 -top-2 -left-2 absolute">
          Result
        </div>

      <div className="pt-20">

        {/* キャッチコピー */}
        <p className="text-gray-800 text-lg mb-6">
          あなたが<span className="text-[#F06060] font-bold">飲んだことがない</span>飲み物は
        </p>

        {/* ドリンクカード */}
        <motion.div
          className="bg-linear-to-br from-[#F06060] to-[#F5A0A0] rounded-2xl p-6 mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <h2 className="font-en text-white text-2xl font-bold mb-4 leading-tight">
            {drinkName}
          </h2>
          <span className="inline-block bg-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            {category}
          </span>
        </motion.div>

        {/* AI説明セクション */}
        <div className="mb-8">
          <h3 className="text-gray-800 font-bold mb-3">
            このドリンクについて（AI）
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      </div>

      {/* シェアボタン */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-linear-to-t from-[#FCF0F0] to-transparent">
        <motion.button
          className="w-full py-4 rounded-2xl bg-gray-700 hover:bg-gray-800 text-white font-bold text-lg flex items-center justify-center gap-2"
          onClick={onShare}
          whileTap={{ scale: 0.98 }}
        >
          Share with
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
