import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserauthGuard implements CanActivate {

  private logger = new Logger(UserauthGuard.name);

  constructor(private jwtService: JwtService, @InjectModel(User.name) private readonly userModel: Model<User>, private configService: ConfigService) {}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request.headers);

    if (!token) {
      throw new UnauthorizedException('Token not found in header');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      this.logger.debug(decoded);
      const isValidUser = await this.validateUser(decoded.id);
      if (!isValidUser) {
        throw new UnauthorizedException('Invalid user');
       }
      request.user = decoded;
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid token!');
    }
  }

  // generate an explanation for this function
  async validateUser(id: string): Promise<boolean> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return false;
    }
    return true;
  }
  private extractTokenFromHeaders(headers: any): string|null {
    const authHeader = headers.authorization || headers.Authorization;
    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }
}
