import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({message: 'Email is required' })
  @IsEmail({}, {message: 'Invalid email address' })
  @IsString()
  email: string;

  @IsNotEmpty({message: 'Password is required' })
  @IsString()
  password: string;
}
