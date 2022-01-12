import { User } from './model'
import UserRepository from './userRepository'

const userRepository = new UserRepository()

const listUsers = (): User[] => {
    return userRepository.getAllUsers()
}

const findUser = (userId: number): User[] => {
    return userRepository.getUserById(userId)
}

const addUser = (newUser: User): User[] => {
    userRepository.createUser(newUser.name)
    return userRepository.getAllUsers()
}

export { listUsers, findUser, addUser }