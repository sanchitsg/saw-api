import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../groups/models/role.enum';
import { ROLES_KEY } from './constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    try {
      const { user } = context.switchToHttp().getRequest();
      const roleCheck = requiredRoles.includes(user.role);

      if (!roleCheck) {
        throw new HttpException('Forbidden Resource!', HttpStatus.FORBIDDEN);
      }
    } catch {
      throw new HttpException('Forbidden Resource!', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
