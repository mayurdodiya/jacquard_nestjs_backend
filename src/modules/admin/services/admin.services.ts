import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleEnum, User, UserDocument } from '../../../schemas/user.schema';
import { CommonUtils } from '../../../utils/common';

// interface UserObject {
//   name: string;
//   phone_no: string;
//   email: string;
//   password: string;
//   role_id: RoleEnum;
//   image_url: string;
// }


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async login(data: any) {
    try {
      console.log(data, '---------------------------------')
      const user = await this.userModel.findOne({ email: data.email, deleted_at: null }).lean()
      if (!user) {
        return { success: false, status: 400, message: 'User not found!' }
      }
      const compairPwd = await CommonUtils.comparePassword(data.password, user.password)
      if (!compairPwd) {
        return { success: false, status: 400, message: 'password not matched!' }
      }

      const { password, deleted_at, ...userObj } = user;
      const token = CommonUtils.createToken({ userId: user._id })
      console.log(user, 'user---------------------------------')
      return {
        success: true,
        status: 200,
        message: 'User logged in successfully!',
        data: {
          ...userObj,
          token: token
        }
      }
    } catch (error) {
      return error
    }
  }

  async viewProfile(req: any) {
    try {
      const profile = await this.userModel.findById(req.user._id).lean()
      if (!profile) {
        return { success: false, status: 404, message: 'Profile not found!' };
      }
      const {password, ...profileWithoutPassword} = profile;
      return { success: true, status: 200, message: 'Profile get successfully!', data: profileWithoutPassword }
    } catch (error) {
      return error
    }
  }

  async updateProfile(req: any, data: any) {
    try {
      const obj = {
        phone_no: data.phone_no,
        name: data.name,
        image_url: data.image_url
      }
      await this.userModel.findOneAndUpdate({ _id: req.user._id }, { $set: obj }, { new: true })
      return { success: true, status: 200, message: 'Profile update successfully!', }
    } catch (error) {
      return error
    }
  }
}
