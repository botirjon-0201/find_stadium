import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig: JwtModuleOptions = {
  secret: process.env.ACCESS_TOKEN_KEY,
  signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
};
