import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatorGuard } from 'src/guards/creator.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { PasswordAdminDto } from './dto/password-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';

@ApiTags(`Admin`)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: `Admin Registerition` })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: `Admin Login` })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: `Admin Logout` })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter(`refresh_token`) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: `Refresh Token` })
  @UseGuards(AdminGuard)
  @Post(`:id/refresh`)
  refresh(
    @Param(`id`) id: string,
    @CookieGetter(`refresh_token`) refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: `Find All Admins` })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: `Get Admin` })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: `Update Admin` })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: `Update Admin Password` })
  @UseGuards(AdminGuard)
  @Put(`:id/password`)
  updatePassword(
    @Param(`id`) id: string,
    @Body() passwordAdminDto: PasswordAdminDto,
  ) {
    return this.adminService.updatePassword(+id, passwordAdminDto);
  }

  @ApiOperation({ summary: `IsActive Admin` })
  @UseGuards(AdminGuard)
  @Put(':id/active')
  isActive(@Param('id') id: string) {
    return this.adminService.isActive(+id);
  }

  @ApiOperation({ summary: `IsCreator Admin` })
  @UseGuards(CreatorGuard)
  @Put(':id/creator')
  isCreator(@Param('id') id: string) {
    return this.adminService.isCreator(+id);
  }

  @ApiOperation({ summary: `Delete Admin` })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
