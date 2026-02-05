import { auth } from "@/src/lib/firebase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// 認証トークンを取得
const getAuthHeader = async (): Promise<HeadersInit> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("ログインが必要です");
  }
  const token = await user.getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// お気に入り一覧を取得
export const getFavorites = async (): Promise<number[]> => {
  const headers = await getAuthHeader();
  const response = await fetch(`${API_BASE_URL}/api/favorites`, {
    headers,
  });
  if (!response.ok) {
    throw new Error("お気に入りの取得に失敗しました");
  }
  return response.json();
};

// 特定のポケモンがお気に入りかどうか確認
export const checkIsFavorite = async (pokemonId: number): Promise<boolean> => {
  const headers = await getAuthHeader();
  const response = await fetch(`${API_BASE_URL}/api/favorites/${pokemonId}`, {
    headers,
  });
  if (!response.ok) {
    throw new Error("お気に入り状態の確認に失敗しました");
  }
  const data = await response.json();
  return data.isFavorite;
};

// お気に入りに追加
export const addFavorite = async (pokemonId: number): Promise<void> => {
  const headers = await getAuthHeader();
  const response = await fetch(`${API_BASE_URL}/api/favorites/${pokemonId}`, {
    method: "POST",
    headers,
  });
  if (!response.ok) {
    throw new Error("お気に入りの追加に失敗しました");
  }
};

// お気に入りから削除
export const removeFavorite = async (pokemonId: number): Promise<void> => {
  const headers = await getAuthHeader();
  const response = await fetch(`${API_BASE_URL}/api/favorites/${pokemonId}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error("お気に入りの削除に失敗しました");
  }
};
