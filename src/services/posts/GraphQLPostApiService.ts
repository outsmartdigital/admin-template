import { Inject } from "typedi";

import { GraphqlClient } from "../_common/graphql/graphqlClient";
import { GetHomepagePosts } from "../_common/graphql/types/GetHomepagePosts";
import { GET_HOMEPAGE_POSTS } from "./queries/GET_HOMEPAGE_POSTS";
import { PostMapper } from "./mappers/PostMapper";
import { PostService } from "./PostService";
import { Post } from "../../models/Post";
import { handleGraphQlError } from "../_common/graphql/utils/translateGraphQlError";

export class GraphQLPostApiService implements PostService {
  @Inject(GraphqlClient)
  private client: GraphqlClient;

  @Inject(() => PostMapper)
  postMapper: PostMapper;

  async getHomepagePosts() {
    const response = await this.client
      .query<GetHomepagePosts>({
        query: GET_HOMEPAGE_POSTS
      })
      .catch(handleGraphQlError());

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

  getPostById(id: string): Promise<Post> {
    return Promise.resolve({
      id: "124",
      authorId: "1",
      body: "My Second Post Updated",
      title: "My Second Post Updated"
    });
  }
}
