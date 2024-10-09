import { Role } from '../groups/models/role.enum';
export declare const jwtConstants: {
    secret: string;
};
export declare const IS_PUBLIC = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
