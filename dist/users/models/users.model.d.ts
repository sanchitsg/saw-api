import { Model } from 'sequelize-typescript';
import { UserGroup } from './user-groups.model';
export declare class Users extends Model {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified: boolean;
    password: string;
    auth_token: string;
    group: UserGroup;
    created_at: Date;
    updated_at: Date;
}
