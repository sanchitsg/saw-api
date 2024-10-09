import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Projects extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  redirect_url: string;

  @Column
  image_url: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
