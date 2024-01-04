import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpSchema } from 'src/schemas/otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }])],
  providers: [OtpService],
  exports: [OtpService, MongooseModule],
})
export class OtpModule {}
