import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserAuthenticationService } from './services/user-authentication/user-authentication.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { UserLoginDto } from './dto/userlogin.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private userService: UserAuthenticationService) {}

  @ApiBody({ type: User })
  @Post('create-account')
  async createNormalUserAccount(@Body() body: User) {
    return this.userService.createUserAccount(body);
  }

  @ApiBody({ type: UserLoginDto })
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return this.userService.login(body);
  }

  @ApiParam({ name: 'email' })
  @Get('user/request-password-reset-otp/:email')
  async resetPasswordRequest(@Param('email') email: string) {
    return this.userService.sendResetEmail(email);
  }

  @ApiParam({ name: 'email' })
  @Get('user/resend-email-verification-otp/:email')
  async resendEmailVerificationRequest(@Param('email') email: string) {
    return this.userService.resendEmailVerifcationOtp(email);
  }

  @ApiParam({ name: 'code' })
  @ApiParam({ name: 'id' })
  @Put('user/verify-passwordreset-otp/:code/:id')
  async verifyPasswordResetCode(
    @Param('code') code: string,
    @Param('id') id: string,
  ) {
    return this.userService.verifyPasswordResetOtp(code, id);
  }

  @ApiParam({ name: 'code' })
  @ApiParam({ name: 'id' })
  @Put('user/verify-email-otp/:code/:id')
  async verifyEmailCode(@Param('code') code: string, @Param('id') id: string) {
    return this.userService.verifyEmail(code, id);
  }

  @ApiBody({ type: ResetPasswordDto })
  @Put('user/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(body);
  }

  @ApiParam({ name: 'email' })
  @Delete('/user/:email')
  deleteAccount(@Param('email') email: string) {
    return this.userService.deleteAccount(email);
  }
}
