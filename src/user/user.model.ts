import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class UserDto implements IUser {
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

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  readonly login: string;

  @ApiProperty({ example: '123456789', description: "User's password" })
  @IsNotEmpty()
  @IsString()
  @Trim()
  readonly password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ example: '123456789', description: "User's old password" })
  @IsNotEmpty()
  @IsString()
  @Trim()
  readonly oldPassword: string;

  @ApiProperty({ example: '987654321', description: "User's new password" })
  @IsNotEmpty()
  @IsString()
  @Trim()
  readonly newPassword: string;
}

export class UserIdParamDto {
  @ApiProperty({ example: randomUUID(), description: 'UUID V4' })
  @IsUUID()
  id: string;
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
