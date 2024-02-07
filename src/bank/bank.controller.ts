import { Controller, Get } from '@nestjs/common';
import { PaystackService } from './services/paystack/paystack.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BANKS')
@Controller('bank')
export class BankController {
  constructor(private payStackService: PaystackService) {}

  @Get('banks-list')
  getBankList() {
    return this.payStackService.getBanks();
  }
}
