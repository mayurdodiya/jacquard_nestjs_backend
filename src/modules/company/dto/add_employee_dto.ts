import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUrl } from 'class-validator';

export class AddEmployeeDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({message: 'Phone number is required' })
  @IsString()
  phone_no: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  designation?: string;
}
