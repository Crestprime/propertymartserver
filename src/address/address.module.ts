import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from 'src/schemas/address.schema';
import { UserService } from './services/user/user.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AddressController],
  providers: [UserService, JwtService, ConfigService],
})
export class AddressModule {}
