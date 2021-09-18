import { IRemoveTodo, IRemoveTodoDb } from '../../../domain/usecases/remove-todo'

export class RemoveTodo implements IRemoveTodoDb {
  constructor (
    private readonly removeTodoRepository: IRemoveTodoDb
  ) {}

  async remove (data: IRemoveTodo): Promise<boolean> {
    return await this.removeTodoRepository.remove(data)
  }
}
