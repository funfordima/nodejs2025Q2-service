import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';

export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackDto implements ITrack {
  @ApiProperty({ example: randomUUID(), description: 'UUID V4' })
  id: string;

  @ApiProperty({ example: 'Jack', description: 'User name' })
  name: string;

  @ApiProperty({ example: randomUUID(), description: 'UUID refers to Artist' })
  artistId: string | null;

  @ApiProperty({ example: randomUUID(), description: 'UUID refers to Album' })
  albumId: string | null;

  @ApiProperty({ example: Date.now(), description: 'Track duration' })
  duration: number;
}

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

export class UpdateTrackDto {
  @ApiProperty({ example: 'Jack', description: 'User name' })
  @IsOptional()
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
  @IsOptional()
  @IsInt()
  duration: number;
}
