import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PAYSTACK_BASE_URL } from 'src/utils/urls';

@Injectable()
export class PaystackService {
  constructor(private httpSerice: HttpService) {}

  async getBanks() {
    try {
      const request = await this.httpSerice.axiosRef.get(
        `${PAYSTACK_BASE_URL}bank`,
      );
      return {
        message: 'All banks in nigeria',
        data: request.data.data,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
