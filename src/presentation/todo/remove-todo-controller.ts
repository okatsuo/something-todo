import { IRemoveTodo, IRemoveTodoDb } from '../../domain/usecases/remove-todo'
import { Controller } from '../protocols/controllers'

export class RemoveTodoController implements Controller {
  constructor (
    private readonly removeTodo: IRemoveTodoDb
  ) {}

  async handle (data: IRemoveTodo): Promise<boolean> {
    return await this.removeTodo.remove(data)
  }
}
