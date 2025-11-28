import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class Artist {
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
