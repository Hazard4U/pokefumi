import { Pokemon } from "pokenode-ts";

export type Round = {
  id: number;
  matchId: number;
  roundInMatch: number;
  pokemonIdUser1: number;
  pokemonIdUser2: number;
  resultat: number;
};

export const RoundMapper = (object: any): Round => {
  return {
    id: object.round_id,
    matchId: object.match_id,
    roundInMatch: object.round_in_match,
    pokemonIdUser1: object.pokemon_user_1,
    pokemonIdUser2: object.pokemon_user_2,
    resultat: object.resultat,
  };
};
