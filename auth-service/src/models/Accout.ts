export type Account = {
    username: string;
}

export type AccountWithPassword = {
    username: string;
    password: string;
}

export const AccountMapper = (object: any): Account => {
    return {
        username: object.username
    };
};

export const AccountWithPasswordMapper = (object: any): AccountWithPassword => {
    return {
        username: object.username,
        password: object.password
    };
};