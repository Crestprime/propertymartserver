import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Exclude()
export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @Expose()
  password: string;
}
