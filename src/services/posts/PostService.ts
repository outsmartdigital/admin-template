import { Token } from "typedi";
import { Post } from "../../models/Post";

export const PostService = new Token<PostService>("PostApiService");

export interface PostService {
  getHomepagePosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post>;
}
