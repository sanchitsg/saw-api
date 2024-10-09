import { Module } from '@nestjs/common';
import { Groups } from './models/groups.model';
import { GroupPermission } from './models/group-permissions.model';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Groups, GroupPermission])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
