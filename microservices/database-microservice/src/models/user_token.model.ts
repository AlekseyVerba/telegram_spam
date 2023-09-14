import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import sequelize from 'sequelize';
//FOREIGN
import { User } from './user.model';
import {
  IUserToken,
  TokenTypesEnum,
} from '../../../../interfaces/microservices/database-microservice/models/user_token.interface';

@Table({ tableName: 'user_tokens' })
export class UserToken extends Model<UserToken> implements IUserToken {
  @Column({
    type: DataType.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  })
  value: string;

  @Column({
    type: DataType.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '1 hour'"),
    allowNull: false,
  })
  expire: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  type: TokenTypesEnum;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_uid: string;

  @BelongsTo(() => User)
  user: User;
}
