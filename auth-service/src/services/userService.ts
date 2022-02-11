import UserRepository from "../repositories/userRepository";
import { User } from "../models/User";

const userRepository = new UserRepository()

export default class UserService {
  static addUser = async (name: string ): Promise<User> => {
    return await userRepository.addUser(name);
  }

  static deleteUser = async (userId: number): Promise<void> => {
    return await userRepository.deleteUser(userId)
  }
}