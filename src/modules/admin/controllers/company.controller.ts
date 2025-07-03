import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminCompanyService } from '../services/company.services';
import { AddCompanyDto } from '../dto/add_company_dto';
import { UpdateCompanyDto } from '../dto/update_company_dto';

@Controller('admin/company')
export class AdminCompanyController {
  constructor(private readonly companyService: AdminCompanyService) { }

  @Get()
  getCompany() {
    return this.companyService.getCompany();
  }

  @Get(':id')
  getCompanyById(@Param('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Post()
  async addCompany(@Body() body: AddCompanyDto) {
    return this.companyService.addCompany(body);
  }

  @Put(':id')
  async updateCompany(@Param('id') id: string, @Body() body: UpdateCompanyDto) {
    return this.companyService.updateCompany(id, body);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string) {
    return this.companyService.deleteCompany(id);
  }
}
