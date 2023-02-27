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

@ApiTags(`Auth`)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: `User Registerition` })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: `User Login` })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: `User Logout` })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter(`refresh_token`) refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(refresh_token, res);
  }

  @ApiOperation({ summary: `Refresh Token` })
  @UseGuards(UserGuard)
  @Post(`:id/refresh`)
  refresh(
    @Param(`id`) id: string,
    @CookieGetter(`refresh_token`) refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(+id, refresh_token, res);
  }
}
