import AccountRepository from "../repositories/accountRepository";
import { Account } from "../models/Accout";
import UserService from "./userService";

const accountRepository = new AccountRepository();

export default class AccountService {
  static listAccounts = accountRepository.getAllAccounts.bind(accountRepository);

  static findAccount = accountRepository.getAccountByUsername.bind(accountRepository);

  static findAccountWithPassword = accountRepository.getAccountWithPasswordByUsername.bind(accountRepository)

  static findAccountByRowId = accountRepository.getAccountByRowId.bind(accountRepository)

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