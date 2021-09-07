import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm'
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

  @Column()
  user_id: string

  @ManyToOne(() => AccountEntity, account => account.id)
  @JoinColumn()
  account: AccountEntity
}
