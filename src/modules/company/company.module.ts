import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../../schemas/company.schema';
import { CompanyService } from './services/company.service';
import { Employee, EmployeeSchema } from '../../schemas/employee.schema';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Company.name, schema: CompanySchema },
            { name: Employee.name, schema: EmployeeSchema },
        ]),
    ],
    controllers: [CompanyController, EmployeeController],
    providers: [CompanyService, EmployeeService],
    exports: [CompanyService, EmployeeService]
})
export class CompanyModule { }
