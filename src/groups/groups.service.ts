import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Groups } from './models/groups.model';
import { GroupPermission } from './models/group-permissions.model';
import { CreateGroupData } from './dto/create-group.dto';
import { UpdateGroupData } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Groups)
    private groupsModel: typeof Groups,
  ) {}

  async createGroup(groupData: CreateGroupData): Promise<Groups> {
    if (groupData.groupName) {
      const permissionData = [];
      groupData.permissionId.forEach((e) => {
        permissionData.push({ permission_id: e });
      });
      const newGroupData = await this.groupsModel.create(
        {
          name: groupData.groupName,
          permission: permissionData,
        },
        {
          include: GroupPermission,
        },
      );
      return newGroupData;
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async getGroupAll(): Promise<Groups[]> {
    const groups = await this.groupsModel.findAll({ include: GroupPermission });

    if (groups) {
      return groups;
    } else {
      throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
    }
  }

  async getGroupById(groupId: number): Promise<Groups> {
    if (groupId) {
      const groups = await this.groupsModel.findOne({
        where: {
          id: groupId,
        },
        include: GroupPermission,
      });

      if (groups) {
        return groups;
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async updateGroup(groupData: Partial<UpdateGroupData>): Promise<Groups> {
    const group = await this.groupsModel.findOne({
      where: {
        id: groupData.groupId,
      },
      include: GroupPermission,
    });

    group.name = groupData.groupName ?? group.name;

    if (groupData.permissionId) {
      // Destroy existing permissions associated with the group
      await GroupPermission.destroy({ where: { group_id: group.id } });

      // Create new permission records for the updated permissionId array
      const newPermissions = groupData.permissionId.map((permissionId) => ({
        permission_id: permissionId,
        group_id: group.id,
      }));
      await GroupPermission.bulkCreate(newPermissions);
    }

    // Save the updated group record
    await group.save();

    return group;
  }

  async deleteGroup(groupId: number): Promise<string> {
    const groups = await this.groupsModel.findOne({
      where: {
        id: groupId,
      },
      include: GroupPermission,
    });
    await groups.permission.map((permission) => permission.destroy());
    await groups.destroy();

    return 'Group Deleted!';
  }

  mapGroupPermission(group_id: any): string {
    return 'Map a permission to Group with id ' + group_id;
  }

  getGroupPermission(group_id: any): string {
    return 'Return permission mapped to Group with id ' + group_id;
  }
}
