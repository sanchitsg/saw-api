import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getHome(): string {
    return 'GET Admin!';
  }

  postHome(): string {
    return 'POST Admin!';
  }
}
