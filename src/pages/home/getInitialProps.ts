import { GetInitialProps } from "../../utils/architecture/PageComponent";
import { HomePageProps } from "./HomePage";
import { GetHomePagePosts } from "../../services/posts/useCases/GetHomePagePosts";

export const getInitialProps: GetInitialProps<HomePageProps> = async ({
  container
}) => {
  const useCase = container.get(GetHomePagePosts);
  await useCase.execute();
  return {};
};
