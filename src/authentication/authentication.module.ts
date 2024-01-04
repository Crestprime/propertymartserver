import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheam } from 'src/schemas/user.schema';
import { UserAuthenticationService } from './services/user-authentication/user-authentication.service';
import { EmailService } from '@app/email';
import { OtpModule, OtpService } from '@app/otp';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserScheam }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: process.env.JWT_SECRET,
        secretOrPrivateKey: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '5d' },
      }),
      inject: [ConfigService],
    }),
    OtpModule,
  ],
  controllers: [AuthenticationController],
  providers: [UserAuthenticationService, EmailService, OtpService, JwtService],
})
export class AuthenticationModule {}
