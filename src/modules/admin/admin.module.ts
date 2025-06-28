import { Module } from '@nestjs/common';
import { AdminCompanyController } from './controllers/company.controller';
import { AdminCompanyService } from './services/company.services';

@Module({
  imports: [],
  controllers: [AdminCompanyController],
  providers: [AdminCompanyService],
})
export class AdminModule {}
