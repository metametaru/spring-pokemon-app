import { PokemonView } from "../lib/api";
import { Pokemon } from "../types/pokemon";

/**
 * バックエンドAPIのPokemonView型をフロントエンドのPokemon型に変換
 */
export const toPokemonFromView = (view: PokemonView): Pokemon => ({
  id: view.id,
  name: view.nameJa || view.name,
  image: view.imageUrl || null,
  height: view.height ?? 0,
  weight: view.weight ?? 0,
  types: view.types.map((typeName) => ({
    name: typeName,
  })),
  abilities: view.abilities.map((abilityName) => ({
    name: abilityName,
    isHidden: false, // バックエンドAPIに含まれていない場合はfalse
  })),
});
