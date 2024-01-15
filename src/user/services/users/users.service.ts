import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async getUserDetails(_id: string) {
        const user = await this.userModel.findById(_id);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        return {
            message: 'user details',
            data: user,
        }
    }
}
