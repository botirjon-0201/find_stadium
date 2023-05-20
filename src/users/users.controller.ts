import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PasswordUserDto } from './dto/password-user.dto';
import { UserGuard } from 'src/guards/user.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { User } from './models/user.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [User] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard || AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, type: Object })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard || AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: 'Activate User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AdminGuard)
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @ApiOperation({ summary: 'Deactivate User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(+id);
  }

  @ApiOperation({ summary: 'User Is Owner' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch('owner/:id')
  isOwner(@Param('id') id: string) {
    return this.usersService.isOwner(+id);
  }

  @ApiOperation({ summary: 'Update User Password' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Patch('update-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() passwordUserDto: PasswordUserDto,
  ) {
    return this.usersService.updatePassword(+id, passwordUserDto);
  }
}
