'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export default function SearchBar({
  placeholder = 'green tea',
  onSearch,
  debounceMs = 500,
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // 既存のタイマーをクリア
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 新しいタイマーをセット
      debounceTimerRef.current = setTimeout(() => {
        onSearch(newValue);
      }, debounceMs);
    },
    [debounceMs, onSearch]
  );

  const handleClear = useCallback(() => {
    setValue('');
    onSearch('');
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, [onSearch]);

  return (
    <div className="relative">
      {/* 虫眼鏡アイコン */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F06060]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="8" r="6" />
          <line x1="13" y1="13" x2="18" y2="18" />
        </svg>
      </div>

      {/* 入力フィールド */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full py-3 pl-12 pr-10 google-sans-400
          bg-white rounded-xl
          border border-gray-200
          text-gray-800 placeholder-gray-400
          focus:outline-none focus:border-[#F06060] focus:ring-2 focus:ring-[#F06060]/20
          transition-all duration-200
        "
      />

      {/* クリアボタン */}
      <AnimatePresence>
        {value && (
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={handleClear}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
