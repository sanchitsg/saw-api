import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProjectData } from './dto/create-project.dto';
import { UpdateProjectData } from './dto/update-project.dto';
import { Projects } from './projects.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Projects)
    private projectsModel: typeof Projects,
  ) {}

  async createProject(projectData: CreateProjectData): Promise<Projects> {
    if (
      projectData.title &&
      projectData.description &&
      projectData.redirectUrl
    ) {
      const newProjectData = await this.projectsModel.create({
        title: projectData.title ?? '',
        description: projectData.description ?? '',
        redirect_url: projectData.redirectUrl ?? '',
        image_url: projectData.imageUrl ?? '',
      });
      return newProjectData;
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  getProjectAll(): Promise<Projects[]> {
    const projects = this.projectsModel.findAll();

    if (projects) {
      return projects;
    } else {
      throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
    }
  }

  async getProjectById(projectId: number): Promise<Projects> {
    if (projectId) {
      const projects = await this.projectsModel.findOne({
        where: {
          id: projectId,
        },
      });

      if (projects) {
        return projects;
      } else {
        throw new HttpException('Record Not Found!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Invalid parameters!', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProject(
    projectData: Partial<UpdateProjectData>,
  ): Promise<Projects> {
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

  async deleteProject(projectId: number): Promise<string> {
    const currentProjectData = await this.getProjectById(projectId);
    await currentProjectData.destroy();

    return 'Project Deleted!';
  }
}
