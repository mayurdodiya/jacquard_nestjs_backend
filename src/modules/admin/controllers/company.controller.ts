import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminCompanyService } from '../services/company.services';
import { AddCompanyDto } from '../dto/add_company_dto';

@Controller('admin/company')
export class AdminCompanyController {
  constructor(private readonly companyService: AdminCompanyService) { }

  @Get()
  getCompany() {
    return this.companyService.getCompany();
  }

  @Post()
  async addCompany(@Body() body: AddCompanyDto) {
    return this.companyService.addCompany(body);
  }
}
