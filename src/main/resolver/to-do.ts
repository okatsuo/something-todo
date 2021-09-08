import { Arg, Mutation, Resolver } from 'type-graphql'
import { TodoModel } from '../../domain/models/to-do'
import { makeTodoController } from '../factory/add-to-do'
import { TodoSchema } from '../schema/to-do'

@Resolver()
export class TodoResolver {
  @Mutation(() => TodoSchema)
  async todoCreate (
    @Arg('user_id') user_id: string,
      @Arg('name') name: string,
      @Arg('description', { nullable: true }) description: string,
      @Arg('active') active: boolean
  ): Promise<TodoModel> {
    const todoController = makeTodoController()
    return await todoController.handle({ name, user_id, active, description })
  }
}
