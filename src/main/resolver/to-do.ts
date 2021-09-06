import { Arg, Query, Resolver } from 'type-graphql'
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
    return { userId, name, description }
  }
}
