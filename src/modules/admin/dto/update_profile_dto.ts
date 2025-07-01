import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsOptional({message: 'Phone number is required' })
  @IsString()
  phone_no: string;
  
  @Transform(({ value }) => value?.trim())
  @IsOptional({message: 'Email is required' })
  @IsEmail({}, {message: 'Invalid email address' })
  @IsString()
  email: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;
}
