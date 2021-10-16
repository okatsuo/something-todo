import { Todo } from '.prisma/client'
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { IUpdateTodo } from '../../domain/usecases/update-todo'
import { makeTodoController } from '../factory/add-to-do'
import { makeLoadTodoByUserIdController } from '../factory/load-todo'
import { makeRemoveTodoController } from '../factory/remove-todo'
import { makeUpdateTodoController } from '../factory/update-todo'
import { TodoSchema } from '../schema/to-do'

@Resolver()
export class TodoResolver {
  @Mutation(() => TodoSchema)
  async todoCreate (
    @Arg('user_id', () => Int) account_id: number,
      @Arg('name') name: string,
      @Arg('description', { nullable: true }) description: string,
      @Arg('active') active: boolean
  ): Promise<Todo> {
    const todoController = makeTodoController()
    return await todoController.handle({ name, account_id, active, description })
  }

  @Query(() => [TodoSchema])
  async loadTodo (
    @Arg('user_id', () => Int) account_id: number
  ): Promise<Todo[]> {
    const loadTodoByUserIdController = makeLoadTodoByUserIdController()
    return await loadTodoByUserIdController.handle({ account_id })
  }

  @Mutation(() => TodoSchema)
  async updateTodo (
    @Arg('id', () => Int) id: number,
      @Arg('fields') fields: IUpdateTodo
  ): Promise<any> {
    const updateTodoController = makeUpdateTodoController()
    return await updateTodoController.handle(id, fields)
  }

  @Mutation(() => Boolean)
  async removeTodo (
    @Arg('id', () => Int) id: number
  ): Promise<boolean> {
    const removeTodoController = makeRemoveTodoController()
    return await removeTodoController.handle({ id })
  }
}
