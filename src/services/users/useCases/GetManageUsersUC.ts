import { Inject } from 'typedi'

import { BaseUseCase } from '../../../utils/architecture/BaseUseCase'
import { Config } from '../../../config'
import { UserService } from '../UserService'
import { UserRepository } from '../../../repository/UserRepository'

export class GetManageUsersUC extends BaseUseCase {
  @Inject(Config)
  config: Config

  @Inject(() => UserRepository)
  userRepo: UserRepository

  @Inject(UserService)
  userService: UserService

  async execute(): Promise<void> {
    console.log('executou get posts')
    const users = await this.userService.getUsers()
    console.log('REPO\n')
    console.log(users)

    await this.userRepo.saveUsers(users)
  }
}
