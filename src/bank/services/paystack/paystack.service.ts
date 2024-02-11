import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResolveBankDto } from 'src/bank/DTO/ResolveBankDto';
import { PAYSTACK_BASE_URL, PAYSTACK_ENDPOINTS } from 'src/utils/urls';

@Injectable()
export class PaystackService {
  constructor(
    private httpSerice: HttpService,
    private configService: ConfigService,
  ) {}

  async getBanks() {
    try {
      const request = await this.httpSerice.axiosRef.get(
        `${PAYSTACK_BASE_URL}${PAYSTACK_ENDPOINTS.GET_BANKS}`,
      );
      return {
        message: 'All banks in nigeria',
        data: request.data.data,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async resolveUserAccount(payload: ResolveBankDto) {
    try {
      const request = await this.httpSerice.axiosRef.get(
        `${PAYSTACK_BASE_URL}${PAYSTACK_ENDPOINTS.RESOLVE_BANK}`,
        {
          headers: {
            authorization: `Bearer ${this.configService.get(
              'PAYSTACK_SECRET_KEY',
            )}`,
          },
          params: {
            account_number: payload.account_number,
            bank_code: payload.bank_code,
          },
        },
      );
      return {
        message: 'resolved account',
        data: request.data.data,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
