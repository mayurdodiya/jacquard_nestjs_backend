import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AdminCompanyService } from '../services/company.services';
import { AddCompanyDto } from '../dto/add_company_dto';
import { UpdateCompanyDto } from '../dto/update_company_dto';
import { AdminService } from '../services/admin.services';
import { LoginDto } from '../dto/login_dto';

@Controller('admin/auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDto) {
    const result = await this.adminService.login(body);
    console.log('Controller response:', result);
    return result;
  }
}
