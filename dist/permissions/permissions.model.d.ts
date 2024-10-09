import { Model } from 'sequelize-typescript';
export declare class Permissions extends Model {
    id: number;
    name: string;
    icon: string;
    redirect_url: string;
    created_at: Date;
    updated_at: Date;
}
