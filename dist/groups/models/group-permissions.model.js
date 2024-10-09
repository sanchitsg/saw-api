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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupPermission = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const groups_model_1 = require("./groups.model");
const permissions_model_1 = require("../../permissions/permissions.model");
let GroupPermission = class GroupPermission extends sequelize_typescript_1.Model {
};
exports.GroupPermission = GroupPermission;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], GroupPermission.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => groups_model_1.Groups),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], GroupPermission.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => permissions_model_1.Permissions),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], GroupPermission.prototype, "permission_id", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], GroupPermission.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], GroupPermission.prototype, "updated_at", void 0);
exports.GroupPermission = GroupPermission = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'group_permission_mappings' })
], GroupPermission);
//# sourceMappingURL=group-permissions.model.js.map