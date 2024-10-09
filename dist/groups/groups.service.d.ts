import { Groups } from './models/groups.model';
import { CreateGroupData } from './dto/create-group.dto';
import { UpdateGroupData } from './dto/update-group.dto';
export declare class GroupsService {
    private groupsModel;
    constructor(groupsModel: typeof Groups);
    createGroup(groupData: CreateGroupData): Promise<Groups>;
    getGroupAll(): Promise<Groups[]>;
    getGroupById(groupId: number): Promise<Groups>;
    updateGroup(groupData: Partial<UpdateGroupData>): Promise<Groups>;
    deleteGroup(groupId: number): Promise<string>;
    mapGroupPermission(group_id: any): string;
    getGroupPermission(group_id: any): string;
}
