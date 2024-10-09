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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const create_project_dto_1 = require("./dto/create-project.dto");
const projects_service_1 = require("./projects.service");
const constants_1 = require("../auth/constants");
const role_enum_1 = require("../groups/models/role.enum");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    createProject(projectData) {
        try {
            return this.projectsService.createProject(projectData);
        }
        catch (error) {
            return error;
        }
    }
    getProjectById(projectId) {
        try {
            return this.projectsService.getProjectById(projectId);
        }
        catch (error) {
            return error;
        }
    }
    getProjectsAll() {
        try {
            return this.projectsService.getProjectAll();
        }
        catch (error) {
            return error;
        }
    }
    updateProject(projectData) {
        try {
            return this.projectsService.updateProject(projectData);
        }
        catch (error) {
            return error;
        }
    }
    deleteProject(projectId) {
        try {
            this.projectsService.deleteProject(projectId);
            return 'Project Deleted';
        }
        catch (error) {
            return error;
        }
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin, role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectData]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)(':projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjectById", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ProjectsController.prototype, "getProjectsAll", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin, role_enum_1.Role.Admin),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, constants_1.Roles)(role_enum_1.Role.SuperAdmin, role_enum_1.Role.Admin),
    (0, common_1.Delete)(':projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], ProjectsController.prototype, "deleteProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map