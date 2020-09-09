import { Inject, Service } from "typedi";
import { MockPostApiModel } from "../../_common/graphql/types/MockPostApiModel";
import { Post } from "../../../models/Post";
import { GlobalService } from "../../../global/GlobalService";

@Service()
export class PostMapper {
  @Inject(GlobalService)
  private globalService: GlobalService;

  mapPostToAppModel(apiPost: MockPostApiModel) {
    const post = new Post(apiPost.id);
    post.title = apiPost.title;
    post.authorId = apiPost.authorId;
    post.body = apiPost.body;
    post.author = this.globalService.getGlobalEntity(
      { user: true },
      apiPost.authorId
    ).user;
    return post;
  }

  mapPostsToAppModel(apiPosts: MockPostApiModel[]) {
    return apiPosts.map(this.mapPostToAppModel);
  }
}
