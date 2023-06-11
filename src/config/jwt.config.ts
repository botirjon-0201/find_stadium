import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('SECRET_JWT'),
  signOptions: { expiresIn: configService.get<string>('JWT_TIME') },
});
