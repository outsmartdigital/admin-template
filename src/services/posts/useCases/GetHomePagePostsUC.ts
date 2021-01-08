import { Inject } from "typedi";

import { BaseUseCase } from "../../../utils/architecture/BaseUseCase";
import { Config } from "../../../config";
import { PostRepository } from "../../../repository/PostRepository";
import { PostService } from "../PostService";

export class GetHomePagePostsUC extends BaseUseCase {
  @Inject(Config)
  config: Config;

  @Inject(() => PostRepository)
  postRepo: PostRepository;

  @Inject(PostService)
  postService: PostService;

  async execute(): Promise<void> {
    const posts = await this.postService.getHomepagePosts();
    await this.postRepo.saveHomePagePosts(posts);
  }
}
