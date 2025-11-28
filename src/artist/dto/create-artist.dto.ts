import { ApiProperty } from '@nestjs/swagger';

import { Trim } from 'class-sanitizer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
