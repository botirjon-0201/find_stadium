import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException(`User unauthorized`);
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== `Bearer` || !token)
      throw new UnauthorizedException(`User unauthorized`);

    async function verify(token: string, jwtService: JwtService) {
      const user: Partial<User> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      }); // Shu joyda muammo bor

      if (!user) throw new UnauthorizedException(`Invalid token`);
      if (!user.is_owner) throw new BadRequestException(`User is not owner`);

      return true;
    }

    return verify(token, this.jwtService);
  }
}
