import { Module } from '@nestjs/common';
import { Permissions } from './permissions.model';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Permissions])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
