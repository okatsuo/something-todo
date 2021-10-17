import { Todo } from '.prisma/client'
import { UpdateTodo } from '../../../../src/data/usecases/todo/update-todo'
import { IUpdateTodo, IUpdateTodoDb } from '../../../../src/domain/usecases/update-todo'

const makeUpdateTodoRepositoryStub = (): IUpdateTodoDb => {
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
    const fake_id = 1
    const fake_data_to_update: IUpdateTodo = {
      name: 'valid_name',
      account_id: 1,
      description: 'valid_description',
      active: true
    }
    const { sut, updateTodoRepositoryStub } = makeSut()
    const updateTodoRepositorySpy = jest.spyOn(updateTodoRepositoryStub, 'update')
    await sut.update(fake_id, fake_data_to_update)
    expect(updateTodoRepositorySpy).toBeCalledWith(fake_id, fake_data_to_update)
  })

  test('should return with correct values', async () => {
    const fake_id = 1
    const fake_data_to_update: IUpdateTodo = {
      name: 'valid_name',
      account_id: 1,
      description: 'valid_description',
      active: true
    }
    const { sut } = makeSut()
    const updatedTodo = await sut.update(fake_id, fake_data_to_update)
    expect(updatedTodo).toEqual({ id: fake_id, ...fake_data_to_update })
  })

  test('should throw if updateTodoRepository throws', async () => {
    const fake_id = 1
    const fake_data_to_update: IUpdateTodo = {
      name: 'valid_name',
      account_id: 1,
      description: 'valid_description',
      active: true
    }
    const { sut, updateTodoRepositoryStub } = makeSut()
    jest.spyOn(updateTodoRepositoryStub, 'update').mockImplementationOnce(async () => await Promise.reject(new Error('')))
    const updatedTodo = sut.update(fake_id, fake_data_to_update)
    await expect(updatedTodo).rejects.toThrow()
  })
})
