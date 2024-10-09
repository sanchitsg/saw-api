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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const projects_model_1 = require("./projects.model");
const sequelize_1 = require("@nestjs/sequelize");
let ProjectsService = class ProjectsService {
    constructor(projectsModel) {
        this.projectsModel = projectsModel;
    }
    async createProject(projectData) {
        if (projectData.title &&
            projectData.description &&
            projectData.redirectUrl) {
            const newProjectData = await this.projectsModel.create({
                title: projectData.title ?? '',
                description: projectData.description ?? '',
                redirect_url: projectData.redirectUrl ?? '',
                image_url: projectData.imageUrl ?? '',
            });
            return newProjectData;
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getProjectAll() {
        const projects = this.projectsModel.findAll();
        if (projects) {
            return projects;
        }
        else {
            throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getProjectById(projectId) {
        if (projectId) {
            const projects = await this.projectsModel.findOne({
                where: {
                    id: projectId,
                },
            });
            if (projects) {
                return projects;
            }
            else {
                throw new common_1.HttpException('Record Not Found!', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('Invalid parameters!', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateProject(projectData) {
        const project = await this.getProjectById(projectData.id);
        project.set({
            title: projectData.title ?? project.title,
            description: projectData.description ?? project.description,
            redirect_url: projectData.redirectUrl ?? project.redirect_url,
            image_url: projectData.imageUrl ?? project.image_url,
        });
        project.save();
        return project;
    }
    async deleteProject(projectId) {
        const currentProjectData = await this.getProjectById(projectId);
        await currentProjectData.destroy();
        return 'Project Deleted!';
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(projects_model_1.Projects)),
    __metadata("design:paramtypes", [Object])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map