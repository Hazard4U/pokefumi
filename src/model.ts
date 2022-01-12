import {Pokemon} from "pokenode-ts";

export type User = {
    id: number;
    name: string;
}

export type Match = {
    id: number,
    userId1: number,
    userId2: number,
    pokemonUser1: Pokemon[],
    pokemonUser2: Pokemon[]
}

export type Invitation = {
    userId: number,
    matchId: number
}