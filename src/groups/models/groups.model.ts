import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { GroupPermission } from './group-permissions.model';

@Table
export class Groups extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @HasMany(() => GroupPermission)
  permission: GroupPermission[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
