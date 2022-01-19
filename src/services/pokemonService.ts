import { Pokemon } from "pokenode-ts";
import PokemonRepository from "../../src/repositories/pokemonRepository";

const pokemonRepository = new PokemonRepository();

export default class PokemonService {
  async getAllPokemons(): Promise<Pokemon[]> {
    return pokemonRepository.getAllPokemons();
  }

  async getPokemonById(pokemonId: number): Promise<Pokemon> {
    return pokemonRepository.getPokemonById(pokemonId);
  }
}
