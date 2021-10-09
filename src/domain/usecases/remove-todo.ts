import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class IRemoveTodo {
  @Field(() => Int)
  id: number
}

export interface IRemoveTodoDb {
  remove: (data: IRemoveTodo) => Promise<boolean>
}
