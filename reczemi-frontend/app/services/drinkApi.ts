import { Drink, SearchResponse, DripRequest, DripResponse } from '../types/drink';

// バックエンドのベースURL（環境変数で設定可能）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

/**
 * ドリンクを検索する
 * @param query 検索クエリ
 * @returns 検索結果
 */
export async function searchDrinks(query: string): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE_URL}/drinks/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return response.json();
}

/**
 * おすすめドリンクを取得する
 * @returns おすすめドリンクのリスト
 */
export async function getRecommendedDrinks(): Promise<Drink[]> {
  const response = await fetch(`${API_BASE_URL}/drinks/recommended`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get recommendations: ${response.status}`);
  }

  return response.json();
}

/**
 * 選択したドリンクでDripリクエストを送信する
 * @param drinkIds 選択したドリンクのID配列
 * @returns Dripレスポンス
 */
export async function dripDrinks(drinkIds: string[]): Promise<DripResponse> {
  const request: DripRequest = { drinkIds };

  const response = await fetch(`${API_BASE_URL}/drinks/drip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Drip request failed: ${response.status}`);
  }

  return response.json();
}
