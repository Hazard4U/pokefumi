import PokemonRepository from "../../src/repositories/pokemonRepository";

const pokemonRepository = new PokemonRepository();

export default class PokemonService {
  static getAllPokemons = pokemonRepository.getAllPokemons.bind(pokemonRepository);

  static getPokemonById = pokemonRepository.getPokemonById.bind(pokemonRepository);
}
