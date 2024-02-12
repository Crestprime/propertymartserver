import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './services/users/users.service';
import { UserauthGuard } from 'src/guards/userauth/userauth.guard';
import { CurrentUser, REQUEST_USER } from 'src/decorators/current-user/current-user.decorator';

@ApiTags('USER')
@Controller('user')
export class UserController {
    constructor(private userService: UsersService) {}


    @ApiBearerAuth('JWT')
    @UseGuards(UserauthGuard)
    @Get()
    getUserDetails(@CurrentUser() user: REQUEST_USER) {
        return this.userService.getUserDetails(user.id);
    }
}
