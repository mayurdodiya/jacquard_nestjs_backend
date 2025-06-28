import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
    @Prop({ required: true })
    name: string;

    @Prop()
    phone_no: string;

    @Prop()
    email: string;

    @Prop()
    status: string;

    @Prop({ default: true })
    is_active: boolean;

    @Prop()
    logo_url: string;

    @Prop({ default: null })
    deleted_at: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
