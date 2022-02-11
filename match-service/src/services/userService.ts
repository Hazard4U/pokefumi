import { User } from "../models/User";
import UserRepository from "../repositories/userRepository";

const userRepository = new UserRepository();

export default class UserService {
  static listUsers = (): User[] => {
    return userRepository.getAllUsers();
  };

  static findUser = (userId: number | bigint): User => {
    return userRepository.getUserById(userId);
  };

  static addUser = (name: string): User => {
    const rowId = userRepository.createUser(name);
    return this.findUser(rowId);
  };

  static deleteUser = (userId: number)=> {
    return userRepository.deleteUserById(userId)
  }
}
