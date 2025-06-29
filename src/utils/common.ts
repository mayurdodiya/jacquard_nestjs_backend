// import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';



export class CommonUtils {
    // 🔐 Secret Key (You can get it from .env)
    static jwtSecret = process.env.JWT_SECRET || 'your_secret_key';
    static jwtExpiry = process.env.JWT_EXPIRY || '7d';

    // Create JWT Token
    static createToken(payload: object): string {
        try {
            const options: SignOptions = {
                expiresIn: this.jwtExpiry as unknown as SignOptions['expiresIn'],
            };

            return jwt.sign(payload, this.jwtSecret, options);
        } catch (error) {
            throw new Error(error);
        }
    }

    // 🔓 Verify and Decode JWT Token
    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Invalid Token');
        }
    }

    // 🔑 Hash Password
    static async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            return bcrypt.hash(password, salt);
        } catch (error) {
            throw new Error(error)
        }
    }

    // 🔄 Compare Password
    static async comparePassword(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            return bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw new Error(error)
        }
    }
}
