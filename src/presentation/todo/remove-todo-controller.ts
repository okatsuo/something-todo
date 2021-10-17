import { inject, injectable } from 'tsyringe'
import { IRemoveTodo, IRemoveTodoDb } from '../../domain/usecases/remove-todo'
import { Controller } from '../protocols/controllers'

@injectable()
export class RemoveTodoController implements Controller {
  constructor (
    @inject('DatabaseRemoveTodo')
    private readonly removeTodo: IRemoveTodoDb
  ) {}

  async handle (data: IRemoveTodo): Promise<boolean> {
    return await this.removeTodo.remove(data)
  }
}
