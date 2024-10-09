import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateGroupData } from './dto/create-group.dto';
import { UpdateGroupData } from './dto/update-group.dto';
import { Groups } from './models/groups.model';
import { GroupsService } from './groups.service';
import { Roles } from '../auth/constants';
import { Role } from 'src/groups/models/role.enum';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Roles(Role.SuperAdmin)
  @Post()
  createGroup(@Body() groupData: CreateGroupData): Promise<Groups> {
    try {
      return this.groupsService.createGroup(groupData);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(':groupId')
  getGroupById(@Param('groupId') groupId: number): Promise<Groups> {
    try {
      return this.groupsService.getGroupById(groupId);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @Get()
  getGroupsAll(): Promise<Groups[]> {
    try {
      return this.groupsService.getGroupAll();
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Put()
  updateGroup(@Body() groupData: Partial<UpdateGroupData>): Promise<Groups> {
    try {
      return this.groupsService.updateGroup(groupData);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Delete(':groupId')
  deleteProject(@Param('groupId') groupId: number): string {
    try {
      this.groupsService.deleteGroup(groupId);
      return 'Group Deleted';
    } catch (error) {
      return error;
    }
  }
}
