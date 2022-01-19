import RoundRepository from "../repositories/roundRepository";

const roundRepository = new RoundRepository();

export default class RoundService {
  getAllRounds = roundRepository.getAllRounds;

  getRoundById = roundRepository.getRoundById;

  getRoundsByMatchId = roundRepository.getRoundsByMatchId;

  createRound = roundRepository.createRound;

  addPokemonUser1 = roundRepository.updatePokemonUser1;

  addPokemonUser2 = roundRepository.updatePokemonUser2;
}
