import { UpdateTodo } from '../../../../src/data/usecases/todo/update-todo'
import { TodoModel } from '../../../../src/domain/models/to-do'
import { IUpdateTodo, IUpdateTodoDb } from '../../../../src/domain/usecases/update-todo'

const makeUpdateTodoRepositoryStub = (): IUpdateTodoDb => {
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
  updateTodoRepositoryStub: IUpdateTodoDb
  sut: UpdateTodo
}

const makeSut = (): SutTypes => {
  const updateTodoRepositoryStub = makeUpdateTodoRepositoryStub()
  const sut = new UpdateTodo(updateTodoRepositoryStub)
  return {
    updateTodoRepositoryStub,
    sut
  }
}

describe('UpdateTodo', () => {
  test('should call the updateTodoRepository with correct values', async () => {
    const fakeDataToUpdate: IUpdateTodo = {
      todo_id: 'valid_id',
      fields: {
        name: 'valid_name',
        user_id: 'valid_user_id',
        description: 'valid_description',
        active: true
      }
    }
    const { sut, updateTodoRepositoryStub } = makeSut()
    const updateTodoRepositorySpy = jest.spyOn(updateTodoRepositoryStub, 'update')
    await sut.update(fakeDataToUpdate)
    expect(updateTodoRepositorySpy).toBeCalledWith(fakeDataToUpdate)
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
    const updatedTodo = await sut.update(fakeDataToUpdate)
    expect(updatedTodo).toEqual({ id: fakeDataToUpdate.todo_id, ...fakeDataToUpdate.fields })
  })

  test('should throw if updateTodoRepository throws', async () => {
    const fakeDataToUpdate: IUpdateTodo = {
      todo_id: 'valid_id',
      fields: {
        name: 'valid_name',
        user_id: 'valid_user_id',
        description: 'valid_description',
        active: true
      }
    }
    const { sut, updateTodoRepositoryStub } = makeSut()
    jest.spyOn(updateTodoRepositoryStub, 'update').mockImplementationOnce(async () => await Promise.reject(new Error('')))
    const updatedTodo = sut.update(fakeDataToUpdate)
    await expect(updatedTodo).rejects.toThrow()
  })
})
