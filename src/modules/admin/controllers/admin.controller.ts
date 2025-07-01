import { Body, Controller, Get, HttpCode, Param, Post, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from '../services/admin.services';
import { LoginDto } from '../dto/login_dto';
import { UpdateProfileDto } from '../dto/update_profile_dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDto) {
    const result = await this.adminService.login(body);
    console.log('Controller response:', result);
    return result;
  }

  @Put('updateProfile')
  async updateProfile(@Request() req: any, @Body() body: UpdateProfileDto) {
    const result = await this.adminService.updateProfile(req, body);
    console.log('Controller responsevv:', result);
    return result;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Upload folder in root
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('File uploaded:', file);
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      path: `/uploads/${file.filename}`, // File URL path
    };
  }
}
