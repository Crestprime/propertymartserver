import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { HttpModule } from '@nestjs/axios';
import { PaystackService } from './services/paystack/paystack.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [BankController],
  providers: [PaystackService, ConfigService],
})
export class BankModule {}
