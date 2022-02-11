export type User = {
    id: number;
    name: string;
    score: number;
}

export const UserMapper = (object: any): User => {
    return {
        id: object.user_id,
        name: object.name,
        score: object.score
    };
};
