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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const permissions_service_1 = require("./permissions.service");
const constants_1 = require("../auth/constants");
const role_enum_1 = require("../groups/models/role.enum");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    createPermission(permissionData) {
        try {
            return this.permissionsService.createPermission(permissionData);
        }
        catch (error) {
            return error;
        }
    }
    getPermissionById(permissionId) {
        try {
            return this.permissionsService.getPermissionById(permissionId);
        }
        catch (error) {
            return error;
        }
    }
    getPermissionsAll() {
        try {
            return this.permissionsService.getPermissionAll();
        }
        catch (error) {
            return error;
        }
    }
    updatePermission(permissionData) {
        try {
            return this.permissionsService.updatePermission(permissionData);
        }
        catch (error) {
            return error;
        }
    }
    deleteProject(permissionId) {
        try {
            this.permissionsService.deletePermission(permissionId);
            return 'Permission Deleted';
        }
        catch (error) {
            return error;
        }
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionData]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "createPermission", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin, role_enum_1.Role.Admin),
    (0, common_1.Get)(':permissionId'),
    __param(0, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getPermissionById", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin, role_enum_1.Role.Admin),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getPermissionsAll", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "updatePermission", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Delete)(':permissionId'),
    __param(0, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], PermissionsController.prototype, "deleteProject", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map