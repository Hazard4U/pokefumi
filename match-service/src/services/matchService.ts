import { Match } from "../models/Match";
import MatchRepository from "../repositories/matchRepository";

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
    try{
      if(userId2){
        matchRepository.updateUser2(matchId, userId2);
      }
    }catch(error){
      console.error(error);
      this.deleteMatch(matchId);
      throw new Error("Impossible d'ajouter le deuxième joueur !");
    }
    return this.getMatchById(Number(matchId));
  }

  static deleteMatch(matchId: number){
    matchRepository.deleteMatchById(matchId);
  }

  static setUser2(matchId: number, userId2: number) {
    matchRepository.updateUser2(matchId, userId2);
  }

  static setRound(matchId: number, roundId: number) {
    matchRepository.updateRound(matchId, roundId);
  }
  static addPokemonToUser(matchId: number, userId:number, pokemonId: number) {
    const match = MatchService.getMatchById(matchId);
    let updateMethod;
    if(match.userId1 === userId){
      updateMethod = matchRepository.updatePokemonsUser1;
    }else{
      updateMethod = matchRepository.updatePokemonsUser2;
    }

    const pokemonsId = MatchService.getMatchById(matchId).pokemonsUser1;
    if (!pokemonsId.find((id: number) => id == pokemonId)) {
      pokemonsId.push(pokemonId);
      updateMethod(matchId, pokemonsId.join(","));
    }
  }

  static isMatchRunnable(matchId: number) {
    const match = this.getMatchById(matchId);
    const pokemonsIdUser1 = match.pokemonsUser1;
    const pokemonsIdUser2 = match.pokemonsUser2;
    return (
      pokemonsIdUser1.length === pokemonsIdUser2.length &&
      pokemonsIdUser1.length === 10
    );
  }
}
