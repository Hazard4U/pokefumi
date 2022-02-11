import axios from 'axios'
import { User } from '../models/User'

const userUrl = "http://localhost:5001/user/"

export default class UserRepository {
  async addUser(name: string): Promise<User> {
    return await (await axios.post<User>(userUrl, { name })).data
  } 

  async deleteUser(userId: number): Promise<void> {
    return await axios.delete(userUrl + userId)
  }
}