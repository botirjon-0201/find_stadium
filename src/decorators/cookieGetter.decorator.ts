import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CookieGetter = createParamDecorator(
  async (data: `refresh_token`, context: ExecutionContext): Promise<string> => {
    const refreshToken = context.switchToHttp().getRequest().cookies[data];
    if (!refreshToken) {
      throw new UnauthorizedException(`Token is not found`);
    }
    return refreshToken;
  },
);
