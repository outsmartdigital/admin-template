import { UserService } from './UserService'
import { User } from '../../models/User'
import axios from 'axios'

export class MockUserApiService implements UserService {
  static mockUser = new User('1')
  // mockUser.userName = 'teste'

  async getUsers(): Promise<User[]> {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log(users.data)
    return users.data
  }

  getUsersById(id: string): Promise<User> {
    return Promise.resolve(MockUserApiService.mockUser)
  }
}
