'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import SearchBar from './components/SearchBar';
import DrinkCard from './components/DrinkCard';
import CupButton from './components/CupButton';
import DripButton from './components/DripButton';
import BottomSheet from './components/BottomSheet';
import ResultScreen from './components/ResultScreen';
import { Drink } from './types/drink';
import { searchDrinks, dripDrinks } from './services/drinkApi';

// おすすめドリンク（ハードコード）- ユーザー提供のリスト
const RECOMMENDED_DRINKS: Drink[] = [
  { id: 'B07L1Q6KBG', title: 'じっくりコトコト' },
  { id: 'B0026IAWMU', title: 'いろはす' },
  { id: 'B07BX4L6P3', title: '伊右衛門　ほうじ茶' },
  { id: 'B07T94HSTM', title: '伊右衛門　煎茶' },
  { id: 'B076YVRKJZ', title: 'なっちゃん　りんご' },
  { id: 'B088JB2N41', title: 'デカビタ' },
  { id: 'B08L9R58WD', title: 'CC Lemon' },
  { id: 'B00NU606FK', title: 'Mountain Dew' },
  { id: 'B0C5LZBCYC', title: 'PEPSI' },
  { id: 'B009NAEMG6', title: 'BOSS Black' },
  { id: 'B08L4KNBV6', title: 'BOSS レインボーマウンテンブレンドコーヒー' },
  { id: 'B0828JC5JS', title: 'Craft BOSS ブラックコーヒー' },
  { id: 'B00HEZ4I0W', title: '午後の紅茶ミルクティー' },
  { id: 'B07DD7JC21', title: '午後の紅茶レモンティー' },
  { id: 'B00VFLM17I', title: 'ソルティライチ' },
  { id: 'B00DUXOXAM', title: 'minute maid Orange' },
  { id: 'B0C6911Q6L', title: 'dr pepper' },
  { id: 'B0C1T5P3BY', title: 'コカ・コーラ' },
  { id: 'B0089Y6ZSU', title: '紅茶花伝　ミルクティー' },
  { id: 'B0C83YWDLJ', title: 'monster energy green' },
  { id: 'B019AKA5WS', title: 'Monster energy zero ultra' },
  { id: 'B075HM9HGH', title: 'monster energy mango loco' },
  { id: 'B017UIQOF4', title: 'monster energy pipeline punch' },
];

export default function Home() {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drink[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<Drink | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  // スプラッシュスクリーン制御
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 検索処理（バックエンドに問い合わせ）
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const drinks = await searchDrinks(query);
      setSearchResults(drinks);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  }, []);

  // ドリンク選択/解除
  const handleToggleDrink = useCallback((drink: Drink) => {
    setSelectedDrinks(prev => {
      const isSelected = prev.some(d => d.id === drink.id);
      if (isSelected) {
        return prev.filter(d => d.id !== drink.id);
      } else {
        return [...prev, drink];
      }
    });
  }, []);

  // 選択解除
  const handleRemoveDrink = useCallback((drink: Drink) => {
    setSelectedDrinks(prev => prev.filter(d => d.id !== drink.id));
  }, []);

  // 全選択解除
  const handleClearAll = useCallback(() => {
    setSelectedDrinks([]);
  }, []);

  // Drip処理（バックエンドに問い合わせ）
  const handleDrip = useCallback(async () => {
    if (selectedDrinks.length === 0) return;

    setLoadingMessage('Processing');
    setIsLoading(true);

    try {
      const drinkIds = selectedDrinks.map(d => d.id);
      const response = await dripDrinks(drinkIds);

      // ローディング終了
      setIsLoading(false);

      // Result画面を表示
      if (response) {
        setResultData(response);
        setShowResult(true);
      }

      // 選択をクリア
      setSelectedDrinks([]);
    } catch (error) {
      console.error('Drip failed:', error);
      setIsLoading(false);
    }
  }, [selectedDrinks]);

  // シェア機能
  const handleShare = useCallback(() => {
    if (resultData) {
      const text = `私のおすすめドリンクは「${resultData.title}」です！ #DrinkIt`;
      const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  }, [resultData]);

  // Result画面を閉じる
  const handleCloseResult = useCallback(() => {
    setShowResult(false);
    setResultData(null);
  }, []);

  // 表示するドリンクリスト
  const displayDrinks = searchQuery ? searchResults : RECOMMENDED_DRINKS;
  const sectionTitle = searchQuery
    ? `検索結果: "${searchQuery}"`
    : 'おすすめ';

  return (
    <div className="min-h-screen bg-[#FCF8F9] overflow-hidden">
      {/* スプラッシュスクリーン & ローディング画面 */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <LoadingScreen key="splash" message="Drink it!?" preventInitFade />
        )}
        {!showSplash && isLoading && (
          <LoadingScreen key="loading" message={loadingMessage} />
        )}
      </AnimatePresence>

      {/* Result画面 */}
      <AnimatePresence>
        {showResult && resultData && (
          <ResultScreen
            drinkName={resultData.title || 'Unknown'}
            category="Beverage"
            onShare={handleShare}
            onClose={handleCloseResult}
          />
        )}
      </AnimatePresence>

      {/* メインコンテンツ */}
      <div className="relative px-6 py-8 pb-32">
        {/* ヘッダーテキスト（右上配置、はみ出し非表示） */}
        <div className="absolute -top-2 -left-6">
          <div className="google-sans-700 text-[#F5C0C0] text-6xl font-bold opacity-50 whitespace-nowrap translate-x-4">
            Drinks Select
          </div>
        </div>

        {/* 検索セクション */}
        <div className="mt-16 mb-8">
          <h2 className="text-gray-800 font-bold mb-3 noto-sans-jp-700">ドリンクを検索</h2>
          <SearchBar onSearch={handleSearch} placeholder="green tea" />
        </div>

        {/* ドリンクリスト */}
        <div>
          <h2 className="text-gray-800 font-bold mb-4 noto-sans-jp-700">{sectionTitle}</h2>
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {displayDrinks.map((drink) => (
                <DrinkCard
                  key={drink.id}
                  drink={drink}
                  isSelected={selectedDrinks.some(d => d.id === drink.id)}
                  onToggle={handleToggleDrink}
                />
              ))}
            </AnimatePresence>
          </div>

          {displayDrinks.length === 0 && searchQuery && (
            <div className="text-center text-gray-400 py-8 noto-sans-jp-400">
              「{searchQuery}」に一致するドリンクが見つかりませんでした
            </div>
          )}
        </div>
      </div>

      {/* フローティングボタン群 */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-linear-to-t from-[#FCF0F0] to-transparent">
        <div className="flex items-end justify-between mb-4">
          <div className="flex-1" />
          <CupButton
            count={selectedDrinks.length}
            onClick={() => setIsBottomSheetOpen(true)}
          />
        </div>
        <DripButton
          onClick={handleDrip}
          disabled={selectedDrinks.length === 0}
        />
      </div>

      {/* ボトムシート */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        selectedDrinks={selectedDrinks}
        onRemoveDrink={handleRemoveDrink}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
