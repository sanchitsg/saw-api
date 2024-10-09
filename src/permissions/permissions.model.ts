import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Permissions extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  icon: string;

  @Column
  redirect_url: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
