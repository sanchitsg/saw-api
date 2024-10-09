import { Model } from 'sequelize-typescript';
export declare class Projects extends Model {
    id: number;
    title: string;
    description: string;
    redirect_url: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
}
