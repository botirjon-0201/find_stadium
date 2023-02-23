import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PasswordUserDto } from './dto/password-user.dto';
import { UserGuard } from 'src/guards/user.guard';

@ApiTags(`Users`)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: `Get All Users` })
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: `Get User` })
  @UseGuards(UserGuard)
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
  @Put(`:id/password`)
  updatePassword(
    @Param(`id`) id: string,
    @Body() passwordUserDto: PasswordUserDto,
  ) {
    return this.usersService.updatePassword(+id, passwordUserDto);
  }

  @ApiOperation({ summary: `User Is Active` })
  @Put(':id/active')
  isActive(@Param('id') id: string) {
    return this.usersService.isActive(+id);
  }

  @ApiOperation({ summary: `User Is Owner` })
  @Put(':id/owner')
  isOwner(@Param('id') id: string) {
    return this.usersService.isOwner(+id);
  }

  @ApiOperation({ summary: `Delete User` })
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
