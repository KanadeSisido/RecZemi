// ドリンクの型定義（バックエンドのDBモデルに対応）
export interface Drink {
  id: string;         // parent_asin (ASIN code)
  title: string | null;  // Product title from Amazon
  reviews?: string | null;  // Reviews (LONGTEXT)
}

// Drip リクエストの型
export interface DripRequest {
  history: string[];
}

// APIレスポンス型のメモ:
// GET /drinks/search?q=xxx → Drink[] を直接返す
// POST /drinks/drip → Drink | null を返す

