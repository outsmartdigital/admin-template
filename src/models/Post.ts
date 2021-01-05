import { User } from "./User";

export class Post {
  constructor(public id: string) {}

  title?: string;
  authorId?: string;
  body?: string;
  author?: User;
}
