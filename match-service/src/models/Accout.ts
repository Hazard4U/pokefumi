export type Account = {
    username: string;
}

export const AccountMapper = (object: any): Account => {
    return {
        username: object.username
    };
};