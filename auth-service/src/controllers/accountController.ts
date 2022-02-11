import * as bcrypt from 'bcrypt'
import { Account, AccountMapper } from '../models/Accout'
import AccountService from '../services/accountService';
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { Token } from '../models/Token';

const rounds = 5;

export default class AccountController {
  static listAccounts = AccountService.listAccounts;

  static signup = async (
    username: string,
    password: string
  ): Promise<[Token, Error]> => {
    return await new Promise(async (resolve, reject) =>
      bcrypt.hash(password, rounds, async (err, hash) => {
        if (err) {
          resolve([null, err]);
        }
        try {
          const account = await AccountService.addAccount(username, hash);
          resolve([{token: generateToken(account)}, null])
        } catch (error) {
          resolve([null, error]);
        }
      })
    );
  };

  static login = async (username: string, password: string): Promise<[Token, Error]> => {
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
}

function generateToken(account: Account) {
  const privateKEY = fs.readFileSync('./private.key', 'utf8');
  return jwt.sign({data: account}, privateKEY, {expiresIn: '24h', algorithm: 'RS256'})
}