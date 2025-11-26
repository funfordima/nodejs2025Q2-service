import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { IsUUID } from 'class-validator';

export class IdParamDto {
  @ApiProperty({ example: randomUUID(), description: 'Resource ID UUID V4' })
  @IsUUID()
  id: string;
}
