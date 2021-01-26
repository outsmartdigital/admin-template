import { GetInitialProps } from '../../utils/architecture/PageComponent'
import { ManageUsersProps } from './ManageUsers'
import { GetHomePagePostsUC } from '../../services/posts/useCases/GetHomePagePostsUC'

export const getInitialProps: GetInitialProps<ManageUsersProps> = async ({ container }) => {
  const useCase = container.get(GetHomePagePostsUC)
  try {
    await useCase.execute()
  } catch (e) {
    return {
      internalError: e,
    }
  }
  return {}
}
