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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const groups_model_1 = require("./models/groups.model");
const group_permissions_model_1 = require("./models/group-permissions.model");
const sequelize_1 = require("@nestjs/sequelize");
let GroupsService = class GroupsService {
    constructor(groupsModel) {
        this.groupsModel = groupsModel;
    }
    async createGroup(groupData) {
        if (groupData.groupName) {
            const permissionData = [];
            groupData.permissionId.forEach((e) => {
                permissionData.push({ permission_id: e });
            });
            const newGroupData = await this.groupsModel.create({
                name: groupData.groupName,
                permission: permissionData,
            }, {
                include: group_permissions_model_1.GroupPermission,
            });
            return newGroupData;
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getGroupAll() {
        const groups = await this.groupsModel.findAll({ include: group_permissions_model_1.GroupPermission });
        if (groups) {
            return groups;
        }
        else {
            throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getGroupById(groupId) {
        if (groupId) {
            const groups = await this.groupsModel.findOne({
                where: {
                    id: groupId,
                },
                include: group_permissions_model_1.GroupPermission,
            });
            if (groups) {
                return groups;
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateGroup(groupData) {
        const group = await this.groupsModel.findOne({
            where: {
                id: groupData.groupId,
            },
            include: group_permissions_model_1.GroupPermission,
        });
        group.name = groupData.groupName ?? group.name;
        if (groupData.permissionId) {
            await group_permissions_model_1.GroupPermission.destroy({ where: { group_id: group.id } });
            const newPermissions = groupData.permissionId.map((permissionId) => ({
                permission_id: permissionId,
                group_id: group.id,
            }));
            await group_permissions_model_1.GroupPermission.bulkCreate(newPermissions);
        }
        await group.save();
        return group;
    }
    async deleteGroup(groupId) {
        const groups = await this.groupsModel.findOne({
            where: {
                id: groupId,
            },
            include: group_permissions_model_1.GroupPermission,
        });
        await groups.permission.map((permission) => permission.destroy());
        await groups.destroy();
        return 'Group Deleted!';
    }
    mapGroupPermission(group_id) {
        return 'Map a permission to Group with id ' + group_id;
    }
    getGroupPermission(group_id) {
        return 'Return permission mapped to Group with id ' + group_id;
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(groups_model_1.Groups)),
    __metadata("design:paramtypes", [Object])
], GroupsService);
//# sourceMappingURL=groups.service.js.map