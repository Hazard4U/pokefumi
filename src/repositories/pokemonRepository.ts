import got, { CancelableRequest } from "got";
import { Pokemon } from "pokenode-ts";

const pokemonsUrl = "https://pokeapi.co/api/v2/pokemon";

export default class PokemonRepository {
  getAllPokemons(): CancelableRequest<Pokemon[]> {
    return got(pokemonsUrl).json();
  }

  getPokemonById(pokemonId: number): CancelableRequest<Pokemon> {
    return got(`${pokemonsUrl}/${pokemonId}`).json();
  }
}
