import { Match } from "../../src/models/Match";
import MatchRepository from "../repositories/matchRepository";

const matchRepository = new MatchRepository();

export default class MatchService {
  getAllMatchs(): Match[] {
    return matchRepository.getAllMatchs();
  }

  getMatchById(matchId: number): Match {
    return matchRepository.getMatchById(matchId);
  }

  getMatchsByUserId(userId: number): Match[] {
    return matchRepository.getMatchsByUserId(userId);
  }

  createMatch(userId1: number) {
    return matchRepository.createMatch(userId1);
  }

  addPokemonUser1(matchId: number, pokemonId: number) {
    const pokemonsId = matchRepository.getMatchById(matchId).pokemonsUser1;
    if (!pokemonsId.find((id) => id == pokemonId)) {
      pokemonsId.push(pokemonId);
      matchRepository.updatePokemonsUser1(matchId, pokemonsId.join(","));
    }
  }

  addPokemonUser2(matchId: number, pokemonId: number) {
    const pokemonsId = matchRepository.getMatchById(matchId).pokemonsUser2;
    if (!pokemonsId.find((id) => id == pokemonId)) {
      pokemonsId.push(pokemonId);
      matchRepository.updatePokemonsUser2(matchId, pokemonsId.join(","));
    }
  }

  isMatchRunnable(matchId: number){
    const match = matchRepository.getMatchById(matchId);
    const pokemonsIdUser1 = match.pokemonsUser1;
    const pokemonsIdUser2 = match.pokemonsUser2;
    return pokemonsIdUser1.length === pokemonsIdUser2.length && pokemonsIdUser1.length === 10;
  }
}
