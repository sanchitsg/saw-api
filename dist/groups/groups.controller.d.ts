import { CreateGroupData } from './dto/create-group.dto';
import { UpdateGroupData } from './dto/update-group.dto';
import { Groups } from './models/groups.model';
import { GroupsService } from './groups.service';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    createGroup(groupData: CreateGroupData): Promise<Groups>;
    getGroupById(groupId: number): Promise<Groups>;
    getGroupsAll(): Promise<Groups[]>;
    updateGroup(groupData: Partial<UpdateGroupData>): Promise<Groups>;
    deleteProject(groupId: number): string;
}
