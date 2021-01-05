import { Inject } from "typedi";

import { BaseUseCase } from "../../../utils/architecture/BaseUseCase";
import { PostRepository } from "../../../repository/PostRepository";
import { GraphqlClient } from "../../_common/graphql/graphqlClient";
import { PostMapper } from "../mappers/PostMapper";

export class GetPostUc extends BaseUseCase<string> {
  @Inject(() => PostRepository)
  postRepo: PostRepository;

  @Inject(GraphqlClient)
  graphqlClient: GraphqlClient;

  @Inject(() => PostMapper)
  postMapper: PostMapper;

  async execute(postId: string): Promise<void> {
    await this.postRepo.savePost(
      this.postMapper.mapPostToAppModel({
        id: "123",
        authorId: "1",
        body: "My First Post",
        title: "My First Post"
      })
    );
  }
}
