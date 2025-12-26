export interface PokemonApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: PokemonApiType[];
  abilities: PokemonApiAbility[];
}

export interface PokemonApiType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonApiAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}
