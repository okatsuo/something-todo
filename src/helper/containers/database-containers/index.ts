import { container } from 'tsyringe'
import { LoadTodo } from '../../../data/usecases/todo/load-todo'
import { RemoveTodo } from '../../../data/usecases/todo/remove-todo'
import { UpdateTodo } from '../../../data/usecases/todo/update-todo'

export const databaseContainers = {
  database_load_todo: 'DatabaseLoadTodo',
  database_update_todo: 'DatabaseUpdateTodo',
  database_remove_todo: 'DatabaseRemoveTodo'
}

export const registerDatabaseContainers = (): void => {
  container.register(
    databaseContainers.database_load_todo,
    LoadTodo
  )

  container.register(
    databaseContainers.database_update_todo,
    UpdateTodo
  )

  container.register(
    databaseContainers.database_remove_todo,
    RemoveTodo
  )
}
