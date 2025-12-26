import { PokemonSpeciesApi } from "../types/pokemonSpeciesApi";
const speciesCache = new Map<string, string>();

export const getPokemonNameJa = async (id: number): Promise<string> => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

  if (speciesCache.has(url)) {
    return speciesCache.get(url)!;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon species");
  }

  const data: PokemonSpeciesApi = await res.json();
  const ja =
    data.names.find((n) => n.language.name === "ja-Hrkt")?.name ??
    data.names.find((n) => n.language.name === "ja")?.name ??
    "不明";

  speciesCache.set(url, ja);
  return ja;
};
