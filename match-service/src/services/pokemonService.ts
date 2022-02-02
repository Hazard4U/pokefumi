import PokemonRepository from "../../src/repositories/pokemonRepository";

const pokemonRepository = new PokemonRepository();

export default class PokemonService {
  getAllPokemons = pokemonRepository.getAllPokemons;

  getPokemonById = pokemonRepository.getPokemonById;
}
