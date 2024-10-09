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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const constants_1 = require("../auth/constants");
const role_enum_1 = require("../groups/models/role.enum");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(userData) {
        try {
            const user = this.usersService.createUser(userData);
            return user;
        }
        catch (error) {
            return error;
        }
    }
    getUserById(userId) {
        try {
            return this.usersService.getUserById(userId);
        }
        catch (error) {
            return error;
        }
    }
    getUsersAll() {
        try {
            return this.usersService.getUserAll();
        }
        catch (error) {
            return error;
        }
    }
    updateUser(userData) {
        try {
            return this.usersService.updateUser(userData);
        }
        catch (error) {
            return error;
        }
    }
    deleteUser(userId) {
        try {
            this.usersService.deleteUser(userId);
            return 'User Deleted';
        }
        catch (error) {
            return error;
        }
    }
    async signIn(authData) {
        try {
            return this.usersService.signIn(authData);
        }
        catch (error) {
            return error;
        }
    }
    async register(userData) {
        try {
            return this.usersService.register(userData);
        }
        catch (error) {
            return error;
        }
    }
    verifyEmail(userData) {
        try {
            return this.usersService.verifyEmail(userData.email);
        }
        catch (error) {
            return error;
        }
    }
    logout(userData) {
        try {
            return this.usersService.logoutUser(userData.authToken);
        }
        catch (error) {
            return error;
        }
    }
    reset(userData) {
        try {
            return this.usersService.reAuthUser(userData);
        }
        catch (error) {
            return error;
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserData]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersAll", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signIn", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserData]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Put)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyEmail", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('reset-creds'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "reset", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map