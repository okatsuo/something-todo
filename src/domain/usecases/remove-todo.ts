export interface IRemoveTodo {
  id: string
}

export interface IRemoveTodoDb {
  remove: (data: IRemoveTodo) => Promise<boolean>
}
