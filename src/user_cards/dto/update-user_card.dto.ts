import { PartialType } from '@nestjs/swagger';
import { CreateUserCardDto } from './create-user_card.dto';

export class UpdateUserCardDto extends PartialType(CreateUserCardDto) {}
