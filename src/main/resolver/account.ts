import { Account, Todo } from '.prisma/client'
import { container } from 'tsyringe'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { ILoginModel } from '../../domain/models/login'
import { SigninController } from '../../presentation/account/login-controller'
import { SignupController } from '../../presentation/account/signup-controller'
import { UserController } from '../../presentation/account/user-controller'
import { UserTodoController } from '../../presentation/account/user-todo-controller'
import { AccountSchema } from '../schema/account'
import { LoginSchema } from '../schema/login'

@Resolver(() => AccountSchema)
export class AccountResolver {
  @FieldResolver()
  async todo (@Root() user: Account): Promise<Todo[]> {
    return await container.resolve(UserTodoController).handle(user.id)
  }

  @Query(() => AccountSchema)
  async user (
    @Arg('email') email: string
  ): Promise<Account | null> {
    return await container.resolve(UserController).handle(email)
  }

  @Query(() => LoginSchema)
  async accountLogin (
    @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<ILoginModel> {
    return await container.resolve(SigninController).handle({ email, password })
  }

  @Mutation(() => AccountSchema)
  async userCreate (
    @Arg('name') name: string,
      @Arg('email') email: string,
      @Arg('password') password: string,
      @Arg('active') active: boolean
  ): Promise<Account> {
    return await container.resolve(SignupController).handle({ name, email, password, active })
  }
}
