import { Model } from 'sequelize-typescript';
import { GroupPermission } from './group-permissions.model';
export declare class Groups extends Model {
    id: number;
    name: string;
    permission: GroupPermission[];
    created_at: Date;
    updated_at: Date;
}
