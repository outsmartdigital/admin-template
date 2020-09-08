import { Inject } from "typedi";

import { BaseUseCase } from "../../../utils/architecture/BaseUseCase";
import { Config } from "../../../config";
import { PostRepository } from "../../../repository/PostRepository";
import { Post } from "../../../models/Post";

export class GetHomePagePosts extends BaseUseCase {
  @Inject(Config)
  config: Config;

  @Inject(() => PostRepository)
  postRepo: PostRepository;

  async execute(): Promise<void> {
    const post = new Post("123");
    post.title = "My Post";

    const post2 = new Post("124");
    post2.title = "My Second Post";

    await this.postRepo.saveHomePagePosts([post, post2]);
  }
}
