import { SetMetadata } from '@nestjs/common';
import { Role } from '../groups/models/role.enum';

export const jwtConstants = {
  secret: 'Sanchit@Work Auth JWT Secret Key',
};

export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
