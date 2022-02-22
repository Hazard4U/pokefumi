export class MatchNotFoundError extends Error{
    constructor(matchId: number){
       super(`Impossible de trouver le match "${matchId}" !`) 
       this.name = "MatchNotFoundError";
    }
}