import PokemonService from '../services/pokemonService'

export default class MatchController {
  static getAllPokemons(){
    return PokemonService.getAllPokemons();
  }

  static getPokemonById(pokemonId: number){
    return PokemonService.getPokemonById(pokemonId);
  }
}
