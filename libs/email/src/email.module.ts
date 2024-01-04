import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheam } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserScheam }]),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
