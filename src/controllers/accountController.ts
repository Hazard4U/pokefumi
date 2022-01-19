import * as brypt from 'bcrypt'
import { Account } from '../models/Accout'
import * as AccountService from '../services/accountService';

const rounds = 5;

const listAccounts = AccountService.listAccounts

const signup = (username: string, password: string, name: string): [Account, Error] => {
    let [account, error]: [account: Account, error: Error] = [null, null];
    brypt.hash(password, rounds, (err, hash) => {
        if (err) {
            error = err
            return
        }
        try {
            account = AccountService.signup(username, hash, name);
        } catch (sqliteError) {
            error = sqliteError
            account = null
        }
    })
    return [account, error]
}

export { listAccounts, signup }