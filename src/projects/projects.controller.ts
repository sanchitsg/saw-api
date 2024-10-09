import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateProjectData } from './dto/create-project.dto';
import { UpdateProjectData } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.model';
import { Public, Roles } from '../auth/constants';
import { Role } from 'src/groups/models/role.enum';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Roles(Role.SuperAdmin, Role.Admin)
  @Post()
  createProject(@Body() projectData: CreateProjectData): Promise<Projects> {
    try {
      return this.projectsService.createProject(projectData);
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Get(':projectId')
  getProjectById(@Param('projectId') projectId: number): Promise<Projects> {
    try {
      return this.projectsService.getProjectById(projectId);
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Get()
  getProjectsAll(): Promise<Projects[]> | string {
    try {
      return this.projectsService.getProjectAll();
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @Put()
  updateProject(
    @Body() projectData: Partial<UpdateProjectData>,
  ): Promise<Projects> {
    try {
      return this.projectsService.updateProject(projectData);
    } catch (error) {
      return error;
    }
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @Delete(':projectId')
  deleteProject(@Param('projectId') projectId: number): string {
    try {
      this.projectsService.deleteProject(projectId);
      return 'Project Deleted';
    } catch (error) {
      return error;
    }
  }
}
