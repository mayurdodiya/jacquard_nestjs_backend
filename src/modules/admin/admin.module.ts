import { Module } from '@nestjs/common';
import { AdminCompanyController } from './controllers/company.controller';
import { AdminCompanyService } from './services/company.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../../schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [AdminCompanyController],
  providers: [AdminCompanyService],
})
export class AdminModule { }
