import { container } from 'tsyringe'
import { AddTodo } from '../../../data/usecases/todo/add-todo'
import { LoadTodo } from '../../../data/usecases/todo/load-todo'
import { RemoveTodo } from '../../../data/usecases/todo/remove-todo'
import { UpdateTodo } from '../../../data/usecases/todo/update-todo'

export const databaseContainers = {
  /* TO-DO */
  database_load_todo: 'DatabaseLoadTodo',
  database_update_todo: 'DatabaseUpdateTodo',
  database_remove_todo: 'DatabaseRemoveTodo',
  database_add_todo: 'DatabaseAddTodo'
}

export const registerDatabaseContainers = (): void => {
  /* TO-DO */
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

  container.register(
    databaseContainers.database_add_todo,
    AddTodo
  )
}
