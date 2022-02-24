import { RoundNotFoundError } from "../errors/RoundNotFoundError";
import { MatchNotReadyToStartError } from "../errors/MatchNotReadyToStartError";
import RoundRepository from "../repositories/roundRepository";
import MatchService from "./matchService";
import { MatchNotFoundError } from "../errors/MatchNotFoundError";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { PokemonAlreadySetInRoundError } from "../errors/PokemonAlreadySetInRoundError";
import PokemonService from "./pokemonService";
import axios from "axios";
import { Match } from "../models/Match";
import { Round } from "../models/Round";

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
    if (!MatchService.isMatchRunnable(matchId)) {
      throw new MatchNotReadyToStartError();
    }
    const roundInMatch =
      roundRepository.getRoundsByMatchId(matchId)?.length + 1;
    const roundId = roundRepository.createRound(matchId, roundInMatch);
    MatchService.setRound(matchId, Number(roundId));
    return this.getRoundById(Number(roundId));
  }

  static setPokemonToUser(roundId: number, userId: number, pokemonId: number) {
    let round: Round;
    try {
      round = RoundService.getRoundById(roundId);
    } catch (error) {
      throw new RoundNotFoundError(roundId);
    }

    let match: Match;
    try {
      match = MatchService.getMatchById(round.matchId);
    } catch (error) {
      throw new MatchNotFoundError(round.matchId);
    }

    if (match.userId1 === userId && !round.pokemonIdUser1) {
      roundRepository.updatePokemonUser1(roundId, pokemonId);
    } else if (match.userId2 === userId && !round.pokemonIdUser2) {
      roundRepository.updatePokemonUser2(roundId, pokemonId);
    } else if (match.userId1 !== userId && match.userId2 !== userId) {
      throw new UserNotFoundError(userId);
    } else {
      throw new PokemonAlreadySetInRoundError();
    }

    round = RoundService.getRoundById(roundId);

    if (round.pokemonIdUser1 && round.pokemonIdUser2) {
      Promise.all([
        PokemonService.getPokemonById(round.pokemonIdUser1),
        PokemonService.getPokemonById(round.pokemonIdUser2),
      ]).then(([{ types: pokemonTypes1 }, { types: pokemonTypes2 }]) => {
        const pokemonType1 = pokemonTypes1[0].type.name;
        const pokemonType2 = pokemonTypes2[0].type.name;
        Promise.all([
          axios.get(pokemonTypes1[0].type.url),
          axios.get(pokemonTypes2[0].type.url),
        ]).then(([dataPokemonType1, dataPokemonType2]) => {
          const weaks1 =
            dataPokemonType1.data.damage_relations.double_damage_from;
          const weaks2 =
            dataPokemonType2.data.damage_relations.double_damage_from;

          const weak1 = weaks1.find((type: any) => type.name === pokemonType2);
          const weak2 = weaks2.find((type: any) => type.name === pokemonType1);
    
          let winner;
          if (weak1 && !weak2) {
            winner = match.userId2;
          } else if (weak2 && !weak1) {
            winner = match.userId1;
          }
          
          if(winner){
            roundRepository.updateResultat(roundId, winner);
            MatchService.addPointToUser(match.id, winner);
          }
          RoundService.createRound(match.id);
        });
      });
    }
  }
}
