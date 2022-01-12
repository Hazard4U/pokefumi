import {Pokemon} from "pokenode-ts";

export type Match = {
    id: number,
    userId1: number,
    userId2: number,
    pokemonUser1: Pokemon[],
    pokemonUser2: Pokemon[],
    scoreUser1: number;
    scoreUser2: number;
}