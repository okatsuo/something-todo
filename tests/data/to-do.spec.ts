import { Todo } from '../../src/data/usecases/to-do'
import { TodoModel } from '../../src/domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../src/domain/usecases/add-to-do'

const makeAddTodoRepository = (): IDbAddTodo => {
  class AddTodoRepositoryStub implements IDbAddTodo {
    async add (todoData: IAddTodo): Promise<TodoModel> {
      return await Promise.resolve({
        id: 'valid_id',
        ...todoData
      })
    }
  }
  return new AddTodoRepositoryStub()
}

interface ISutType {
  addTodoRepositoryStub: IDbAddTodo
  sut: Todo
}

const makeSut = (): ISutType => {
  const addTodoRepositoryStub = makeAddTodoRepository()
  const sut = new Todo(addTodoRepositoryStub)
  return {
    sut,
    addTodoRepositoryStub
  }
}

describe('Todo', () => {
  test('should call the addTodo with correct values', async () => {
    const fakeTodo: IAddTodo = {
      name: 'valid_name',
      active: true,
      user_id: 'valid_id',
      description: 'valid_description'
    }

    const { sut } = makeSut()
    const addTodoSpy = jest.spyOn(sut, 'add')
    await sut.add(fakeTodo)
    expect(addTodoSpy).toBeCalledWith(fakeTodo)
  })
})
