import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/guards/user-auth/user-auth.guard';
import { User } from 'src/decorators/usercheck/usercheck.decorator';
import { CreateAddressDto } from './dto/CreateAddressDto';

@ApiTags('ADDRESS')
@Controller('address')
export class AddressController {
  constructor(private addressService: UserService) {}

  @UseGuards(UserAuthGuard)
  @Get()
  getAddresses(@User() user: { id: string; email: string; roles: string[] }) {
    return this.addressService.getAddress(user.id);
  }

  @UseGuards(UserAuthGuard)
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  getSingleAddress(@Param('id') id: string) {
    return this.addressService.getAddressById(id);
  }

  @UseGuards(UserAuthGuard)
  @ApiBody({ type: CreateAddressDto })
  @Post('create')
  createAddress(
    @User() user: { id: string; email: string; roles: string[] },
    @Body() body: CreateAddressDto,
  ) {
    return this.addressService.add_address(user.id, body);
  }

  @ApiParam({ name: 'id', type: String })
  @Put('make-default/:id')
  markAsDefault(@Param('id') id: string) {
    return this.addressService.markAsDefault(id);
  }

  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateAddressDto })
  @Put(':id')
  updateAddress(@Param('id') id: string, @Body() body: CreateAddressDto) {
    return this.addressService.updateAddress(id, body);
  }

  @UseGuards(UserAuthGuard)
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddress(id);
  }
}
