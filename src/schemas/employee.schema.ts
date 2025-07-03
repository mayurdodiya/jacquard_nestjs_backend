import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

export enum RoleEnum {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    COMPANY = 'company',
}

@Schema({ timestamps: true })
export class Employee {
    @Prop({ required: true })
    name: string;

    @Prop()
    phone_no: string;

    @Prop()
    email: string;

    @Prop({ default: true })
    is_active: boolean;

    @Prop()
    image_url: string;

    @Prop()
    password: string;

    @Prop()
    designation: string;

    @Prop({
        required: true,
        enum: RoleEnum,
        default: RoleEnum.EMPLOYEE
    })
    role_id: RoleEnum;

    @Prop({ default: null })
    deleted_at: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
