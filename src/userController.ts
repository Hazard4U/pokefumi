import { User } from './model'
import userRepository from './userRepository'

export const listUsers = (): User[] => {
    return userRepository.getAllUsers()
}

export const findUser = (userId: number): User | undefined => {
    return userRepository.findUser(userId)
}

export const addUser = (newUser: User): User[] => {
    userRepository.createUser(newUser.name)
    return userRepository.getAllUsers()
}  