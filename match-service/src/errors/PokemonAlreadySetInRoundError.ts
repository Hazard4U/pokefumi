export class PokemonAlreadySetInRoundError extends Error{
    constructor(){
       super(`Un pokemon existe déjà pour ce round !`) 
       this.name = "PokemonAlreadySetInRoundError";
    }
}