import { Post } from "../../models/Post";

export const initialPostState = {
  homePagePosts: [] as string[],
  postsLoading: false
};

export const postEntityState = {
  post: ({} as unknown) as Post
};
