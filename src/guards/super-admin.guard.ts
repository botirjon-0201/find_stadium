import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';
import { Request } from 'express';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Admin unauthorized');

    try {
      const superAdmin: Partial<Admin> = await this.jwtService.verifyAsync(
        token,
        { secret: process.env.ACCESS_TOKEN_KEY },
      );
      if (!superAdmin) throw new UnauthorizedException('Invalid token');
      if (!superAdmin.is_creator)
        throw new BadRequestException(
          'Admin does not have permission to create',
        );
      request['user'] = superAdmin;
    } catch {
      throw new UnauthorizedException('Admin unauthorized');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
