import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  BeforeCreate,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { UserToken } from './user_token.model';
import { IUser } from '../../../../interfaces/microservices/database-microservice/models/user.interface';
import { Task } from './task.model'

@Table({
  tableName: 'users',
  defaultScope: { attributes: { exclude: ['password'] } },
})
export class User extends Model<User> implements IUser {
  @Column({
    type: DataType.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  })
  uid: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @HasMany(() => UserToken)
  tokens: UserToken[];

  @HasMany(() => Task)
  tasks: Task[]

  @BeforeCreate
  static async hashPassword(instance) {
    const saltRounds = 10;
    instance.password = await hash(instance.password, saltRounds);
  }
}
