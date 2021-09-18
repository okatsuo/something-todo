import { RemoveTodo } from '../../../../src/data/usecases/todo/remove-todo'
import { IRemoveTodo, IRemoveTodoDb } from '../../../../src/domain/usecases/remove-todo'

const makeRemoveTodoRepositoryStub = (): IRemoveTodoDb => {
  class RemoveTodoRepositoryStub implements IRemoveTodoDb {
    async remove (data: IRemoveTodo): Promise<boolean> {
      return true
    }
  }
  return new RemoveTodoRepositoryStub()
}

interface SutTypes {
  removeTodoRepositoryStub: IRemoveTodoDb
  sut: RemoveTodo
}

const makeSut = (): SutTypes => {
  const removeTodoRepositoryStub = makeRemoveTodoRepositoryStub()
  const sut = new RemoveTodo(removeTodoRepositoryStub)
  return {
    removeTodoRepositoryStub,
    sut
  }
}

describe('RemoveTodoController', () => {
  test('should return true if is valid id', async () => {
    const fakeId: IRemoveTodo = {
      id: 'valid_id'
    }
    const { sut } = makeSut()
    const removed = await sut.remove(fakeId)
    expect(removed).toBe(true)
  })

  test('should return false if is invalid id', async () => {
    const fakeId: IRemoveTodo = {
      id: 'invalid_id'
    }
    const { sut, removeTodoRepositoryStub } = makeSut()
    jest.spyOn(removeTodoRepositoryStub, 'remove').mockImplementationOnce(async () => false)
    const removed = await sut.remove(fakeId)
    expect(removed).toBe(false)
  })
})
