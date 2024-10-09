import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { Groups } from './groups.model';
import { Permissions } from '../../permissions/permissions.model';

@Table({ tableName: 'group_permission_mappings' })
export class GroupPermission extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Groups)
  @Column
  group_id: number;

  @ForeignKey(() => Permissions)
  @Column
  permission_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
