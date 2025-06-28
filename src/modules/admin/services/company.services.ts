import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminCompanyService {
  getCompany(): string {
    return 'Hello Company!';
  }
}
