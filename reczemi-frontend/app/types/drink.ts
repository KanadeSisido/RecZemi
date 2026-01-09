// ドリンクの型定義
export interface Drink {
  id: string;
  name: string;
  category?: string;
  description?: string;
  imageUrl?: string;
}

// 検索レスポンスの型
export interface SearchResponse {
  drinks: Drink[];
  query: string;
}

// Drip リクエストの型
export interface DripRequest {
  drinkIds: string[];
}

// Drip レスポンスの型（Result画面用）
export interface DripResponse {
  success: boolean;
  message: string;
  recommendation?: {
    name: string;
    category: string;
    description: string;
  };
}
