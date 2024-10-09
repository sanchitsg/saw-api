import { HttpException } from '@nestjs/common';
import { CreateUserData } from './dto/create-user.dto';
import { UpdateUserData } from './dto/update-user.dto';
import { AuthData } from './dto/auth.dto';
import { LoginData } from './dto/login.dto';
import { UserListData } from './dto/user-list.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(userData: CreateUserData): Promise<UserListData>;
    getUserById(userId: number): Promise<UserListData>;
    getUsersAll(): Promise<UserListData[]>;
    updateUser(userData: Partial<UpdateUserData>): Promise<UserListData>;
    deleteUser(userId: number): string | HttpException;
    signIn(authData: Partial<AuthData>): Promise<LoginData>;
    register(userData: CreateUserData): Promise<LoginData>;
    verifyEmail(userData: Partial<UpdateUserData>): Promise<string>;
    logout(userData: Partial<UpdateUserData>): Promise<string>;
    reset(userData: Partial<UpdateUserData>): Promise<string>;
}
