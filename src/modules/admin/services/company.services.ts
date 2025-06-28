import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../../../schemas/company.schema';

@Injectable()
export class AdminCompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) { }

  async getCompany() {
    return 'Hello Company!';
  }

  async addCompany(data: any) {
    try {
      const obj: {} = {
        name:data.name,
        phone_no:data.phone_no,
        email:data.email,
        status:data.status,
        logo_url:data.logo_url,
      }
      const newCompany = new this.companyModel(obj)
      await newCompany.save();
      return newCompany
    } catch (error) {
      return error
    }
  }
}
