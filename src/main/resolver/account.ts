import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { IAccountModel } from '../../domain/models/account'
import { ILoginModel } from '../../domain/models/login'
import { makeAddAccountController } from '../factory/add-account'
import { makeLoginController } from '../factory/login'
import { AccountSchema } from '../schema/account'
import { LoginSchema } from '../schema/login'

@Resolver()
export class AccountResolver {
  @Query(() => LoginSchema)
  async accountLogin (
    @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<ILoginModel> {
    const accountLogin = makeLoginController()
    return await accountLogin.handle({ email, password })
  }

  @Mutation(() => AccountSchema)
  async userCreate (
    @Arg('name') name: string,
      @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<IAccountModel> {
    const addAccount = makeAddAccountController()
    return await addAccount.handle({ name, email, password })
  }
}
