import { Module } from '@nestjs/common';
import { Users } from './models/users.model';
import { UserGroup } from './models/user-groups.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Users, UserGroup])],
  controllers: [UsersController],
  providers: [JwtService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
