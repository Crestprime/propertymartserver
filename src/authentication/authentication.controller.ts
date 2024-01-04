import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthenticationService } from './services/user-authentication/user-authentication.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { UserLoginDto } from './dto/userlogin.dto';

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
}
