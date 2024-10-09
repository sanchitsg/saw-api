import { CreateProjectData } from './dto/create-project.dto';
import { UpdateProjectData } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.model';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    createProject(projectData: CreateProjectData): Promise<Projects>;
    getProjectById(projectId: number): Promise<Projects>;
    getProjectsAll(): Promise<Projects[]> | string;
    updateProject(projectData: Partial<UpdateProjectData>): Promise<Projects>;
    deleteProject(projectId: number): string;
}
