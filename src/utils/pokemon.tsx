import { PokemonApi } from "../types/pokeapi";
import type { PokemonListItem } from "../types/pokemonList";

export const getPokemon = async (url: string): Promise<PokemonApi> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon detail");
  }
  return res.json();
};

export const getAllPokemon = async (
  url: string
): Promise<{ results: PokemonListItem[] }> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon list");
  }
  return res.json();
};
