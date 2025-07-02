import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company, CompanyDocument } from "../../../schemas/company.schema";
import { CommonUtils } from "../../../utils/common";
import { ResponseHandler } from "../../../utils/response.util";
import { RESPONSE_MESSAGES } from "../../../utils/message";

export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
    ) { }

    async login(data: any) {
        try {
            const company = await this.companyModel.findOne({ email: data.email, deleted_at: null }).lean()
            if (!company) {
                return { success: false, status: 400, message: 'Company not found!' }
            }
            const compairPwd = await CommonUtils.comparePassword(data.password, company.password)
            if (!compairPwd) {
                return { success: false, status: 400, message: 'password not matched!' }
            }

            const { password, deleted_at, ...companyObj } = company;
            const token = CommonUtils.createToken({ companyId: company._id })

            return ResponseHandler.ok({ ...companyObj, token: token }, RESPONSE_MESSAGES.LOGIN_SUCCESS('Profile'))
        } catch (error) {
            return error
        }
    }

    async viewProfile(req: any) {
        try {
            const profile = await this.companyModel.findById(req.user._id).lean()
            if (!profile) {
                return { success: false, status: 404, message: 'Profile not found!' };
            }
            const { password, ...profileWithoutPassword } = profile;
            return ResponseHandler.ok(profileWithoutPassword, RESPONSE_MESSAGES.GET_DATA('Profile'))
        } catch (error) {
            return error
        }
    }

    async updateProfile(req: any, data: any) {
        try {
            const obj = {
                name: data.name,
                logo_url: data.logo_url
                // phone_no: data.phone_no,
            }
            await this.companyModel.findOneAndUpdate({ _id: req.user._id }, { $set: obj }, { new: true })
            return ResponseHandler.ok(RESPONSE_MESSAGES.UPDATED('Profile'))
        } catch (error) {
            return error
        }
    }
}