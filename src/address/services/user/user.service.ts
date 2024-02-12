import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from 'src/address/dto/CreateAddressDto';
import { Address } from 'src/schemas/address.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAddressById(_id: string) {
    const address = await this.addressModel.findById(_id);
    if (address === null) {
      throw new BadRequestException('Address not found');
    }
    return {
      message: 'Address',
      data: address,
    };
  }

  async getAddress(user_id: string) {
    const addresses = await this.addressModel.find({ user_id });

    return {
      message: addresses.length > 0 ? 'User Addresses' : 'No addresses found',
      data: addresses,
    };
  }

  async add_address(user_id: string, payload: CreateAddressDto) {
    const addresses = await this.addressModel.find({ user_id });
    const new_address = await this.addressModel.create({
      user_id,
      ...payload,
      isDefault: addresses.length < 1 ? true : false,
    });
    return {
      message: 'Address added',
      data: new_address,
    };
  }

  async markAsDefault(_id: string) {
    const address = await this.addressModel.findById(_id);
    if (address === null) {
      throw new BadRequestException('Address not found');
    }

    // make all not to be default
    await this.addressModel.updateMany(
      { user_id: address.user_id },
      { isDefault: false },
    );

    // make this new address the default
    await this.addressModel.updateOne({ _id }, { isDefault: true });

    return {
      message: `Your address ${address.address} is now your default address`,
    };
  }

  async deleteAddress(_id: string) {
    const address = await this.addressModel.findById(_id);
    if (address === null) {
      throw new BadRequestException('Address not found');
    }
    await this.addressModel.deleteOne({ _id });
    return {
      message: `Address -> ${address.address} deleted successfully`,
    };
  }

  async updateAddress(_id: string, payload: CreateAddressDto) {
    const address = await this.addressModel.findById(_id);
    if (address === null) {
      throw new BadRequestException('Address not found');
    }

    await this.addressModel.updateOne({ _id }, { ...payload });

    const updatedAddress = await this.addressModel.findById(_id);

    return {
      message: 'Address updated',
      data: updatedAddress,
    };
  }
}
