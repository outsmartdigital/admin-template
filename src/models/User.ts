import { UserRole } from './UserRole'

export class User {
  constructor(public id: string) {}

  name?: string
  email?: string
  userName: string
  role?: UserRole
  phone?: string
}
