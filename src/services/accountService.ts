import AccountRepository from '../repositories/accountRepository'
import UserRepository from '../repositories/userRepository';
import { Account } from '../models/Accout'
import { addUser } from './userService'

const accountRepository = new AccountRepository();

const listAccounts = (): Account[] => {
    return accountRepository.getAllAccounts()
}

const findAccount = (username: string): Account => {
    return accountRepository.getAccountByUsername(username);
}

const findAccountByRowId = (rowId: number | bigint): Account => {
    return accountRepository.getAccountByRowId(rowId);
}

const addAccount = (username: string, password: string, user_id: string): Account => {
    const rowId = accountRepository.signup(username, password, user_id);
    return findAccountByRowId(rowId);
}

const signup = (username: string, password: string, name: string): Account => {
    let account
    console.log("signup", username, password, name)
    
    const createSignUp = accountRepository.db.transaction(() => {
        const user = addUser(name);
        account = addAccount(username, password, '' + user.id)
    })
    createSignUp();

    console.log(account)
    return account
}

export { listAccounts, signup }