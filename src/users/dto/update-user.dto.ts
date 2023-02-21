import { OmitType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'confirm_password']),
) {}
