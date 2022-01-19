import { User } from '../models/User'
import UserRepository from '../repositories/userRepository'

const userRepository = new UserRepository()

const listUsers = (): User[] => {
    return userRepository.getAllUsers()
}

const findUser = (userId: number | bigint): User => {
    return userRepository.getUserById(userId)
}

const addUser = (name: string): User => {
    const rowId = userRepository.createUser(name)
    return findUser(rowId);
}

export { listUsers, findUser, addUser }