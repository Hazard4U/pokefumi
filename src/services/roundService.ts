import { Pokemon } from "pokenode-ts";
import { Round } from "../models/Round";
import RoundRepository from "../repositories/roundRepository";

const roundRepository = new RoundRepository();

export default class RoundService {
  getAllRounds(): Round[] {
    return roundRepository.getAllRounds();
  }

  getRoundById(roundId: number): Round {
    return roundRepository.getRoundById(roundId);
  }

  getRoundsByMatchId(userId: number): Round[] {
    return roundRepository.getRoundsByMatchId(userId);
  }

  createRound(matchId: number, roundInMatch: number) {
    return roundRepository.createRound(matchId, roundInMatch);
  }

  addPokemonUser1(roundId: number, pokemonId: number) {
    roundRepository.updatePokemonUser1(roundId, pokemonId);
  }

  addPokemonUser2(roundId: number, pokemonId: number) {
    roundRepository.updatePokemonUser2(roundId, pokemonId);
  }
}
