import AccountRepository from "../repositories/accountRepository";
import { Account } from "../models/Accout";
import UserService from "./userService";

const accountRepository = new AccountRepository();

export default class AccountService {
  static listAccounts = accountRepository.getAllAccounts;

  static findAccount = accountRepository.getAccountByUsername;

  static findAccountWithPassword = accountRepository.getAccountWithPasswordByUsername

  static findAccountByRowId = accountRepository.getAccountByRowId

  static addAccount = (
    username: string,
    password: string,
    userId: string
  ): Account => {
    const rowId = accountRepository.signup(username, password, userId);
    return this.findAccountByRowId(rowId);
  };

  static signup = (username: string, password: string, name: string): Account => {
    let account;
    console.log("signup", username, password, name);

    const createSignUp = accountRepository.db.transaction(() => {
      const user = UserService.addUser(name);
      account = this.addAccount(username, password, "" + user.id);
    });
    createSignUp();

    console.log(account);
    return account;
  };
}
