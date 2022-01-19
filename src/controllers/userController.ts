import UserService from "../services/userService";

export default class UserController {
  static listUsers = UserService.listUsers;

  static findUser = UserService.findUser;

  static addUser = UserService.addUser;
}
