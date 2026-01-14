export type PokemonView = {
  id: number;
  name: string;
  nameJa?: string;
  types: string[];
  abilities: string[];
  imageUrl: string;
};

export async function fetchPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonView[]> {
  const res = await fetch(
    `http://localhost:8080/api/pokemon?limit=${limit}&offset=${offset}`,
    { cache: "no-store" } // まずはキャッシュなし
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pokemon");
  }

  return res.json();
}
