import { Todo } from '.prisma/client'
import { IUpdateTodo, IUpdateTodoDb } from '../../../src/domain/usecases/update-todo'
import { UpdateTodoController } from '../../../src/presentation/todo/update-todo-controller'

const makeUpdateTodoStub = (): IUpdateTodoDb => {
  class UpdateTodoStub implements IUpdateTodoDb {
    async update (id: number, todoData: IUpdateTodo): Promise<Todo> {
      return {
        id,
        ...todoData
      }
    }
  }
  return new UpdateTodoStub()
}

interface SutTypes {
  updateTodoStub: IUpdateTodoDb
  sut: UpdateTodoController
}

const makeSut = (): SutTypes => {
  const updateTodoStub = makeUpdateTodoStub()
  const sut = new UpdateTodoController(updateTodoStub)
  return {
    updateTodoStub,
    sut
  }
}

describe('UpdateTodo controller', () => {
  test('should call the updateTodo with correct values', async () => {
    const fake_id = 1
    const fakeDataToUpdate: IUpdateTodo = {
      name: 'valid_name',
      account_id: 1,
      description: 'valid_description',
      active: true
    }
    const { sut, updateTodoStub } = makeSut()
    const updateTodoSpy = jest.spyOn(updateTodoStub, 'update')
    await sut.handle(fake_id, fakeDataToUpdate)
    expect(updateTodoSpy).toBeCalledWith(fake_id, fakeDataToUpdate)
  })

  test('should return with correct values', async () => {
    const fake_id = 1
    const fakeDataToUpdate: IUpdateTodo = {
      name: 'valid_name',
      account_id: 1,
      description: 'valid_description',
      active: true
    }
    const { sut } = makeSut()
    const updatedTodo = await sut.handle(fake_id, fakeDataToUpdate)
    expect(updatedTodo).toEqual({ id: 1, ...fakeDataToUpdate })
  })

  test('should throw if updateTodo throws', async () => {
    const fake_id = 1
    const fakeDataToUpdate: IUpdateTodo = {
      name: 'valid_name',
      account_id: 1,
      description: 'valid_description',
      active: true
    }
    const { sut, updateTodoStub } = makeSut()
    jest.spyOn(updateTodoStub, 'update').mockImplementationOnce(async () => await Promise.reject(new Error('')))
    const updatedTodo = sut.handle(fake_id, fakeDataToUpdate)
    await expect(updatedTodo).rejects.toThrow()
  })
})
