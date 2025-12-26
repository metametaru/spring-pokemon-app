export type PokemonType = {
  name: string;
};

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
};

export type Pokemon = {
  id: number;
  name: string;
  image: string | null;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
};