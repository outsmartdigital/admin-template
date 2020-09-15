import { GetInitialProps } from "../../utils/architecture/PageComponent";
import { HomePageProps } from "./HomePage";
import { buildEntityState } from "../../global/_globalUtils/buildEntityState";
import { Post } from "../../models/Post";

export const getInitialProps: GetInitialProps<HomePageProps> = async ({
  setGlobal
}) => {
  const post = new Post("123");
  post.title = "My Post";

  await setGlobal({
    homePagePosts: [post.id],
    ...buildEntityState(
      {
        post
      },
      post.id
    )
  });

  return {};
};
