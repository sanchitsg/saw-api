import { CreateUserData } from './dto/create-user.dto';
import { UpdateUserData } from './dto/update-user.dto';
import { UserListData } from './dto/user-list.dto';
import { AuthData } from './dto/auth.dto';
import { LoginData } from './dto/login.dto';
import { Users } from './models/users.model';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private usersModel;
    private jwtService;
    constructor(usersModel: typeof Users, jwtService: JwtService);
    private hashSalt;
    createUser(userData: CreateUserData): Promise<UserListData>;
    getUserAll(): Promise<UserListData[]>;
    getUserById(userId: number): Promise<UserListData>;
    getUserByEmail(email: string): Promise<UserListData>;
    updateUser(userData: Partial<UpdateUserData>): Promise<UserListData>;
    deleteUser(userId: number): Promise<string>;
    verifyEmail(userEmail: string): Promise<string>;
    signIn(authData: Partial<AuthData>): Promise<LoginData>;
    register(userData: CreateUserData): Promise<LoginData>;
    logoutUser(authToken: string): Promise<string>;
    reAuthUser(userData: Partial<UpdateUserData>): Promise<string>;
}
