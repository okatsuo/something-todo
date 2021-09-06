import { Arg, Query, Resolver } from 'type-graphql'
import { makeTodoController } from '../factory/add-to-do'
import { TodoSchema } from '../schema/to-do'

@Resolver()
export class TodoResolver {
  @Query(() => TodoSchema)
  todoCreate (
    @Arg('name') name: string,
      @Arg('description', { nullable: true }) description: string,
      @Arg('user_id') userId: string,
      @Arg('active', { nullable: true }) active: boolean
  ): any {
    const todoController = makeTodoController()
    return todoController.handle({ name, user_id: userId, active, description })
  }
}
