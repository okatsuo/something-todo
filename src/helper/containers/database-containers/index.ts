import { container } from 'tsyringe'
import { AccountLogin } from '../../../data/usecases/account/account-login'
import { DbAddAccount } from '../../../data/usecases/account/db-add-account'
import { UserAccount } from '../../../data/usecases/account/user-account'
import { AddTodo } from '../../../data/usecases/todo/add-todo'
import { LoadTodo } from '../../../data/usecases/todo/load-todo'
import { RemoveTodo } from '../../../data/usecases/todo/remove-todo'
import { UpdateTodo } from '../../../data/usecases/todo/update-todo'

export const database_containers = {
  /* TO-DO */
  database_load_todo: 'DatabaseLoadTodo',
  database_update_todo: 'DatabaseUpdateTodo',
  database_remove_todo: 'DatabaseRemoveTodo',
  database_add_todo: 'DatabaseAddTodo',

  /* ACCOUNT */
  database_account_login: 'DatabaseAccountLogin',
  database_add_account: 'DatabaseAddAccount',
  database_user_account: 'DatabaseUserAccount'
}

export const registerDatabaseContainers = (): void => {
  /* TO-DO */
  container.register(
    database_containers.database_load_todo,
    LoadTodo
  )

  container.register(
    database_containers.database_update_todo,
    UpdateTodo
  )

  container.register(
    database_containers.database_remove_todo,
    RemoveTodo
  )

  container.register(
    database_containers.database_add_todo,
    AddTodo
  )

  /* ACCOUNT */
  container.register(
    database_containers.database_account_login,
    AccountLogin
  )

  container.register(
    database_containers.database_add_account,
    DbAddAccount
  )

  container.register(
    database_containers.database_user_account,
    UserAccount
  )
}
