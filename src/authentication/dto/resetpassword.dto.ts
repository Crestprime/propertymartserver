import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @Expose()
  user_id: string;

  @ApiProperty()
  @IsString()
  @Expose()
  password: string;
}
