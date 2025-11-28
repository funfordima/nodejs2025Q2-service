import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

import { Trim } from 'class-sanitizer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'To the Moon', description: 'Album name' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @ApiProperty({ example: '2026', description: 'Album year' })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty({ example: randomUUID(), description: 'Artist ID' })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
