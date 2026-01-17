import { Drink, DripRequest } from "../types/drink";

// バックエンドのベースURL（環境変数で設定可能）
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000";

/**
 * ドリンクを検索する
 * @param query 検索クエリ
 * @returns 検索結果（Drink配列）
 */
export async function searchDrinks(query: string): Promise<Drink[]> {
	const response = await fetch(
		`${API_BASE_URL}/drinks/search?q=${encodeURIComponent(query)}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!response.ok) {
		throw new Error(`Search failed: ${response.status}`);
	}

	return response.json();
}

/**
 * 選択したドリンクでDripリクエストを送信する
 * @param drinkIds 選択したドリンクのID配列
 * @returns 推薦されたDrink（またはnull）
 */
export async function dripDrinks(drinkIds: string[]): Promise<Drink | null> {
	const request: DripRequest = { history: drinkIds };

	const response = await fetch(`${API_BASE_URL}/drinks/drip`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		throw new Error(`Drip request failed: ${response.status}`);
	}

	return response.json();
}
