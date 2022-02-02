import AccountRepository from "../repositories/accountRepository";
import { Account } from "../models/Accout";

const accountRepository = new AccountRepository();

export default class AccountService {
  static listAccounts = accountRepository.getAllAccounts.bind(accountRepository);

  static findAccount = accountRepository.getAccountByUsername.bind(accountRepository);

  static findAccountWithPassword = accountRepository.getAccountWithPasswordByUsername.bind(accountRepository)

  static findAccountByRowId = accountRepository.getAccountByRowId.bind(accountRepository)

  static addAccount = (
    username: string,
    password: string
  ): Account => {
    const rowId = accountRepository.signup(username, password);
    return this.findAccountByRowId(rowId);
  };
}
