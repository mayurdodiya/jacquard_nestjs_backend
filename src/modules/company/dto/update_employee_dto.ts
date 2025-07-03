import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsStrongPassword, IsUrl } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @IsOptional({message: 'Phone number is required' })
  @IsString()
  phone_no: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsStrongPassword()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  designation?: string;
}
