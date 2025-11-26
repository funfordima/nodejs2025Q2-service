import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class Album {
  @ApiProperty({ example: randomUUID(), description: 'ID UUID V4' })
  id: string;

  @ApiProperty({ example: 'To the Moon', description: 'Album name' })
  name: string;

  @ApiProperty({ example: '2026', description: 'Album year' })
  year: number;

  @ApiProperty({ example: randomUUID(), description: 'Artist ID' })
  artistId: string | null;
}
