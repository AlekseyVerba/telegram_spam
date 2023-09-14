import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { ITask } from '../../../../interfaces/microservices/database-microservice/models/task.interface'

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> implements ITask {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  cron: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.JSONB,
    defaultValue: '[]',
  })
  chats: string[]

  @Column({
    type: DataType.TEXT,
  })
  file: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_uid: string;

  @BelongsTo(() => User)
  user: User;
}
