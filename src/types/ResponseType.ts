import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Response<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  code?: number;

  @ApiProperty()
  data: T;
}
