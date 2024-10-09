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
exports.UserGroup = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("./users.model");
const groups_model_1 = require("../../groups/models/groups.model");
let UserGroup = class UserGroup extends sequelize_typescript_1.Model {
};
exports.UserGroup = UserGroup;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], UserGroup.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.Users),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserGroup.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => groups_model_1.Groups),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserGroup.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => groups_model_1.Groups, 'group_id'),
    __metadata("design:type", groups_model_1.Groups)
], UserGroup.prototype, "group_info", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], UserGroup.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], UserGroup.prototype, "updated_at", void 0);
exports.UserGroup = UserGroup = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'user_group_mappings' })
], UserGroup);
//# sourceMappingURL=user-groups.model.js.map