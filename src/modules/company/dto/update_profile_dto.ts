import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name: string;

  // @Transform(({ value }) => value?.trim())
  // @IsOptional({message: 'Phone number is required' })
  // @IsString()
  // phone_no: string;

  @IsOptional()
  @IsUrl()
  logo_url?: string;
}
