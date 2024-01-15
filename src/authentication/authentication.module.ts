import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserAuthenticationService } from './services/user-authentication/user-authentication.service';
import { EmailService } from '@app/email';
import { OtpModule, OtpService } from '@app/otp';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    OtpModule,
  ],
  controllers: [AuthenticationController],
  providers: [UserAuthenticationService, EmailService, OtpService, JwtService],
})
export class AuthenticationModule {}
