export type Account = {
    username: string;
    userId: string;
}

export type AccountWithPassword = {
    username: string;
    password: string;
    userId: string;
}

export const AccountMapper = (object: any): Account => {
    return {
        username: object.username,
        userId: object.user_id
    };
};

export const AccountWithPasswordMapper = (object: any): AccountWithPassword => {
    return {
        username: object.username,
        password: object.password,
        userId: object.user_id
    };
};