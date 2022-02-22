export class ObjectToMapUndefinedError extends Error{
    constructor(){
       super(`L'objet à mapper ne peut être null`) 
       this.name = "ObjectToMapUndefinedError";
    }
}