import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CommonUtils } from '../utils/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['x-auth-token'] || "";

            if (!authHeader) {
                throw new UnauthorizedException('Authorization header missing');
            }

            const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
            if (!token) {
                throw new UnauthorizedException('Token missing');
            }

            const decoded: any = CommonUtils.verifyToken(token);

            const user = await this.userModel.findOne({ _id: decoded.userId, deleted_at: null });
            if (!user) {
                throw new UnauthorizedException('User not found or deleted');
            }

            // Attach user to request object
            req['user'] = user;

            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid or Expired Token');
        }
    }
}
