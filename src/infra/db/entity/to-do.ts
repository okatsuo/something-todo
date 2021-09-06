import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm'
import { AccountEntity } from './account'

@Entity()
export class TodoEntity extends BaseEntity {
  @ObjectIdColumn()
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ default: true })
  active: boolean

  @ManyToOne(() => AccountEntity, account => account.id)
  account: AccountEntity
}
