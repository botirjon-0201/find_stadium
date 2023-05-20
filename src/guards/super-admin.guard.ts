import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException(`Ruxsat etilmagan admin`);
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== `Bearer` || !token)
      throw new UnauthorizedException(`Ruxsat etilmagan admin`);

    async function verify(token: string, jwtService: JwtService) {
      const superAdmin: Partial<Admin> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!superAdmin) throw new UnauthorizedException(`Invalid token`);

      if (!superAdmin.is_creator)
        throw new BadRequestException(`Admin yaratish huquqiga ega emas`);

      return true;
    }

    return verify(token, this.jwtService);
  }
}
