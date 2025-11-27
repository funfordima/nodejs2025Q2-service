import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class Track {
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
