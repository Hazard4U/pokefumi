import {Pokemon} from "pokenode-ts";

export type User = {
    id: number;
    name: string;
}

export type Account = {
    id: number;
    username: string;
    user_id: string;
}

export type Match = {
    id: number,
    userId1: number,
    userId2: number,
    pokemonUser1: Pokemon[],
    pokemonUser2: Pokemon[],
    scoreUser1: number;
    scoreUser2: number;
}

export type Invitation = {
    userId: number,
    matchId: number
}