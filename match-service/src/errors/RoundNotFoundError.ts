export class RoundNotFoundError extends Error{
    constructor(roundId: number){
       super(`Impossible de trouver le round "${roundId}" !`) 
       this.name = "RoundNotFoundError";
    }
}