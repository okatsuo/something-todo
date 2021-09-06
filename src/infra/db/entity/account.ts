import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class AccountEntity extends BaseEntity {
  @ObjectIdColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string
}
