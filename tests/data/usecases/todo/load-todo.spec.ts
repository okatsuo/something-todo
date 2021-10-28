import { Todo } from '.prisma/client'
import { LoadTodo } from '../../../../src/data/usecases/todo/load-todo'
import { ILoadDbTodo, ILoadTodo } from '../../../../src/domain/usecases/loadTodo'

const makeLoadTodoRepositoryStub = (): ILoadDbTodo => {
  class LoadTodoRepositoryStub implements ILoadDbTodo {
    async loadTodoByUser (todoData: ILoadTodo): Promise<Todo[]> {
      const { account_id } = todoData
      return [{
        account_id,
        active: true,
        id: 1,
        name: 'valid_name',
        description: 'valid_description'
      }]
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
      account_id: 1
    }
    const { sut, loadTodoRepositoryStub } = makeSut()
    const loadTodoRepositorySpy = jest.spyOn(loadTodoRepositoryStub, 'loadTodoByUser')
    await sut.loadTodoByUser(fakeUserId)
    expect(loadTodoRepositorySpy).toBeCalledWith(fakeUserId)
  })

  test('should throws if loadTodoRepository throws', async () => {
    const fakeUserId: ILoadTodo = {
      account_id: 1
    }
    const { sut, loadTodoRepositoryStub } = makeSut()
    jest.spyOn(loadTodoRepositoryStub, 'loadTodoByUser').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const todo = sut.loadTodoByUser(fakeUserId)
    await expect(todo).rejects.toThrow()
  })

  test('should returns with correct values', async () => {
    const fakeUserId: ILoadTodo = {
      account_id: 1
    }
    const { sut } = makeSut()
    const todo = await sut.loadTodoByUser(fakeUserId)
    expect(todo[0].account_id).toBe(fakeUserId.account_id)
    expect(todo[0].active).toBeDefined()
    expect(todo[0].name).toBeDefined()
    expect(todo[0].id).toBeDefined()
    expect(todo[0].description).toBeDefined()
  })
})
