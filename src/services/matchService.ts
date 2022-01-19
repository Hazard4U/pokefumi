import MatchRepository from "../repositories/matchRepository";

const matchRepository = new MatchRepository();

export default class MatchService {
  static getAllMatchs = matchRepository.getAllMatchs;

  static getMatchById = matchRepository.getMatchById;

  static getMatchsByUserId = matchRepository.getMatchsByUserId;

  static createMatch = matchRepository.createMatch;

  static addPokemonUser1(matchId: number, pokemonId: number) {
    const pokemonsId = this.getMatchById(matchId).pokemonsUser1;
    if (!pokemonsId.find((id) => id == pokemonId)) {
      pokemonsId.push(pokemonId);
      matchRepository.updatePokemonsUser1(matchId, pokemonsId.join(","));
    }
  }

  static addPokemonUser2(matchId: number, pokemonId: number) {
    const pokemonsId = this.getMatchById(matchId).pokemonsUser2;
    if (!pokemonsId.find((id) => id == pokemonId)) {
      pokemonsId.push(pokemonId);
      matchRepository.updatePokemonsUser2(matchId, pokemonsId.join(","));
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
