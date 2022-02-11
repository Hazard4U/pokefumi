import { Match } from "../models/Match";
import MatchService from "../services/matchService";

export default class MatchController {
  static listMatchs() {
    return MatchService.getAllMatchs();
  }

  static findMatch(matchId: number) {
    return MatchService.getMatchById(matchId);
  }

  static createMatch(userId: number, userId2: number | null): Match[] {
    MatchService.createMatch(userId, userId2);
    return MatchService.getAllMatchs();
  }

  static addPokemonToMatch(
    matchId: number,
    userId: number,
    pokemonId: number
  ): Match {
    MatchService.addPokemonToUser(matchId, userId, pokemonId);
    return MatchService.getMatchById(matchId);
  }

  static setUser2(matchId: number, userId2: number) {
    MatchService.setUser2(matchId, userId2);
    return MatchService.getMatchById(matchId);
  }
}
