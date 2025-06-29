import { Module } from '@nestjs/common';
import { AdminCompanyController } from './controllers/company.controller';
import { AdminCompanyService } from './services/company.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../../schemas/company.schema';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.services';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [AdminCompanyController, AdminController],
  providers: [AdminCompanyService, AdminService],
  exports: [AdminService]
})
export class AdminModule { }
