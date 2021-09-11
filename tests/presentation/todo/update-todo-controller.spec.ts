import { TodoModel } from '../../../src/domain/models/to-do'
import { IUpdateTodo, IUpdateTodoDb } from '../../../src/domain/usecases/update-todo'
import { UpdateTodoController } from '../../../src/presentation/todo/update-todo-controller'

const makeUpdateTodoStub = (): IUpdateTodoDb => {
  class UpdateTodoStub implements IUpdateTodoDb {
    async update (todoData: IUpdateTodo): Promise<TodoModel> {
      return {
        id: todoData.todo_id,
        ...todoData.fields
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
    const fakeDataToUpdate: IUpdateTodo = {
      todo_id: 'valid_id',
      fields: {
        name: 'valid_name',
        user_id: 'valid_user_id',
        description: 'valid_description',
        active: true
      }
    }
    const { sut, updateTodoStub } = makeSut()
    const updateTodoSpy = jest.spyOn(updateTodoStub, 'update')
    await sut.handle(fakeDataToUpdate)
    expect(updateTodoSpy).toBeCalledWith(fakeDataToUpdate)
  })

  test('should return with correct values', async () => {
    const fakeDataToUpdate: IUpdateTodo = {
      todo_id: 'valid_id',
      fields: {
        name: 'valid_name',
        user_id: 'valid_user_id',
        description: 'valid_description',
        active: true
      }
    }
    const { sut } = makeSut()
    const updatedTodo = await sut.handle(fakeDataToUpdate)
    expect(updatedTodo).toEqual({ id: fakeDataToUpdate.todo_id, ...fakeDataToUpdate.fields })
  })

  test('should throw if updateTodo throws', async () => {
    const fakeDataToUpdate: IUpdateTodo = {
      todo_id: 'valid_id',
      fields: {
        name: 'valid_name',
        user_id: 'valid_user_id',
        description: 'valid_description',
        active: true
      }
    }
    const { sut, updateTodoStub } = makeSut()
    jest.spyOn(updateTodoStub, 'update').mockImplementationOnce(async () => await Promise.reject(new Error('')))
    const updatedTodo = sut.handle(fakeDataToUpdate)
    await expect(updatedTodo).rejects.toThrow()
  })
})
