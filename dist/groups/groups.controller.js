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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const create_group_dto_1 = require("./dto/create-group.dto");
const groups_service_1 = require("./groups.service");
const constants_1 = require("../auth/constants");
const role_enum_1 = require("./models/role.enum");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    createGroup(groupData) {
        try {
            return this.groupsService.createGroup(groupData);
        }
        catch (error) {
            return error;
        }
    }
    getGroupById(groupId) {
        try {
            return this.groupsService.getGroupById(groupId);
        }
        catch (error) {
            return error;
        }
    }
    getGroupsAll() {
        try {
            return this.groupsService.getGroupAll();
        }
        catch (error) {
            return error;
        }
    }
    updateGroup(groupData) {
        try {
            return this.groupsService.updateGroup(groupData);
        }
        catch (error) {
            return error;
        }
    }
    deleteProject(groupId) {
        try {
            this.groupsService.deleteGroup(groupId);
            return 'Group Deleted';
        }
        catch (error) {
            return error;
        }
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupData]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "createGroup", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin, role_enum_1.Role.Admin),
    (0, common_1.Get)(':groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroupById", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin, role_enum_1.Role.Admin),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroupsAll", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "updateGroup", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin),
    (0, common_1.Delete)(':groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], GroupsController.prototype, "deleteProject", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map