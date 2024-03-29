import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CookieGetter = createParamDecorator(
  async (data: 'refresh_token', context: ExecutionContext): Promise<string> => {
    const refresh_token = context.switchToHttp().getRequest().cookies[data];
    if (!refresh_token) throw new UnauthorizedException('Token is not found');

    return refresh_token;
  },
);
