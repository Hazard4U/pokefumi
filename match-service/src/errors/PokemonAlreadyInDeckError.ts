export class PokemonAlreadyInDeckError extends Error{
    constructor(pokemonId: number){
       super(`Le pokemon "${pokemonId}" existe déjà dans le paquet !`) 
       this.name = "PokemonAlreadyInDeckError";
    }
}