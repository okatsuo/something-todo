import { Todo } from '.prisma/client'
import { ILoadDbTodo, ILoadTodo } from '../../../src/domain/usecases/loadTodo'
import { LoadTodoController } from '../../../src/presentation/todo/load-todo-controller'

const makeLoadTodoByUserStub = (): ILoadDbTodo => {
  class LoadTodoByUserStub implements ILoadDbTodo {
    async loadTodoByUser (data: ILoadTodo): Promise<Todo[]> {
      return [{
        ...data,
        name: 'valid_name',
        active: true,
        description: 'valid_description',
        id: 1
      }]
    }
  }
  return new LoadTodoByUserStub()
}

interface SutTypes {
  sut: LoadTodoController
  loadTodoByUserStub: ILoadDbTodo
}

const makeSut = (): SutTypes => {
  const loadTodoByUserStub = makeLoadTodoByUserStub()
  const sut = new LoadTodoController(loadTodoByUserStub)
  return {
    loadTodoByUserStub,
    sut
  }
}

describe('Load todo by user', () => {
  test('should calls loadTodoByUser with correct values', async () => {
    const fakeUserId: ILoadTodo = {
      account_id: 1
    }
    const { sut, loadTodoByUserStub } = makeSut()
    const loadTodoByUserSpy = jest.spyOn(loadTodoByUserStub, 'loadTodoByUser')
    await sut.handle(fakeUserId)
    expect(loadTodoByUserSpy).toBeCalledWith(fakeUserId)
  })

  test('should return with correct values', async () => {
    const fakeUserId: ILoadTodo = {
      account_id: 1
    }
    const { sut } = makeSut()
    const todo = await sut.handle(fakeUserId)
    expect(todo).toEqual([{
      ...fakeUserId,
      name: 'valid_name',
      active: true,
      description: 'valid_description',
      id: 1
    }])
  })
})
