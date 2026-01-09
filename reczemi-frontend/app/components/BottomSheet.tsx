'use client';

import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Drink } from '../types/drink';
import DrinkCard from './DrinkCard';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDrinks: Drink[];
  onRemoveDrink: (drink: Drink) => void;
  onClearAll: () => void;
}

export default function BottomSheet({
  isOpen,
  onClose,
  selectedDrinks,
  onRemoveDrink,
  onClearAll,
}: BottomSheetProps) {
  const dragControls = useDragControls();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ボトムシート */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl min-h-[50vh] max-h-[80vh] overflow-hidden flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
          >
            {/* ドラッグハンドル */}
            <div
              className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* 閉じるボタン */}
            <button
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 p-1"
              onClick={onClose}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="15" y1="5" x2="5" y2="15" />
              </svg>
            </button>

            {/* ヘッダー */}
            <div className="flex justify-between items-center px-6 pt-8 pb-4 noto-sans-jp-700">
              <h2 className="text-lg font-bold text-gray-800">選択したドリンク</h2>
              <button
                className="text-sm text-gray-400 hover:text-gray-600"
                onClick={onClearAll}
              >
                クリア
              </button>
            </div>

            {/* ドリンクリスト */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {selectedDrinks.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400 noto-sans-jp-400">
                  ドリンクが選択されていません
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-3">
                  {selectedDrinks.map((drink) => (
                    <DrinkCard
                      key={drink.id}
                      drink={drink}
                      isSelected={true}
                      onToggle={onRemoveDrink}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
