import { User } from "../models/User";
import UserRepository from "../repositories/userRepository";

const userRepository = new UserRepository();

export default class UserService {
  static listUsers(){
    return userRepository.getAllUsers();
  };

  static findUser(userId: number | bigint){
    return userRepository.getUserById(userId);
  };

  static addUser(name: string){
    const rowId = userRepository.createUser(name);
    return this.findUser(rowId);
  };
}
