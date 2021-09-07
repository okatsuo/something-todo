import { Arg, Mutation, Resolver } from 'type-graphql'
import { makeTodoController } from '../factory/add-to-do'
import { TodoSchema } from '../schema/to-do'

@Resolver()
export class TodoResolver {
  @Mutation(() => TodoSchema)
  todoCreate (
    @Arg('user_id') userId: string,
      @Arg('name') name: string,
      @Arg('description', { nullable: true }) description: string,
      @Arg('active') active: boolean
  ): any {
    const todoController = makeTodoController()
    return todoController.handle({ name, user_id: userId, active, description })
  }
}
