import { Account } from '../models/Accout'
import AccountRepository from '../repositories/accountRepository'

const accountRepository = new AccountRepository()

const connection = (username: string, password: string) => {
    return accountRepository.connection(username, password);
}