import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';

export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class ArtistDto implements IArtist {
  @ApiProperty({ example: randomUUID(), description: 'UUID V4' })
  id: string;

  @ApiProperty({ example: 'Jack', description: 'Artist name' })
  name: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if artist wins grammy',
  })
  grammy: boolean;
}

export class CreateArtistDto {
  @ApiProperty({ example: 'Jack', description: 'Artist name' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if artist wins grammy',
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @ApiProperty({ example: 'Jack', description: 'User name' })
  @IsOptional()
  @IsString()
  @Trim()
  name: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if artist wins grammy',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class ArtistIdParamDto {
  @ApiProperty({ example: randomUUID(), description: 'UUID V4' })
  @IsUUID()
  id: string;
}
