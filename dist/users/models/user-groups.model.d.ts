import { Model } from 'sequelize-typescript';
import { Groups } from '../../groups/models/groups.model';
export declare class UserGroup extends Model {
    id: number;
    user_id: number;
    group_id: number;
    group_info: Groups;
    created_at: Date;
    updated_at: Date;
}
