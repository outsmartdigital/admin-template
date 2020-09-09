import { Inject } from "typedi";

import { BaseUseCase } from "../../../utils/architecture/BaseUseCase";
import { Config } from "../../../config";
import { PostRepository } from "../../../repository/PostRepository";
import { GraphqlClient } from "../../_common/graphql/graphqlClient";
import { GET_HOMEPAGE_POSTS } from "../queries/GET_HOMEPAGE_POSTS";
import { GetHomepagePosts } from "../../_common/graphql/types/GetHomepagePosts";
import { PostMapper } from "../mappers/PostMapper";

export class GetHomePagePostsUC extends BaseUseCase {
  @Inject(Config)
  config: Config;

  @Inject(() => PostRepository)
  postRepo: PostRepository;

  @Inject(GraphqlClient)
  graphqlClient: GraphqlClient;

  @Inject(() => PostMapper)
  postMapper: PostMapper;

  constructor() {
    super();
    console.log("Constructed UC");
  }

  async execute(): Promise<void> {
    debugger;
    const res = await this.graphqlClient
      .query<GetHomepagePosts>({
        query: GET_HOMEPAGE_POSTS
      })
      .catch(console.log);
    await this.postRepo.saveHomePagePosts(
      this.getMockPosts() // TODO Instead of this we should be using the actual response from the backend
    );
  }

  private getMockPosts() {
    return this.postMapper.mapPostsToAppModel([
      {
        id: "123",
        authorId: "1",
        body: "My First Post",
        title: "My First Post"
      },
      {
        id: "124",
        authorId: "1",
        body: "My Second Post",
        title: "My Second Post"
      }
    ]);
  }
}
