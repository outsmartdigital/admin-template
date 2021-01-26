import { Token } from 'typedi'
import { User } from '../../models/User'

export const UserService = new Token<UserService>('UserApiService')

export interface UserService {
  getUsers(): Promise<User[]>
  getUsersById(id: string): Promise<User>
}
