import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Permissions } from './permissions.model';
import { CreatePermissionData } from './dto/create-permission.dto';
import { UpdatePermissionData } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';
import { Roles } from '../auth/constants';
import { Role } from 'src/groups/models/role.enum';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Roles(Role.SuperAdmin)
  @Post()
  createPermission(
    @Body() permissionData: CreatePermissionData,
  ): Promise<Permissions> {
    try {
      return this.permissionsService.createPermission(permissionData);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(':permissionId')
  getPermissionById(
    @Param('permissionId') permissionId: number,
  ): Promise<Permissions> {
    try {
      return this.permissionsService.getPermissionById(permissionId);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @Get()
  getPermissionsAll(): Promise<Permissions[]> {
    try {
      return this.permissionsService.getPermissionAll();
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Put()
  updatePermission(
    @Body() permissionData: Partial<UpdatePermissionData>,
  ): Promise<Permissions> {
    try {
      return this.permissionsService.updatePermission(permissionData);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Delete(':permissionId')
  deleteProject(@Param('permissionId') permissionId: number): string {
    try {
      this.permissionsService.deletePermission(permissionId);
      return 'Permission Deleted';
    } catch (error) {
      return error;
    }
  }
}
