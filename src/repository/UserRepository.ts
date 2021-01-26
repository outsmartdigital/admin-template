import { Inject, Service } from 'typedi'
import { GlobalService } from '../global/GlobalService'
import { mergeArrayEntityState } from '../global/_globalUtils/mergeArrayState'
import { useGlobal, useGlobalEntity } from '../global/_globalUtils/useGlobal'
import { mergeEntityState } from '../global/_globalUtils/mergeEntityState'
import { Context } from '../utils/architecture/di/contextService'
import { User } from '../models/User'

@Service()
export class UserRepository {
  @Inject(GlobalService)
  global: GlobalService

  @Inject(Context)
  context: Context

  async saveUser(user: User): Promise<User> {
    await this.global.setGlobal(
      mergeEntityState(user, {
        user: (item, oldItem) => ({
          id: item.id,
          entity: {
            ...oldItem,
            ...item,
          },
        }),
      })
    )
    return this.global.getGlobalEntity({ user: true }, user.id).user
  }

  async saveUsers(users: User[]): Promise<void> {
    const { setGlobal } = this.global
    const { user } = mergeArrayEntityState(users, {
      user: (user) => ({ id: user.id, entity: user }),
    })

    await setGlobal({
      userIds: user.ids,
      ...user.entities,
    })
  }

  public useUser(userId: string) {
    const [user] = useGlobalEntity({ user: true }, userId)
    return user
  }

  public useUsersIds() {
    const [users] = useGlobal('userIds')
    return users
  }
}
