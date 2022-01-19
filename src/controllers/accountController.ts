import * as bcrypt from 'bcrypt'
import { User } from '../models/User';
import { Account, AccountMapper } from '../models/Accout'
import * as AccountService from '../services/accountService';
import jwt from 'jsonwebtoken'
import { Token } from '../models/Token';

const rounds = 5;
const tokenSecret = "Patate"

const listAccounts = AccountService.listAccounts

const signup = async (username: string, password: string, name: string): Promise<[Token, Error]> => {
    return await new Promise((resolve, reject) => bcrypt.hash(password, rounds, (err, hash) => {
        if (err) {
            resolve([null, err])
        }
        try {
            const account = AccountService.signup(username, hash, name);
            resolve([{token: generateToken(account)}, null])
        } catch (sqliteError) {
            const error = new Error("An account with the same username already exists.")
            resolve([null, error])
        }
    }));
}

const login = async (username: string, password: string): Promise<[Token, Error]> => {
    return await new Promise((resolve, reject) => {
        const accountWithPassword = AccountService.findAccountWithPassword(username)
        if (!accountWithPassword) {
            resolve([null, new Error("Account does not exist")])
        }
        const account = AccountMapper(accountWithPassword)
        bcrypt.compare(password, accountWithPassword.password, (error, match) => {
            if (error) resolve([null, new Error("Internal error")])
            else if (match) resolve([{token: generateToken(account)}, null])
            else resolve([null, new Error("Wrong password")])
        })
    })
}

function generateToken(account: Account) {
    return jwt.sign({data: account}, tokenSecret, {expiresIn: '24h'})
}

export { listAccounts, signup, login }