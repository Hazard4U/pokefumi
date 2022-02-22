import axios from 'axios';
import { Pokemon } from "pokenode-ts";

const pokemonsUrl = "https://pokeapi.co/api/v2/pokemon";

export default class PokemonRepository {
  async getAllPokemons(): Promise<Pokemon[]>{
    return await (await axios.get<Pokemon[]>(pokemonsUrl)).data
  }

  async getPokemonById(pokemonId: number): Promise<Pokemon> {
    return await (await axios.get<Pokemon>(`${pokemonsUrl}/${pokemonId}`)).data
  }
}
