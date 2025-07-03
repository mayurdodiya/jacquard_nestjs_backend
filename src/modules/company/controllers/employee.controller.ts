import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AddEmployeeDto } from "../dto/add_employee_dto";
import { EmployeeService } from "../services/employee.service";
import { UpdateEmployeeDto } from "../dto/update_employee_dto";

@Controller('company/employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    async addEmployee(@Body() body: AddEmployeeDto) {
        const result = await this.employeeService.addEmployee(body);
        return result;
    }

    @Get()
    getEmployee() {
        return this.employeeService.getEmployee();
    }

    @Get('generatePayment')
    async generatePaymentLink() {
        return this.employeeService.generatePaymentLink();
    }

    @Get(':id')
    getEmployeeById(@Param('id') id: string) {
        return this.employeeService.getEmployeeById(id);
    }

    @Put(':id')
    async updateEmployee(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
        return this.employeeService.updateEmployee(id, body);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: string) {
        return this.employeeService.deleteEmployee(id);
    }
}