import { UserRole } from "./UserRole";

export class User {
  constructor(private id: string) {}

  name?: string;
  email?: string;
  role?: UserRole;
  userName: string;
}
