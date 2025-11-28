import { ApiProperty } from '@nestjs/swagger';

import { Trim } from 'class-sanitizer';
import { IsNotEmpty, IsString } from 'class-validator';

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
