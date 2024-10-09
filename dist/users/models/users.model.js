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
exports.Users = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_groups_model_1 = require("./user-groups.model");
let Users = class Users extends sequelize_typescript_1.Model {
};
exports.Users = Users;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: null }),
    __metadata("design:type", String)
], Users.prototype, "last_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: null }),
    __metadata("design:type", Boolean)
], Users.prototype, "email_verified", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: null }),
    __metadata("design:type", String)
], Users.prototype, "auth_token", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => user_groups_model_1.UserGroup),
    __metadata("design:type", user_groups_model_1.UserGroup)
], Users.prototype, "group", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Users.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Users.prototype, "updated_at", void 0);
exports.Users = Users = __decorate([
    sequelize_typescript_1.Table
], Users);
//# sourceMappingURL=users.model.js.map