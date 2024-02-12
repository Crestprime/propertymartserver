import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaystackService } from './services/paystack/paystack.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BankDto } from './DTO/BanksDto';
import { ResolveBankDto } from './DTO/ResolveBankDto';

@ApiTags('BANKS')
@Controller('bank')
export class BankController {
  constructor(private payStackService: PaystackService) {}

  @ApiResponse({ type: [BankDto] })
  @Get('banks-list')
  getBankList() {
    return this.payStackService.getBanks();
  }

  @ApiBody({ type: ResolveBankDto })
  @Post('reslove-account')
  resolveAccount(@Body() body: ResolveBankDto) {
    return this.payStackService.resolveUserAccount(body);
  }
}
