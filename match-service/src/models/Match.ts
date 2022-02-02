import { Pokemon } from "pokenode-ts";

export type Match = {
  id: number;
  userId1: number;
  userId2: number;
  pokemonsUser1: number[];
  pokemonsUser2: number[];
  scoreUser1: number;
  scoreUser2: number;
  roundId: number;
};

export const MatchMapper = (object: any): Match => {
  const pokemonsUser1 = object.pokemons_user_1?.split(",") ?? [];
  const pokemonsUser2 = object.pokemons_user_2?.split(",") ?? [];
  return {
    id: object.match_id,
    userId1: object.user_id_1,
    userId2: object.user_id_2,
    pokemonsUser1: pokemonsUser1,
    pokemonsUser2: pokemonsUser2,
    scoreUser1: object.score_user_1,
    scoreUser2: object.score_user_2,
    roundId: object.round_id,
  };
};
