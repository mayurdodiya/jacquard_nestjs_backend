import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class AddCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({message: 'Phone number is required' })
  @IsString()
  phone_no: string;
  
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({message: 'Email is required' })
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
