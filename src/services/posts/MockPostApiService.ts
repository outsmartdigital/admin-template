import { PostService } from "./PostService";
import { Post } from "../../models/Post";

export class MockPostApiService implements PostService {
  async getHomepagePosts(): Promise<Post[]> {
    const post1 = new Post("1");
    post1.title = "Mock Post 1";
    const post2 = new Post("2");
    post2.title = "Mock Post 2";
    return [post1, post2];
  }

  getPostById(id: string): Promise<Post> {
    return Promise.resolve({
      id: "124",
      authorId: "1",
      body: "My Second Post Updated",
      title: "My Second Post Updated"
    });
  }
}
