import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/models/admin.model';

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException(`Admin unauthorized`);
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== `Bearer` || !token)
      throw new UnauthorizedException(`Admin unauthorized`);

    async function verify(token: string, jwtService: JwtService) {
      const admin: Partial<Admin> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!admin) throw new UnauthorizedException(`Invalid token`);
      if (!admin.is_creator)
        throw new BadRequestException(`Admin is not creator`);

      return true;
    }

    return verify(token, this.jwtService);
  }
}
