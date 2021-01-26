import { User } from '../../models/User'

export const initialUserState = {
  userIds: [] as string[],
}

export const userEntityState = {
  user: ({} as unknown) as User,
}
