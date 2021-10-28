import { IRemoveTodo, IRemoveTodoDb } from '../../../src/domain/usecases/remove-todo'
import { RemoveTodoController } from '../../../src/presentation/todo/remove-todo-controller'

const makeRemoveTodoStub = (): IRemoveTodoDb => {
  class RemoveTodoStub implements IRemoveTodoDb {
    async remove (data: IRemoveTodo): Promise<boolean> {
      return true
    }
  }
  return new RemoveTodoStub()
}

interface SutTypes {
  removeTodoStub: IRemoveTodoDb
  sut: RemoveTodoController
}

const makeSut = (): SutTypes => {
  const removeTodoStub = makeRemoveTodoStub()
  const sut = new RemoveTodoController(removeTodoStub)
  return {
    removeTodoStub,
    sut
  }
}

describe('RemoveTodoController', () => {
  test('should return true if is valid id', async () => {
    const fakeId: IRemoveTodo = {
      id: 1
    }
    const { sut } = makeSut()
    const removed = await sut.handle(fakeId)
    expect(removed).toBe(true)
  })

  test('should return false if is invalid id', async () => {
    const fakeId: IRemoveTodo = {
      id: 0
    }
    const { sut, removeTodoStub } = makeSut()
    jest.spyOn(removeTodoStub, 'remove').mockImplementationOnce(async () => false)
    const removed = await sut.handle(fakeId)
    expect(removed).toBe(false)
  })
})
