import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class ResolveBankDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  account_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  bank_code: string;
}
