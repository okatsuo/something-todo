import { Todo } from '.prisma/client'
import { container } from 'tsyringe'
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { IUpdateTodo } from '../../domain/usecases/update-todo'
import { LoadTodoController } from '../../presentation/todo/load-todo-controller'
import { RemoveTodoController } from '../../presentation/todo/remove-todo-controller'
import { UpdateTodoController } from '../../presentation/todo/update-todo-controller'
import { makeTodoController } from '../factory/add-to-do'
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
    return await container.resolve(LoadTodoController).handle({ account_id })
  }

  @Mutation(() => TodoSchema)
  async updateTodo (
    @Arg('id', () => Int) id: number,
      @Arg('fields') fields: IUpdateTodo
  ): Promise<any> {
    return await container.resolve(UpdateTodoController).handle(id, fields)
  }

  @Mutation(() => Boolean)
  async removeTodo (
    @Arg('id', () => Int) id: number
  ): Promise<boolean> {
    return await container.resolve(RemoveTodoController).handle({ id })
  }
}
