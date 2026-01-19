export type PokemonView = {
  id: number;
  name: string;
  nameJa?: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  imageUrl: string;
};

export async function fetchPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonView[]> {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
  
  const res = await fetch(
    `${API_BASE_URL}/api/pokemon?limit=${limit}&offset=${offset}`,
    { cache: "no-store" } // まずはキャッシュなし
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pokemon");
  }

  return res.json();
}
