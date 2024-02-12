import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_ROLE } from 'src/enums/UserRoles';
import { VERIFICATION_LEVEL } from 'src/enums/VerificationLevel';
import { EmailService } from '@app/email';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/authentication/dto/userlogin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserAuthenticationService {
  private logger = new Logger(UserAuthenticationService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUserAccount(user: Partial<User>) {
    const userExists = await this.userModel.find({ email: user.email });
    if (userExists.length > 0) {
      throw new BadRequestException('An account with that email already exist');
    }

    // hash passsword
    const hash = await this.hashPassword(user.password);
    user.password = hash;
    user['roles'] = [USER_ROLE.USER];
    user['verification_level'] = VERIFICATION_LEVEL.BASIC;

    const newUser = new this.userModel(user);
    newUser.save();

    delete newUser['password'];

    this.logger.debug(newUser);

    // send verifcation email
    await this.emailService.sendEmailVerificationOTP(newUser);

    return {
      message: 'Account created successfully',
      data: newUser,
    };
  }

  async login(userDetails: UserLoginDto) {
    const user = await this.userModel.findOne({ email: userDetails.email });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isMatch = await compare(userDetails.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign(
      {
        id: user._id,
        email: user.email,
        roles: user.roles,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '5d',
        algorithm: 'HS256',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        id: user._id,
        email: user.email,
        roles: user.roles,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1y',
        algorithm: 'HS256',
      },
    );
    delete user['password'];

    return {
      message: 'Login successful',
      data: {
        token,
        refreshToken,
        user: { ...user['_doc'], password: '' },
      },
    };
  }

  private async hashPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
