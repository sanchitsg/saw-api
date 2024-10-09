"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SawModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./auth/constants");
const auth_guard_1 = require("./auth/auth.guard");
const roles_guard_1 = require("./auth/roles.guard");
const users_module_1 = require("./users/users.module");
const groups_module_1 = require("./groups/groups.module");
const permissions_module_1 = require("./permissions/permissions.module");
const admin_module_1 = require("./admin/admin.module");
const projects_module_1 = require("./projects/projects.module");
let SawModule = class SawModule {
};
exports.SawModule = SawModule;
exports.SawModule = SawModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                logging: false,
                define: {
                    underscored: true,
                    timestamps: false,
                },
                autoLoadModels: true,
                synchronize: true,
                host: 'mysql',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'saw',
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '900s' },
            }),
            users_module_1.UsersModule,
            groups_module_1.GroupsModule,
            permissions_module_1.PermissionsModule,
            admin_module_1.AdminModule,
            projects_module_1.ProjectsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], SawModule);
//# sourceMappingURL=saw.module.js.map