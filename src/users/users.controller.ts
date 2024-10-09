import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
} from '@nestjs/common';
import { CreateUserData } from './dto/create-user.dto';
import { UpdateUserData } from './dto/update-user.dto';
import { AuthData } from './dto/auth.dto';
import { LoginData } from './dto/login.dto';
import { UserListData } from './dto/user-list.dto';
import { UsersService } from './users.service';
import { Public, Roles } from '../auth/constants';
import { Role } from 'src/groups/models/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.SuperAdmin)
  @Post()
  createUser(@Body() userData: CreateUserData): Promise<UserListData> {
    try {
      const user = this.usersService.createUser(userData);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Get(':userId')
  getUserById(@Param('userId') userId: number): Promise<UserListData> {
    try {
      return this.usersService.getUserById(userId);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Get()
  getUsersAll(): Promise<UserListData[]> {
    try {
      return this.usersService.getUserAll();
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Put()
  updateUser(@Body() userData: Partial<UpdateUserData>): Promise<UserListData> {
    try {
      return this.usersService.updateUser(userData);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin)
  @Delete(':userId')
  deleteUser(@Param('userId') userId: number): string | HttpException {
    try {
      this.usersService.deleteUser(userId);
      return 'User Deleted';
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Post('login')
  async signIn(@Body() authData: Partial<AuthData>): Promise<LoginData> {
    try {
      return this.usersService.signIn(authData);
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Post('register')
  async register(@Body() userData: CreateUserData): Promise<LoginData> {
    try {
      return this.usersService.register(userData);
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Put('verify-email')
  verifyEmail(@Body() userData: Partial<UpdateUserData>): Promise<string> {
    try {
      return this.usersService.verifyEmail(userData.email);
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Post('logout')
  logout(@Body() userData: Partial<UpdateUserData>): Promise<string> {
    try {
      return this.usersService.logoutUser(userData.authToken);
    } catch (error) {
      return error;
    }
  }

  @Post('reset-creds')
  reset(@Body() userData: Partial<UpdateUserData>): Promise<string> {
    try {
      return this.usersService.reAuthUser(userData);
    } catch (error) {
      return error;
    }
  }
}
