import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshDto {
  @ApiProperty({ example: 'Bearer <jwt_token>', description: 'Refresh JWT token' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  refreshToken: string;
}
