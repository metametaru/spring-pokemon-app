import { PokemonApi } from "../types/pokeapi";
import { Pokemon } from "../types/pokemon";
import { getJapaneseAbilityName } from "./getAbility";
import { getPokemonNameJa } from "./getPokemonNameJa";
import { getTypeNameJa } from "./getTypeNameJa";

export const toPokemon = async (api: PokemonApi): Promise<Pokemon> => ({
  id: api.id,
  name: await getPokemonNameJa(api.id),
  image: api.sprites.front_default,
  height: api.height,
  weight: api.weight,
  types: await Promise.all(
    api.types.map(async (t) => ({
      name: await getTypeNameJa(t.type.url),
    }))
  ),
  abilities: await Promise.all(
    api.abilities.map(async (a) => ({
      name: await getJapaneseAbilityName(a.ability.url),
      isHidden: a.is_hidden,
    }))
  ),
});
