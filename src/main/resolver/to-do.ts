import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { TodoModel } from '../../domain/models/to-do'
import { IAddTodo } from '../../domain/usecases/add-to-do'
import { makeTodoController } from '../factory/add-to-do'
import { makeLoadTodoByUserIdController } from '../factory/load-todo'
import { makeUpdateTodoController } from '../factory/update-todo'
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

  @Query(() => [TodoSchema])
  async loadTodo (
    @Arg('user_id') user_id: string
  ): Promise<TodoModel[]> {
    const loadTodoByUserIdController = makeLoadTodoByUserIdController()
    return await loadTodoByUserIdController.handle({ user_id })
  }

  @Mutation(() => TodoSchema)
  async updateTodo (
    @Arg('todo_id') todo_id: string,
      @Arg('fields') fields: IAddTodo
  ): Promise<any> {
    const updateTodoController = makeUpdateTodoController()
    return await updateTodoController.handle({ todo_id, fields })
  }
}
