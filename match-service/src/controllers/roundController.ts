import { Round } from "../models/Round";
import RoundService from "../services/roundService";
import MatchService from "../services/matchService";

export default class MatchController {
  static listRounds() {
    return RoundService.getAllRounds();
  }

  static findRound(roundId: number) {
    return RoundService.getRoundById(roundId);
  }

  static createRound(matchId: number): Round {
    return RoundService.createRound(matchId);
  }

  static addPokemonToRound(roundId: number, userId: number, pokemonId: number) {
    RoundService.setPokemonToUser(roundId, userId, pokemonId);
    return RoundService.getRoundById(roundId);
  }
}
