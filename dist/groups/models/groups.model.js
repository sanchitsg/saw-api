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
exports.Groups = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const group_permissions_model_1 = require("./group-permissions.model");
let Groups = class Groups extends sequelize_typescript_1.Model {
};
exports.Groups = Groups;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Groups.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Groups.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => group_permissions_model_1.GroupPermission),
    __metadata("design:type", Array)
], Groups.prototype, "permission", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Groups.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Groups.prototype, "updated_at", void 0);
exports.Groups = Groups = __decorate([
    sequelize_typescript_1.Table
], Groups);
//# sourceMappingURL=groups.model.js.map