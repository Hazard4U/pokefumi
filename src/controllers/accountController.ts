import * as bcrypt from "bcrypt";
import AccountService from "../services/accountService";
import { Account } from "../models/Accout";

const rounds = 5;

export default class AccountController {
  static listAccounts = AccountService.listAccounts;

  static signup = async (
    username: string,
    password: string,
    name: string
  ): Promise<[Account, Error]> => {
    return await new Promise((resolve, reject) =>
      bcrypt.hash(password, rounds, (err, hash) => {
        if (err) {
          resolve([null, err]);
        }
        try {
          const account = AccountService.signup(username, hash, name);
          resolve([account, null]);
        } catch (sqliteError) {
          const error = new Error(
            "An account with the same username already exists."
          );
          resolve([null, error]);
        }
      })
    );
  };
}
