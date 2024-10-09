import { Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from '../auth/constants';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Get()
  getHome(): string {
    return this.adminService.getHome();
  }

  @Public()
  @Post()
  postHome(): string {
    return this.adminService.postHome();
  }
}
