import { GetInitialProps } from "../../utils/architecture/PageComponent";
import { HomePageProps } from "./HomePage";
import { GetHomePagePostsUC } from "../../services/posts/useCases/GetHomePagePostsUC";

export const getInitialProps: GetInitialProps<HomePageProps> = async ({
  container
}) => {
  const useCase = container.get(GetHomePagePostsUC);
  await useCase.execute();
  return {};
};
