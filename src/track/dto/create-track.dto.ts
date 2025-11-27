import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

import { Trim } from 'class-sanitizer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'Jack', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @ApiPropertyOptional({
    example: randomUUID(),
    description: 'UUID refers to Artist',
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiPropertyOptional({
    example: randomUUID(),
    description: 'UUID refers to Album',
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({ example: Date.now(), description: 'Track duration' })
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
