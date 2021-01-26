import { UserRole } from './UserRole'

export class User {
  constructor(public id: string) {}

  name?: string
  email?: string
  username: string
  role?: UserRole
  phone?: string
}
