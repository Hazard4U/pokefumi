import { PokemonAlreadyInDeckError } from "../errors/PokemonAlreadyInDeckError";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { MatchNotFoundError } from "../errors/MatchNotFoundError";
import { Match } from "../models/Match";
import MatchRepository from "../repositories/matchRepository";
import { TooMuchPokemonInDeckError } from "../errors/TooMuchPokemonInDeckError";

const matchRepository = new MatchRepository();

export default class MatchService {
  static getAllMatchs() {
    return matchRepository.getAllMatchs();
  }

  static getMatchById(matchId: number) {
    return matchRepository.getMatchById(matchId);
  }
  static getMatchsByUserId(userId: number) {
    return matchRepository.getMatchsByUserId(userId);
  }

  static createMatch(userId1: number, userId2: number | null): Match {
    const matchId = Number(matchRepository.createMatch(userId1));
    try {
      if (userId2) {
        matchRepository.updateUser2(matchId, userId2);
      }
    } catch (error) {
      console.error(error);
      this.deleteMatch(matchId);
      throw new Error("Impossible d'ajouter le deuxième joueur !");
    }
    return this.getMatchById(Number(matchId));
  }

  static deleteMatch(matchId: number) {
    matchRepository.deleteMatchById(matchId);
  }

  static setUser2(matchId: number, userId2: number) {
    matchRepository.updateUser2(matchId, userId2);
  }

  static setRound(matchId: number, roundId: number) {
    matchRepository.updateRound(matchId, roundId);
  }

  static addPokemonToUser(matchId: number, userId: number, pokemonId: number) {
    let match;
    try {
      match = MatchService.getMatchById(matchId);
    } catch (error) {
      throw new MatchNotFoundError(matchId);
    }
    let updateMethod;
    let pokemonsId;
    if (match.userId1 === userId) {
      updateMethod = matchRepository.updatePokemonsUser1.bind(matchRepository);
      pokemonsId = MatchService.getMatchById(matchId).pokemonsUser1;
    } else if (match.userId2 === userId) {
      updateMethod = matchRepository.updatePokemonsUser2.bind(matchRepository);
      pokemonsId = MatchService.getMatchById(matchId).pokemonsUser2;
    } else {
      throw new UserNotFoundError(userId);
    }

    if(pokemonsId.length >= 10){
      throw new TooMuchPokemonInDeckError();
    }

    if (!pokemonsId.includes(pokemonId.toString())) {
      pokemonsId.push(pokemonId.toString());
      updateMethod(matchId, pokemonsId.join(","));
    } else {
      throw new PokemonAlreadyInDeckError(pokemonId);
    }
  }

  static isMatchRunnable(matchId: number) {
    const match = this.getMatchById(matchId);
    const pokemonsIdUser1 = match.pokemonsUser1;
    const pokemonsIdUser2 = match.pokemonsUser2;
    return (
      pokemonsIdUser2.length === 10 &&
      pokemonsIdUser1.length === 10
    );
  }
}
