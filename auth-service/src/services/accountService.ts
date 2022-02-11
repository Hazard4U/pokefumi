import AccountRepository from "../repositories/accountRepository";
import UserService from "./userService";
import { Account } from "../models/Accout";

const accountRepository = new AccountRepository();

export default class AccountService {
  static listAccounts = accountRepository.getAllAccounts.bind(accountRepository);

  static findAccount = accountRepository.getAccountByUsername.bind(accountRepository);

  static findAccountWithPassword = accountRepository.getAccountWithPasswordByUsername.bind(accountRepository)

  static findAccountByRowId = accountRepository.getAccountByRowId.bind(accountRepository)

  static addAccount = async (
    username: string,
    password: string
  ): Promise<Account> => { 
    let user;
    try {
      user = await UserService.addUser(username)
    } catch (error) {
      throw new Error("User already exists")
    }
    
    try {
      const rowId = accountRepository.signup(username, password, user.id);
      return this.findAccountByRowId(rowId);
    } catch (error) {
      await UserService.deleteUser(user.id)
      throw new Error("Account already exists")
    }
    
  };
}
