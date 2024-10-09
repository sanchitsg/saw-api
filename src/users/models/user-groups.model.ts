import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Groups } from '../../groups/models/groups.model';

@Table({ tableName: 'user_group_mappings' })
export class UserGroup extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Users)
  @Column
  user_id: number;

  @ForeignKey(() => Groups)
  @Column
  group_id: number;

  @BelongsTo(() => Groups, 'group_id')
  group_info: Groups;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
