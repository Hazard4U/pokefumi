import { User } from '../models/User'
import * as UserService from '../services/userService'

const listUsers = UserService.listUsers

const findUser = UserService.findUser

const addUser = UserService.addUser

export { listUsers, findUser, addUser }