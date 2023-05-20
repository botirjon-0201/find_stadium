import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { UserGuard } from 'src/guards/user.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // srcdan olyapti
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/models/user.model';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User Sign Up' })
  @ApiResponse({ status: 201, type: User })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(createUserDto, res);
  }

  @ApiOperation({ summary: 'User Sign In' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(loginUserDto, res);
  }

  @ApiOperation({ summary: 'User Sign Out' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signout(refresh_token, res);
  }

  @ApiOperation({ summary: 'User Refresh Token' })
  @UseGuards(UserGuard)
  @Post('refresh/:id')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(+id, refresh_token, res);
  }
}
