import PokemonService from '../services/pokemonService'

export default class MatchController {
  static getAllPokemons = PokemonService.getAllPokemons;

  static getPokemonById = PokemonService.getPokemonById;
}
