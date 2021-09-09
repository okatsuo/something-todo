import { LoadTodo } from '../../../../src/data/usecases/todo/list-todo'
import { TodoModel } from '../../../../src/domain/models/to-do'
import { ILoadDbTodo, ILoadTodo } from '../../../../src/domain/usecases/loadTodo'

const makeLoadTodoRepositoryStub = (): ILoadDbTodo => {
  class LoadTodoRepositoryStub implements ILoadDbTodo {
    async loadTodoByUser (todoData: ILoadTodo): Promise<TodoModel> {
      const { user_id } = todoData
      return {
        user_id,
        active: true,
        id: 'valid_id',
        name: 'valid_name',
        description: 'valid_description'
      }
    }
  }
  return new LoadTodoRepositoryStub()
}

interface SutTypes {
  loadTodoRepositoryStub: ILoadDbTodo
  sut: LoadTodo
}

const makeSut = (): SutTypes => {
  const loadTodoRepositoryStub = makeLoadTodoRepositoryStub()
  const sut = new LoadTodo(loadTodoRepositoryStub)
  return {
    loadTodoRepositoryStub,
    sut
  }
}

describe('Load todo', () => {
  test('should calls loadTodoRepository with correct values', async () => {
    const fakeUserId: ILoadTodo = {
      user_id: 'valid_id'
    }
    const { sut, loadTodoRepositoryStub } = makeSut()
    const loadTodoRepositorySpy = jest.spyOn(loadTodoRepositoryStub, 'loadTodoByUser')
    await sut.loadTodoByUser(fakeUserId)
    expect(loadTodoRepositorySpy).toBeCalledWith(fakeUserId)
  })
})
