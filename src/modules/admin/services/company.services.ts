import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../../../schemas/company.schema';

interface CompanyObject {
  name: string;
  phone_no: string;
  email: string;
  status: string;
  logo_url: string;
}


@Injectable()
export class AdminCompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) { }

  async getCompany() {
    try {
      const company = await this.companyModel.find({ deleted_at: null })
      return { success: true, status: 200, message: 'Company data get successfully!', data: company }
    } catch (error) {
      throw error
    }
  }

  async getCompanyById(id: string) {
    try {
      const company = await this.companyModel.findOne({ _id: id, deleted_at: null })
      if (!company) {
        return { success: false, status: 400, message: 'Company not found!' }
      }
      return { success: true, status: 200, message: 'Company data get successfully!', data: company }
    } catch (error) {
      throw error
    }
  }

  async addCompany(data: any) {
    try {
      if (await this.companyModel.findOne({ email: data.email, deleted_at: null })) {
        return {
          success: false,
          status: 400,
          message: 'This email already exists!'
        }
      }
      const obj: CompanyObject = {
        name: data.name,
        phone_no: data.phone_no,
        email: data.email,
        status: data.status,
        logo_url: data.logo_url,
      }
      const newCompany = new this.companyModel(obj)
      await newCompany.save();
      return {
        success: true,
        status: 200,
        message: 'Company added successfully!',
        data: newCompany
      }
    } catch (error) {
      return error
    }
  }

  async updateCompany(id: string, data: any) {
    try {
      const company = await this.companyModel.findOneAndUpdate({ _id: id, deleted_at: null }, { $set: { ...data } }, { new: true })
      if (!company) {
        return { success: false, status: 400, message: 'Company not found!' }
      }
      return { success: true, status: 200, message: 'Company updated successfully!', data: company }
    } catch (error) {
      return error
    }
  }

  async deleteCompany(id: string) {
    try {
      const company = await this.companyModel.findOneAndUpdate({ _id: id, deleted_at: null }, { $set: { deleted_at: new Date() } })
      if (!company) {
        return { success: false, status: 400, message: 'Company not found!' }
      }
      return { success: true, status: 200, message: 'Company deleted successfully!' }
    } catch (error) {
      return error
    }
  }
}
