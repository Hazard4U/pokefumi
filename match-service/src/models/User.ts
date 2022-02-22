import { ObjectToMapUndefinedError } from "../errors/ObjectToMapUndefinedError";

export type User = {
  id: number;
  name: string;
  score: number;
};

export const UserMapper = (object: any): User => {
  if (!object) throw new ObjectToMapUndefinedError();

  return {
    id: object.user_id,
    name: object.name,
    score: object.score,
  };
};
