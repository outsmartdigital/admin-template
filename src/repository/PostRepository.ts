import { Inject, Service } from "typedi";
import { GlobalService } from "../global/GlobalService";
import { Post } from "../models/Post";
import { mergeArrayEntityState } from "../global/_globalUtils/mergeArrayState";

@Service()
export class PostRepository {
  @Inject(GlobalService)
  global: GlobalService;

  async saveHomePagePosts(posts: Post[]): Promise<void> {
    const { setGlobal } = this.global;
    const { post } = mergeArrayEntityState(posts, {
      post: post => ({ id: post.id, entity: post })
    });
    await setGlobal({
      homePagePosts: post.ids,
      ...post.entities
    });
  }
}
