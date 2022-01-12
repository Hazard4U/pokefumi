import { Account } from './model'
import AccountRepository from './accountRepository'

const accountRepository = new AccountRepository()

const connection = (username: string, password: string) => {
    return accountRepository.connection(username, password);
}