import { inject, injectable } from 'tsyringe'
import { IRemoveTodo, IRemoveTodoDb } from '../../../domain/usecases/remove-todo'

@injectable()
export class RemoveTodo implements IRemoveTodoDb {
  constructor (
    @inject('TodoRepository')
    private readonly removeTodoRepository: IRemoveTodoDb
  ) {}

  async remove (data: IRemoveTodo): Promise<boolean> {
    return await this.removeTodoRepository.remove(data)
  }
}
