import { container } from 'tsyringe'
import { LoadTodo } from '../../../data/usecases/todo/load-todo'
import { UpdateTodo } from '../../../data/usecases/todo/update-todo'

export const databaseContainers = {
  database_load_todo: 'DatabaseLoadTodo',
  database_update_todo: 'DatabaseUpdateTodo'
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
}
