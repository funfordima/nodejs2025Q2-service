import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
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
