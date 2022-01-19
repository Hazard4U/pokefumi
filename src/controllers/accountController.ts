import * as bcrypt from 'bcrypt'
import { Account } from '../models/Accout'
import * as AccountService from '../services/accountService';

const rounds = 5;

const listAccounts = AccountService.listAccounts

const signup = async (username: string, password: string, name: string): Promise<[Account, Error]> => {
    return await new Promise((resolve, reject) => bcrypt.hash(password, rounds, (err, hash) => {
        if (err) {
            resolve([null, err])
        }
        try {
            const account = AccountService.signup(username, hash, name);
            resolve([account, null])
        } catch (sqliteError) {
            const error = new Error("An account with the same username already exists.")
            resolve([null, error])
        }
    }));
}

export { listAccounts, signup }