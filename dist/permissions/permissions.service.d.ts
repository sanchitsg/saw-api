import { Permissions } from './permissions.model';
import { CreatePermissionData } from './dto/create-permission.dto';
import { UpdatePermissionData } from './dto/update-permission.dto';
export declare class PermissionsService {
    private permissionsModel;
    constructor(permissionsModel: typeof Permissions);
    createPermission(permissionData: CreatePermissionData): Promise<Permissions>;
    getPermissionAll(): Promise<Permissions[]>;
    getPermissionById(permissionId: number): Promise<Permissions>;
    updatePermission(permissionData: Partial<UpdatePermissionData>): Promise<Permissions>;
    deletePermission(permissionId: number): Promise<string>;
}
