import { Controller, Get } from '@nestjs/common';
import { AdminCompanyService } from '../services/company.services';

@Controller('admin/company')
export class AdminCompanyController {
  constructor(private readonly appService: AdminCompanyService) {}

  @Get()
  getCompany(): string {
    return this.appService.getCompany();
  }
}
