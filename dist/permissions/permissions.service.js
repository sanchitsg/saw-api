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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const permissions_model_1 = require("./permissions.model");
let PermissionsService = class PermissionsService {
    constructor(permissionsModel) {
        this.permissionsModel = permissionsModel;
    }
    async createPermission(permissionData) {
        if (permissionData.permissionName) {
            const newPermissionata = await this.permissionsModel.create({
                name: permissionData.permissionName,
                icon: permissionData.icon,
                redirect_url: permissionData.redirectUrl,
            });
            return newPermissionata;
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPermissionAll() {
        const permissions = await this.permissionsModel.findAll();
        if (permissions) {
            return permissions;
        }
        else {
            throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getPermissionById(permissionId) {
        if (permissionId) {
            const permissions = await this.permissionsModel.findOne({
                where: {
                    id: permissionId,
                },
            });
            if (permissions) {
                return permissions;
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePermission(permissionData) {
        const permission = await this.getPermissionById(permissionData.id);
        permission.set({
            name: permissionData.permissionName ?? permission.name,
            icon: permissionData.icon ?? permission.icon,
            redirect_url: permissionData.redirectUrl ?? permission.redirect_url,
        });
        permission.save();
        return permission;
    }
    async deletePermission(permissionId) {
        const permission = await this.getPermissionById(permissionId);
        await permission.destroy();
        return 'Group Deleted!';
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(permissions_model_1.Permissions)),
    __metadata("design:paramtypes", [Object])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map