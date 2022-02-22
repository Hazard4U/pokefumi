export class MatchNotReadyToStartError extends Error{
    constructor(){
       super(`Impossible de lancer le match !`) 
       this.name = "MatchNotReadyToStartError";
    }
}