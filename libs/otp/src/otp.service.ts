import { Injectable, Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { randomInt } from 'crypto';
import { OTPENUM } from '../otp.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from 'src/schemas/otp.schema';
import { Model } from 'mongoose';

@Injectable()
export class OtpService {
  private logger = new Logger(OtpService.name);
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  private generateNumber(): string {
    const code = randomInt(100, 899);
    const code2 = randomInt(200, 999);
    return `${code}${code2}`;
  }

  async generateOtp({
    // isUser,
    type,
    user_id,
  }: {
    isUser: boolean;
    type: OTPENUM;
    user_id?: string;
  }): Promise<string> {
    const code = this.generateNumber();
    const otp = await this.otpModel.create({
      type,
      user_id,
      code,
    });
    otp.save();
    const timeout = setTimeout(() => {
      this.markAsExpired(otp._id);
      clearTimeout(timeout);
    }, 5 * 60000);
    this.logger.verbose(otp);
    return code;
  }

  async verifyEmailOtp(code: string, userId: string): Promise<boolean> {
    const otp = await this.otpModel.findOne({ code, user_id: userId });
    if (otp === null || otp === undefined) {
      return false;
    }
    if (otp.isExpired) {
      return false;
    } else {
      await this.otpModel.updateOne(
        {
          _id: otp._id,
        },
        {
          isExpired: true,
        },
      );
      return true;
    }
  }

  async verifyResetOtp(code: string, userId: string): Promise<boolean> {
    const otp = await this.otpModel.findOne({
      code,
      user_id: userId,
      type: OTPENUM.PASSWORD_RESET,
    });
    if (otp === null || otp === undefined) {
      return false;
    }
    if (otp.isExpired) {
      return false;
    } else {
      await this.otpModel.updateOne(
        {
          _id: otp._id,
        },
        {
          isExpired: true,
        },
      );
      return true;
    }
  }

  async markAsExpired(id: any) {
    const otp = await this.otpModel.updateOne(
      {
        _id: id,
      },
      {
        isExpired: true,
      },
    );
    this.logger.verbose(otp);
  }
}
