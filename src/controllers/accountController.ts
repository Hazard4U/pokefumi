import { Account } from '../models/Accout'
import AccountRepository from '../repositories/accountRepository'

const accountRepository = new AccountRepository()

const connection = (username: string, password: string): [Account, Error] => {
    if (username && password) {
        const accounts = accountRepository.connection(username, password)
        if (accounts) {
            return [accounts, null];
        } else {
            return [null, new Error("Wrong username or password")]
        }
    } else {
        return [null, new Error("Please enter a valid Username and Password!")];
    }
}

export { connection }