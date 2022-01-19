export type Account = {
    username: string;
    userId: string;
}

export const AccountMapper = (object: any): Account => {
    return {
        username: object.username,
        userId: object.user_id
    };
};