import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserAuthGuard implements CanActivate {
  private logger = new Logger(UserAuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authHeader = context.switchToHttp().getRequest().headers[
      'Authorization'
    ];
    if (authHeader === undefined || authHeader === null) {
      throw new UnauthorizedException(
        'Unauthorized, you need to login to continue',
      );
    }
    const token = authHeader.split(' ')[1];
    const bearer = authHeader.split(' ')[0];

    if (bearer !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization token');
    }

    try {
      const verifiedToken: { id: string; email: string; roles: string[] } =
        await this.jwtService.verify(token, {
          secret: this.configService.get('JWT_SECRET'),
        });
      this.logger.debug(verifiedToken);

      const user = await this.userModel.findById(verifiedToken['id']);
      if (user === null) {
        throw new UnauthorizedException('User not found');
      }

      const request = context.switchToHttp().getRequest();
      request['user'] = verifiedToken;
      return true;
    } catch (error) {}
    return true;
  }
}
