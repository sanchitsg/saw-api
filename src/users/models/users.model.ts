import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from 'sequelize-typescript';
import { UserGroup } from './user-groups.model';

@Table
export class Users extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  first_name: string;

  @Column({ defaultValue: null })
  last_name: string;

  @Column
  email: string;

  @Column({ defaultValue: null })
  email_verified: boolean;

  @Column
  password: string;

  @Column({ defaultValue: null })
  auth_token: string;

  @HasOne(() => UserGroup)
  group: UserGroup;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
