export class UserNotFoundError extends Error{
    constructor(userId: number){
       super(`Impossible de trouver l'utilisateur "${userId}" !`) 
       this.name = "UserNotFoundError";
    }
}