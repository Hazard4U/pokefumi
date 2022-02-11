import RoundRepository from "../repositories/roundRepository";
import MatchService from "./matchService";

const roundRepository = new RoundRepository();

export default class RoundService {
  static getAllRounds() {
    return roundRepository.getAllRounds();
  }

  static getRoundById(roundId: number) {
    return roundRepository.getRoundById(roundId);
  }

  static getRoundsByMatchId(matchId: number) {
    return roundRepository.getRoundsByMatchId(matchId);
  }

  static createRound(matchId: number) {
    const roundInMatch = roundRepository.getRoundsByMatchId(matchId)?.length+1;
    const roundId = roundRepository.createRound(matchId, roundInMatch);
    MatchService.setRound(matchId, Number(roundId));
    return this.getRoundById(Number(roundId));
  }

  static setPokemonToUser(roundId: number, userId:number, pokemonId: number) {
    const round = RoundService.getRoundById(roundId);
    const match = MatchService.getMatchById(round.matchId);
    if (match.userId1 === userId) {
      roundRepository.updatePokemonUser1(roundId, pokemonId);
    } else {
      roundRepository.updatePokemonUser2(roundId, pokemonId);
    }
  }
}
