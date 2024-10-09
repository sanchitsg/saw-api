import { Permissions } from './permissions.model';
import { CreatePermissionData } from './dto/create-permission.dto';
import { UpdatePermissionData } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    createPermission(permissionData: CreatePermissionData): Promise<Permissions>;
    getPermissionById(permissionId: number): Promise<Permissions>;
    getPermissionsAll(): Promise<Permissions[]>;
    updatePermission(permissionData: Partial<UpdatePermissionData>): Promise<Permissions>;
    deleteProject(permissionId: number): string;
}
