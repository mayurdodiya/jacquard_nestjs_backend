import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateCompanyDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  phone_no: string;
  
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsEmail({}, {message: 'Invalid email address' })
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsUrl()
  logo_url?: string;
}
