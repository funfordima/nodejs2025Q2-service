import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class User {
  @ApiProperty({ example: randomUUID(), description: 'UUID V4' })
  id: string;

  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  login: string;

  @ApiProperty({ example: '123456789', description: "User's password" })
  password: string;

  @ApiProperty({ example: '1.0.0', description: 'Version' })
  version: number;

  @ApiProperty({ example: Date.now(), description: 'Created at' })
  createdAt: number;

  @ApiProperty({ example: Date.now(), description: 'Updated at' })
  updatedAt: number;
}

export class UserResponseDto {
  @ApiProperty({ example: randomUUID(), description: 'UUID V4' })
  id: string;

  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  login: string;

  @ApiProperty({ example: '1.0.0', description: 'Version' })
  version: number;

  @ApiProperty({ example: Date.now(), description: 'Created at' })
  createdAt: number;

  @ApiProperty({ example: Date.now(), description: 'Updated at' })
  updatedAt: number;
}
