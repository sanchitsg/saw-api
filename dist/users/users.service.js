"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./models/users.model");
const user_groups_model_1 = require("./models/user-groups.model");
const constants_1 = require("../auth/constants");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(usersModel, jwtService) {
        this.usersModel = usersModel;
        this.jwtService = jwtService;
        this.hashSalt = 10;
    }
    async createUser(userData) {
        if (userData.firstName &&
            userData.email &&
            userData.password &&
            userData.groupId) {
            const hashPassword = await bcrypt.hash(userData.password, this.hashSalt);
            const newUserData = await this.usersModel.create({
                first_name: userData.firstName ?? '',
                last_name: userData.lastName ?? '',
                email: userData.email ?? '',
                password: hashPassword ?? '',
                group: {
                    group_id: userData.groupId ?? 0,
                },
            }, {
                include: user_groups_model_1.UserGroup,
            });
            const updatedUserData = {
                id: newUserData.id,
                firstName: newUserData.first_name,
                lastName: newUserData.last_name,
                userGroup: newUserData.group?.group_info?.name ?? '',
                userImage: newUserData.id % 2 === 0
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
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserAll() {
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
                userImage: item.id % 2 === 0
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
        }
        else {
            throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUserById(userId) {
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
                    userImage: user.id % 2 === 0
                        ? 'https://randomuser.me/api/portraits/women/95.jpg'
                        : 'https://randomuser.me/api/portraits/men/85.jpg',
                    email: user?.email ?? '',
                    phone: '',
                    verified: user?.email_verified ?? false,
                    dob: '1994-05-03',
                    gender: 'male',
                };
                return userData;
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserByEmail(email) {
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
                    userImage: user.id % 2 === 0
                        ? 'https://randomuser.me/api/portraits/women/95.jpg'
                        : 'https://randomuser.me/api/portraits/men/85.jpg',
                    email: user?.email ?? '',
                    phone: '',
                    verified: user?.email_verified ?? false,
                    dob: '1994-05-03',
                    gender: 'male',
                };
                return userData;
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUser(userData) {
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
                userImage: users.id % 2 === 0
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
        }
        else {
            throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteUser(userId) {
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
        }
        else {
            throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async verifyEmail(userEmail) {
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
                }
                else {
                    throw new common_1.HttpException('Unable to verify User Email!', common_1.HttpStatus.FORBIDDEN);
                }
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signIn(authData) {
        const user = await this.getUserByEmail(authData.email);
        const passwordMatch = await bcrypt.compare(authData.password, user?.password);
        if (!passwordMatch) {
            throw new common_1.HttpException('Unauthorized Access!', common_1.HttpStatus.UNAUTHORIZED);
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
            userImage: user.id % 2 === 0
                ? 'https://randomuser.me/api/portraits/women/95.jpg'
                : 'https://randomuser.me/api/portraits/men/85.jpg',
            authToken: await this.jwtService.signAsync(jwtData, {
                secret: constants_1.jwtConstants.secret,
            }),
            message: 'User Login Success',
        };
        return loginData;
    }
    async register(userData) {
        if (userData.firstName &&
            userData.email &&
            userData.password &&
            userData.groupId) {
            const hashPassword = await bcrypt.hash(userData.password, this.hashSalt);
            const newUserData = await this.usersModel.create({
                first_name: userData.firstName ?? '',
                last_name: userData.lastName ?? '',
                email: userData.email ?? '',
                password: hashPassword ?? '',
                group: {
                    group_id: userData.groupId ?? 0,
                },
            }, {
                include: user_groups_model_1.UserGroup,
            });
            if (newUserData) {
                const authToken = await this.jwtService.signAsync({
                    sub: newUserData?.id ?? '',
                    email: newUserData?.email ?? '',
                    role: newUserData?.group?.group_info?.name ?? '',
                }, {
                    secret: constants_1.jwtConstants.secret,
                });
                const registerData = {
                    firstName: newUserData?.first_name,
                    lastName: newUserData?.last_name ?? '',
                    email: newUserData?.email ?? '',
                    phone: '',
                    verified: newUserData?.email_verified ?? false,
                    dob: '1994-05-03',
                    gender: 'Male',
                    userGroup: newUserData?.group?.group_info?.name ?? '',
                    userImage: newUserData.id % 2 === 0
                        ? 'https://randomuser.me/api/portraits/women/95.jpg'
                        : 'https://randomuser.me/api/portraits/men/85.jpg',
                    authToken: authToken,
                    message: 'User Registration Success',
                };
                return registerData;
            }
            else {
                throw new common_1.HttpException('Unable to create new user!', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async logoutUser(authToken) {
        if (authToken) {
            const payload = await this.jwtService.verifyAsync(authToken, {
                secret: constants_1.jwtConstants.secret,
            });
            if (payload) {
                return 'Logout success.';
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async reAuthUser(userData) {
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
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.Users)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map