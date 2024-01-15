import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserauthGuard } from 'src/guards/userauth/userauth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
    ])
  ],
  controllers: [UserController],
  providers: [UsersService, UserauthGuard, JwtService]
})
export class UserModule {}
