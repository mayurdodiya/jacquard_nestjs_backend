import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../../schemas/company.schema';
import { CompanyService } from './services/company.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Company.name, schema: CompanySchema },
        ]),
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService]
})
export class CompanyModule { }
