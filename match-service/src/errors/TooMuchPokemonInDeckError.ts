export class TooMuchPokemonInDeckError extends Error{
    constructor(){
       super(`Impossible trop de pokemon dans le deck !`) 
       this.name = "TooMuchPokemonInDeckError";
    }
}