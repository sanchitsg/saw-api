import { CreateProjectData } from './dto/create-project.dto';
import { UpdateProjectData } from './dto/update-project.dto';
import { Projects } from './projects.model';
export declare class ProjectsService {
    private projectsModel;
    constructor(projectsModel: typeof Projects);
    createProject(projectData: CreateProjectData): Promise<Projects>;
    getProjectAll(): Promise<Projects[]>;
    getProjectById(projectId: number): Promise<Projects>;
    updateProject(projectData: Partial<UpdateProjectData>): Promise<Projects>;
    deleteProject(projectId: number): Promise<string>;
}
