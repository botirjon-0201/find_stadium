import { PartialType } from '@nestjs/swagger';
import { CreateStadiumTimeDto } from './create-stadium_time.dto';

export class UpdateStadiumTimeDto extends PartialType(CreateStadiumTimeDto) {}
