import { Todo } from '.prisma/client'
import { IAddTodo, IDbAddTodo } from '../../../src/domain/usecases/add-to-do'
import { AddTodoController } from '../../../src/presentation/todo/todo-controller'

const makeAddTodoStub = (): IDbAddTodo => {
  class AddTodoStub implements IDbAddTodo {
    async add (todoData: IAddTodo): Promise<Todo> {
      return await Promise.resolve({
        id: 1,
        ...todoData
      })
    }
  }

  return new AddTodoStub()
}

interface ISutType {
  sut: AddTodoController
  addTodoStub: IDbAddTodo
}

const makeSut = (): ISutType => {
  const addTodoStub = makeAddTodoStub()
  const sut = new AddTodoController(addTodoStub)

  return {
    sut,
    addTodoStub
  }
}

describe('To-do controller', () => {
  test('should call handle with correct values', async () => {
    const fakeTodo: IAddTodo = {
      name: 'valid_name',
      active: true,
      account_id: 1,
      description: 'valid_description'
    }

    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'handle')
    await sut.handle(fakeTodo)
    expect(sutSpy).toBeCalledWith(fakeTodo)
  })

  test('should call the addTodo with correct values', async () => {
    const fakeTodo: IAddTodo = {
      name: 'valid_name',
      active: true,
      account_id: 1,
      description: 'valid_description'
    }

    const { sut, addTodoStub } = makeSut()
    const addTodoSpy = jest.spyOn(addTodoStub, 'add')
    await sut.handle(fakeTodo)
    expect(addTodoSpy).toBeCalledWith(fakeTodo)
  })

  test('should throws if addTodo throws', async () => {
    const fakeTodo: IAddTodo = {
      name: 'valid_name',
      active: true,
      account_id: 1,
      description: 'valid_description'
    }
    const { sut, addTodoStub } = makeSut()
    jest.spyOn(addTodoStub, 'add').mockImplementationOnce(async () => await Promise.reject(new Error('')))
    const todo = sut.handle(fakeTodo)
    await expect(todo).rejects.toThrow()
  })

  test('should return with correct values', async () => {
    const fakeTodo: IAddTodo = {
      active: true,
      description: 'valid_description',
      name: 'valid_name',
      account_id: 0
    }

    const { sut } = makeSut()
    const todo = await sut.handle(fakeTodo)
    expect(todo.id).toBeDefined()
    expect(todo).toEqual({ id: todo.id, ...fakeTodo })
  })

  test('should return empty description, if no description is provided', async () => {
    const fakeTodo: IAddTodo = {
      name: 'valid_name',
      active: true,
      account_id: 1,
      description: ''
    }

    const { sut } = makeSut()
    const todo = await sut.handle(fakeTodo)
    expect(todo.description).toBe('')
  })
})
