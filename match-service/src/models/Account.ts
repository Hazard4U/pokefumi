import { Response } from "express";

export type Account = {
    username: string;
    userId: number;
}

export const AccountMapper = (object: any): Account => {
    return {
        username: object.username,
        userId: object.user_id
    };
};

export function GetAccountProperties(res:Response): Account{
    return res.locals.account
}