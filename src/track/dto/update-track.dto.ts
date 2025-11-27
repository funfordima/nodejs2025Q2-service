import { PartialType } from '@nestjs/swagger';

import { CreateTrackDto } from '../track.model';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
