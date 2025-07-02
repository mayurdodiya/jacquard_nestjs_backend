import { Body, Controller, Get, HttpCode, Post, Put, Request, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CompanyService } from "../services/company.service";
import { LoginDto } from "../dto/login_dto";
import { UpdateProfileDto } from "../dto/update_profile_dto";

@Controller('company/auth')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: LoginDto) {
        const result = await this.companyService.login(body);
        return result;
    }

    @Put('updateProfile')
    async updateProfile(@Request() req: any, @Body() body: UpdateProfileDto) {
        const result = await this.companyService.updateProfile(req, body);
        return result;
    }

    @Get('viewProfile')
    async viewProfile(@Request() req: any) {
        const result = await this.companyService.viewProfile(req);
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