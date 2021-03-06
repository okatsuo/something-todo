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
  test('should return true if to-do was removed', async () => {
    const fakeId: IRemoveTodo = {
      id: 1
    }
    const { sut } = makeSut()
    const removed = await sut.remove(fakeId)
    expect(removed).toBe(true)
  })

  test('should return false if to-do dont exist', async () => {
    const fakeId: IRemoveTodo = {
      id: 1
    }
    const { sut, removeTodoRepositoryStub } = makeSut()
    jest.spyOn(removeTodoRepositoryStub, 'remove').mockImplementationOnce(async () => false)
    const removed = await sut.remove(fakeId)
    expect(removed).toBe(false)
  })

  test('should call todoRepository with correct values', async () => {
    const fakeId: IRemoveTodo = {
      id: 1
    }
    const { sut, removeTodoRepositoryStub } = makeSut()
    const removeTodoRepositorySpy = jest.spyOn(removeTodoRepositoryStub, 'remove')
    await sut.remove(fakeId)
    expect(removeTodoRepositorySpy).toBeCalledWith(fakeId)
  })
})
