import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserData } from './dto/create-user.dto';
import { UpdateUserData } from './dto/update-user.dto';
import { UserListData } from './dto/user-list.dto';
import { AuthData } from './dto/auth.dto';
import { LoginData } from './dto/login.dto';
import { Users } from './models/users.model';
import { UserGroup } from './models/user-groups.model';
import { jwtConstants } from '../auth/constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
    private jwtService: JwtService,
  ) {}

  private hashSalt = 10;

  async createUser(userData: CreateUserData): Promise<UserListData> {
    if (
      userData.firstName &&
      userData.email &&
      userData.password &&
      userData.groupId
    ) {
      const hashPassword = await bcrypt.hash(userData.password, this.hashSalt);

      const newUserData = await this.usersModel.create(
        {
          first_name: userData.firstName ?? '',
          last_name: userData.lastName ?? '',
          email: userData.email ?? '',
          password: hashPassword ?? '',
          group: {
            group_id: userData.groupId ?? 0,
          },
        },
        {
          include: UserGroup,
        },
      );

      const updatedUserData = {
        id: newUserData.id,
        firstName: newUserData.first_name,
        lastName: newUserData.last_name,
        userGroup: newUserData.group?.group_info?.name ?? '',
        userImage:
          newUserData.id % 2 === 0
            ? 'https://randomuser.me/api/portraits/women/95.jpg'
            : 'https://randomuser.me/api/portraits/men/85.jpg',
        email: newUserData.email,
        phone: '',
        verified: newUserData.email_verified ?? false,
        dob: '',
        gender: 'male',
      };

      if (updatedUserData) {
        return updatedUserData;
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserAll(): Promise<UserListData[]> {
    const users = await this.usersModel.findAll({
      include: [{ all: true, nested: true }],
    });

    const userList = [];
    users.forEach((item) => {
      userList.push({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        userGroup: item.group.group_info.name,
        userImage:
          item.id % 2 === 0
            ? 'https://randomuser.me/api/portraits/women/95.jpg'
            : 'https://randomuser.me/api/portraits/men/85.jpg',
        email: item.email,
        phone: '',
        verified: item.email_verified ?? false,
        dob: '',
        gender: 'male',
      });
    });

    if (userList) {
      return userList;
    } else {
      throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
    }
  }

  async getUserById(userId: number): Promise<UserListData> {
    if (userId) {
      const user = await this.usersModel.findOne({
        where: {
          id: userId,
        },
        include: [{ all: true, nested: true }],
      });

      if (user) {
        const userData = {
          id: user.id,
          firstName: user?.first_name,
          lastName: user?.last_name ?? '',
          userGroup: user?.group?.group_info?.name ?? '',
          userImage:
            user.id % 2 === 0
              ? 'https://randomuser.me/api/portraits/women/95.jpg'
              : 'https://randomuser.me/api/portraits/men/85.jpg',
          email: user?.email ?? '',
          phone: '',
          verified: user?.email_verified ?? false,
          dob: '1994-05-03',
          gender: 'male',
        };
        return userData;
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string): Promise<UserListData> {
    if (email) {
      const user = await this.usersModel.findOne({
        where: {
          email: email,
        },
        include: [{ all: true, nested: true }],
      });

      if (user) {
        const userData = {
          id: user.id,
          firstName: user?.first_name,
          lastName: user?.last_name ?? '',
          password: user.password,
          userGroup: user?.group?.group_info?.name ?? '',
          userImage:
            user.id % 2 === 0
              ? 'https://randomuser.me/api/portraits/women/95.jpg'
              : 'https://randomuser.me/api/portraits/men/85.jpg',
          email: user?.email ?? '',
          phone: '',
          verified: user?.email_verified ?? false,
          dob: '1994-05-03',
          gender: 'male',
        };
        return userData;
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(userData: Partial<UpdateUserData>): Promise<UserListData> {
    const users = await this.usersModel.findOne({
      where: {
        id: userData.id,
      },
      include: [{ all: true, nested: true }],
    });

    if (users) {
      users.set({
        first_name: userData.firstName ?? users.first_name,
        last_name: userData.lastName ?? users.last_name,
        email: userData.email ?? users.email,
        email_verified: userData.emailVerified ?? users.email_verified,
      });
      await users.save();

      const updatedUserData = {
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        userGroup: users.group.group_info.name,
        userImage:
          users.id % 2 === 0
            ? 'https://randomuser.me/api/portraits/women/95.jpg'
            : 'https://randomuser.me/api/portraits/men/85.jpg',
        email: users.email,
        phone: '',
        verified: users.email_verified ?? false,
        dob: '',
        gender: 'male',
      };

      if (updatedUserData) {
        return updatedUserData;
      }
    } else {
      throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(userId: number): Promise<string> {
    const users = await this.usersModel.findOne({
      where: {
        id: userId,
      },
      include: [{ all: true, nested: true }],
    });

    if (users) {
      await users.group.destroy();
      await users.destroy();

      return 'User Deleted!';
    } else {
      throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
    }
  }

  async verifyEmail(userEmail: string): Promise<string> {
    if (userEmail) {
      const user = await this.usersModel.findOne({
        where: {
          email: userEmail,
        },
        include: [{ all: true, nested: true }],
      });

      if (user) {
        const verifiedUser = this.updateUser({
          id: user.id,
          emailVerified: true,
        });

        if (verifiedUser) {
          return 'User Email verified.';
        } else {
          throw new HttpException(
            'Unable to verify User Email!',
            HttpStatus.FORBIDDEN,
          );
        }
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async signIn(authData: Partial<AuthData>): Promise<LoginData> {
    const user = await this.getUserByEmail(authData.email);

    const passwordMatch = await bcrypt.compare(
      authData.password,
      user?.password,
    );

    if (!passwordMatch) {
      throw new HttpException('Unauthorized Access!', HttpStatus.UNAUTHORIZED);
    }

    const jwtData = {
      sub: user?.id ?? '',
      email: user?.email ?? '',
      role: user?.userGroup ?? '',
    };

    const loginData = {
      firstName: user?.firstName,
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: '',
      verified: user?.verified ?? false,
      dob: '1994-05-03',
      gender: 'Male',
      userGroup: user?.userGroup ?? '',
      userImage:
        user.id % 2 === 0
          ? 'https://randomuser.me/api/portraits/women/95.jpg'
          : 'https://randomuser.me/api/portraits/men/85.jpg',
      authToken: await this.jwtService.signAsync(jwtData, {
        secret: jwtConstants.secret,
      }),
      message: 'User Login Success',
    };

    return loginData;
  }

  async register(userData: CreateUserData): Promise<LoginData> {
    if (
      userData.firstName &&
      userData.email &&
      userData.password &&
      userData.groupId
    ) {
      const hashPassword = await bcrypt.hash(userData.password, this.hashSalt);

      const newUserData = await this.usersModel.create(
        {
          first_name: userData.firstName ?? '',
          last_name: userData.lastName ?? '',
          email: userData.email ?? '',
          password: hashPassword ?? '',
          group: {
            group_id: userData.groupId ?? 0,
          },
        },
        {
          include: UserGroup,
        },
      );

      if (newUserData) {
        const authToken = await this.jwtService.signAsync(
          {
            sub: newUserData?.id ?? '',
            email: newUserData?.email ?? '',
            role: newUserData?.group?.group_info?.name ?? '',
          },
          {
            secret: jwtConstants.secret,
          },
        );

        const registerData = {
          firstName: newUserData?.first_name,
          lastName: newUserData?.last_name ?? '',
          email: newUserData?.email ?? '',
          phone: '',
          verified: newUserData?.email_verified ?? false,
          dob: '1994-05-03',
          gender: 'Male',
          userGroup: newUserData?.group?.group_info?.name ?? '',
          userImage:
            newUserData.id % 2 === 0
              ? 'https://randomuser.me/api/portraits/women/95.jpg'
              : 'https://randomuser.me/api/portraits/men/85.jpg',
          authToken: authToken,
          message: 'User Registration Success',
        };

        return registerData;
      } else {
        throw new HttpException(
          'Unable to create new user!',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async logoutUser(authToken: string): Promise<string> {
    if (authToken) {
      const payload = await this.jwtService.verifyAsync(authToken, {
        secret: jwtConstants.secret,
      });

      if (payload) {
        return 'Logout success.';
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async reAuthUser(userData: Partial<UpdateUserData>): Promise<string> {
    if (userData.email && userData.password) {
      const users = await this.usersModel.findOne({
        where: {
          email: userData.email,
        },
      });

      if (users) {
        users.set({
          password: userData.password ?? users.password,
        });
        users.save();

        return 'Password reset success.';
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }
}
