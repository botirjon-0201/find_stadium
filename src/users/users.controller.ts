import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PasswordUserDto } from './dto/password-user.dto';
import { UserGuard } from 'src/guards/user.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { User } from './models/user.model';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Request, Response } from 'express';

@ApiTags(`Users`)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: `Get All Users` })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: `Get User` })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: `Update User` })
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: `Update User Password` })
  @UseGuards(UserGuard)
  @Patch(`password/:id`)
  updatePassword(
    @Param(`id`) id: string,
    @Body() passwordUserDto: PasswordUserDto,
  ) {
    return this.usersService.updatePassword(+id, passwordUserDto);
  }

  @ApiOperation({ summary: `Activate User` })
  @ApiResponse({ status: 200, type: [User] }) // array bilan oddiyni nima farqi bor?
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @ApiOperation({ summary: `Deactivate User` })
  @UseGuards(AdminGuard)
  @Patch('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(+id);
  }

  @ApiOperation({ summary: `User Is Owner` })
  @Patch('owner/:id')
  isOwner(@Param('id') id: string) {
    return this.usersService.isOwner(+id);
  }

  @ApiOperation({ summary: `Delete User` })
  @UseGuards(UserGuard || AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: `OTP` })
  @Post('/otp')
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOTP(phoneUserDto);
  }

  @ApiOperation({ summary: `Verify OTP` })
  @Post('/verify')
  verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.verifyOtp(verifyOtpDto, res);
  }
}
