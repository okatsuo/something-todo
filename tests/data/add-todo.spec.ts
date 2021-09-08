<<<<<<< HEAD:tests/data/usecases/todo/add-todo.spec.ts
import { AddTodo } from '../../../../src/data/usecases/todo/add-todo'
import { TodoModel } from '../../../../src/domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../../../src/domain/usecases/add-to-do'
=======
import { AddTodo } from '../../src/data/usecases/add-todo'
import { TodoModel } from '../../src/domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../src/domain/usecases/add-to-do'
>>>>>>> 530776b75cbb365441f00e1fed20d3e2e850a1cb:tests/data/add-todo.spec.ts

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
  sut: AddTodo
}

const makeSut = (): ISutType => {
  const addTodoRepositoryStub = makeAddTodoRepository()
  const sut = new AddTodo(addTodoRepositoryStub)
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

  test('should throws if addTodoRepository throws', async () => {
    const fakeTodo: IAddTodo = {
      name: 'valid_name',
      active: true,
      user_id: 'valid_id',
      description: 'valid_description'
    }
    const { sut, addTodoRepositoryStub } = makeSut()
    jest.spyOn(addTodoRepositoryStub, 'add').mockImplementationOnce(async () => await Promise.reject(new Error('')))
    const todo = sut.add(fakeTodo)
    await expect(todo).rejects.toThrow()
  })

  test('should return with correct values', async () => {
    const fakeTodo: IAddTodo = {
      name: 'valid_name',
      active: true,
      user_id: 'valid_id',
      description: 'valid_description'
    }

    const { sut } = makeSut()
    const todo = await sut.add(fakeTodo)
    expect(todo.id).toBeDefined()
    expect(todo).toEqual({ id: todo.id, ...fakeTodo })
  })
})
