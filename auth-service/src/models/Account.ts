export type Account = {
    username: string;
    user_id: number;
}

export type AccountWithPassword = {
    username: string;
    password: string;
    user_id: number;
}

export const AccountMapper = (object: any): Account => {
    if (!object) return null
    return {
        username: object.username,
        user_id: object.user_id
    };
};

export const AccountWithPasswordMapper = (object: any): AccountWithPassword => {
    if (!object) return null
    return {
        username: object.username,
        password: object.password,
        user_id: object.user_id
    };
};