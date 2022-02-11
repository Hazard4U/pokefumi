import UserService from "../services/userService";

export default class UserController {
  static listUsers(){
    return UserService.listUsers();
  };

  static findUser(userId: number | bigint){
    return UserService.findUser(userId);
  };

  static addUser(name: string){
    return UserService.addUser(name);
  }

  static deleteUser(userId: number){
    return UserService.deleteUser(userId)
  }
}
