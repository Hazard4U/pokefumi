import PokemonRepository from "../../src/repositories/pokemonRepository";

const pokemonRepository = new PokemonRepository();

export default class PokemonService {
  static getAllPokemons(){
    return pokemonRepository.getAllPokemons();
  }

  static getPokemonById(pokemonId: number){
    return pokemonRepository.getPokemonById(pokemonId);
  }
}
