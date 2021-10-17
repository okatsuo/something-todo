import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { IAddTodo, IDbAddTodo } from '../../../domain/usecases/add-to-do'

@injectable()
export class AddTodo implements IDbAddTodo {
  constructor (
    @inject('TodoRepository')
    private readonly addTodoRepository: IDbAddTodo
  ) {}

  async add (todoData: IAddTodo): Promise<Todo> {
    const todo = await this.addTodoRepository.add(todoData)
    return todo
  }
}
