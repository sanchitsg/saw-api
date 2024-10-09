import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permissions } from './permissions.model';
import { CreatePermissionData } from './dto/create-permission.dto';
import { UpdatePermissionData } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permissions)
    private permissionsModel: typeof Permissions,
  ) {}

  async createPermission(
    permissionData: CreatePermissionData,
  ): Promise<Permissions> {
    if (permissionData.permissionName) {
      const newPermissionata = await this.permissionsModel.create({
        name: permissionData.permissionName,
        icon: permissionData.icon,
        redirect_url: permissionData.redirectUrl,
      });
      return newPermissionata;
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async getPermissionAll(): Promise<Permissions[]> {
    const permissions = await this.permissionsModel.findAll();

    if (permissions) {
      return permissions;
    } else {
      throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
    }
  }

  async getPermissionById(permissionId: number): Promise<Permissions> {
    if (permissionId) {
      const permissions = await this.permissionsModel.findOne({
        where: {
          id: permissionId,
        },
      });

      if (permissions) {
        return permissions;
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePermission(
    permissionData: Partial<UpdatePermissionData>,
  ): Promise<Permissions> {
    const permission = await this.getPermissionById(permissionData.id);
    permission.set({
      name: permissionData.permissionName ?? permission.name,
      icon: permissionData.icon ?? permission.icon,
      redirect_url: permissionData.redirectUrl ?? permission.redirect_url,
    });
    permission.save();
    return permission;
  }

  async deletePermission(permissionId: number): Promise<string> {
    const permission = await this.getPermissionById(permissionId);
    await permission.destroy();

    return 'Group Deleted!';
  }
}
