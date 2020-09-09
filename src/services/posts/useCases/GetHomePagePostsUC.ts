import { Inject } from "typedi";

import { BaseUseCase } from "../../../utils/architecture/BaseUseCase";
import { Config } from "../../../config";
import { PostRepository } from "../../../repository/PostRepository";
import { Post } from "../../../models/Post";
import { GraphqlClient } from "../../_common/graphql/graphqlClient";
import { GET_HOMEPAGE_POSTS } from "../queries/GET_HOMEPAGE_POSTS";
import { GetHomepagePosts } from "../../types/GetHomepagePosts";

export class GetHomePagePostsUC extends BaseUseCase {
  @Inject(Config)
  config: Config;

  @Inject(() => PostRepository)
  postRepo: PostRepository;

  @Inject(GraphqlClient)
  graphqlClient: GraphqlClient;

  async execute(): Promise<void> {
    const res = await this.graphqlClient
      .query<GetHomepagePosts>({
        query: GET_HOMEPAGE_POSTS
      })
      .catch(console.log);
    console.log(res?.data?.allAreas?.totalCount);
    await this.postRepo.saveHomePagePosts(GetHomePagePostsUC.getMockPosts());
  }

  private static getMockPosts() {
    const post = new Post("123");
    post.title = "My Post";

    const post2 = new Post("124");
    post2.title = "My Second Post";
    return [post, post2];
  }
}
