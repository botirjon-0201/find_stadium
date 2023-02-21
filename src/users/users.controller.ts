import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PasswordUserDto } from './dto/password-user.dto';

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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: `Update User Password` })
  @Put(`:id/password`)
  updatePassword(
    @Param(`id`) id: string,
    @Body() passwordUserDto: PasswordUserDto,
  ) {
    return this.usersService.updatePassword(+id, passwordUserDto);
  }

  @ApiOperation({ summary: `IsActive User` })
  @Put(':id/active')
  isActive(@Param('id') id: string) {
    return this.usersService.isActive(+id);
  }

  @ApiOperation({ summary: `IsOwner User` })
  @Put(':id/owner')
  isCreator(@Param('id') id: string) {
    return this.usersService.isOwner(+id);
  }

  @ApiOperation({ summary: `Delete User` })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
