'use client';

import { motion } from 'motion/react';

interface ResultScreenProps {
  drinkName: string;
  category: string;
  onShare: () => void;
  onClose: () => void;
}

export default function ResultScreen({
  drinkName,
  category,
  onShare,
  onClose,
}: ResultScreenProps) {
  const handleGoogleSearch = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(drinkName)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#FCF8F9] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen px-6 py-8 pb-40 relative">
        {/* 閉じるボタン */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 z-10"
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
        <div className="google-sans-700 text-[#F5C0C0] text-7xl opacity-50 -top-2 -left-2 absolute pointer-events-none">
          Result
        </div>

      <div className="pt-20">

        {/* キャッチコピー */}
        <p className="text-gray-800 text-lg mb-6 noto-sans-jp-500">
          あなたが<span className="text-[#F06060] font-bold">飲んだことがない</span>飲み物は
        </p>

        {/* ドリンクカード */}
        <motion.div
          className="bg-linear-to-br from-[#F06060] to-[#F5A0A0] rounded-2xl p-8 mb-8 shadow-lg shadow-[#F06060]/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <h2 className="font-en text-white text-3xl font-bold mb-4 leading-tight">
            {drinkName}
          </h2>
          <span className="inline-block bg-white/30 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
            {category}
          </span>
        </motion.div>

        {/* Google検索ボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-500 text-sm mb-3 text-center noto-sans-jp-400">詳しい情報をチェック</p>
          <motion.button
            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-sm hover:bg-gray-50 transition-colors"
            onClick={handleGoogleSearch}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Googleで検索
          </motion.button>
        </motion.div>
        
      </div>
      
      </div>

      {/* シェアボタン */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-linear-to-t from-[#FCF0F0] to-transparent">
        <motion.button
          className="w-full py-4 rounded-2xl bg-gray-800 hover:bg-gray-900 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-gray-800/20"
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
