import { Model } from 'sequelize-typescript';
export declare class GroupPermission extends Model {
    id: number;
    group_id: number;
    permission_id: number;
    created_at: Date;
    updated_at: Date;
}
