import { Inject, Service } from "typedi";

import { GlobalService } from "../global/GlobalService";
import { Post } from "../models/Post";
import { mergeArrayEntityState } from "../global/_globalUtils/mergeArrayState";
import { useGlobal, useGlobalEntity } from "../global/_globalUtils/useGlobal";
import { Context } from "../utils/architecture/di/contextService";
import { mergeEntityState } from "../global/_globalUtils/mergeEntityState";

@Service()
export class PostRepository {
  @Inject(GlobalService)
  global: GlobalService;

  @Inject(Context)
  context: Context;

  async savePost(post: Post): Promise<Post> {
    await this.global.setGlobal(
      mergeEntityState(post, {
        post: (item, oldItem) => ({
          id: item.id,
          entity: {
            ...oldItem,
            ...item
          }
        })
      })
    );
    return this.global.getGlobalEntity({ post: true }, post.id).post;
  }

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

  public usePost(postId: string) {
    const [post] = useGlobalEntity({ post: true }, postId);
    return post;
  }

  public useHomePagePostIds() {
    const [posts] = useGlobal("homePagePosts");
    return posts;
  }
}
