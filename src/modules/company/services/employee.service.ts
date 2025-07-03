import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommonUtils } from "../../../utils/common";
import { ResponseHandler } from "../../../utils/response.util";
import { RESPONSE_MESSAGES } from "../../../utils/message";
import { Employee, EmployeeDocument } from "../../../schemas/employee.schema";
import { LemonSqueezyService } from "../../../utils/lemonSqueezePayment";
import { HttpException } from "@nestjs/common";

export class EmployeeService {
    constructor(
        @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
        // private readonly lemonSqueezyService: LemonSqueezyService
    ) { }

    async addEmployee(body: any) {
        try {
            if (await this.employeeModel.findOne({ email: body.email, deleted_at: null })) {
                return ResponseHandler.conflict(RESPONSE_MESSAGES.DATA_EXIST("Employee"))
            }
            const pwd = await CommonUtils.hashPassword(body.password)
            body = { ...body, password: pwd }

            const employee = await this.employeeModel.create({ ...body })
            const { password, ...employeeObj } = employee.toObject()
            return ResponseHandler.ok(employeeObj, RESPONSE_MESSAGES.CREATED('Employee'))
        } catch (error) {
            return error
        }
    }

    async getEmployee() {
        try {
            const employee = await this.employeeModel.find({ deleted_at: null })
            return ResponseHandler.ok(employee, RESPONSE_MESSAGES.FETCHED_SUCCESS('Employee'))
        } catch (error) {
            throw error
        }
    }

    async getEmployeeById(id: string) {
        try {
            const employee = await this.employeeModel.findOne({ _id: id, deleted_at: null })
            if (!employee) {
                return ResponseHandler.notFound(RESPONSE_MESSAGES.NOT_FOUND('Employee'))
            }

            return ResponseHandler.ok(employee, RESPONSE_MESSAGES.FETCHED_SUCCESS('Employee'))
        } catch (error) {
            throw error
        }
    }

    async updateEmployee(id: string, data: any) {
        try {
            const employee = await this.employeeModel.findOneAndUpdate({ _id: id, deleted_at: null }, { $set: { ...data } }, { new: true })
            if (!employee) {
                return ResponseHandler.notFound(RESPONSE_MESSAGES.NOT_FOUND('Employee'))
            }
            return ResponseHandler.ok(employee, RESPONSE_MESSAGES.PROFILE_UPDATED('Employee'))
        } catch (error) {
            return error
        }
    }

    async deleteEmployee(id: string) {
        try {
            const employee = await this.employeeModel.findOneAndUpdate({ _id: id, deleted_at: null }, { $set: { deleted_at: new Date() } })
            if (!employee) {
                return ResponseHandler.notFound(RESPONSE_MESSAGES.NOT_FOUND('Employee'))
            }
            return ResponseHandler.notFound(RESPONSE_MESSAGES.DELETED('Employee'))
        } catch (error) {
            return error
        }
    }

    async generatePaymentLink() {
        try {
            console.log("Generating payment link...");

            const lemonSqueezyService = new LemonSqueezyService();
            const paymentLink = await lemonSqueezyService.createPaymentLink({
                email: "mayurdodiya1234@gmail.com"
            });

            return ResponseHandler.ok(paymentLink, RESPONSE_MESSAGES.CREATED('Payment Link'));
        } catch (error) {
            console.error("🔴 Error while creating payment link:", error);

            // Optional: If using Nest's HttpException
            throw new HttpException(
                {
                    status: 400,
                    message: 'Unable to create payment link',
                    error: error.message ?? error,
                },
                400
            );
        }
    }

}