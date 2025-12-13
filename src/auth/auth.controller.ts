import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RefreshDto } from './dto/refresh-auth.dto';
import { User } from '../user/entity/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

ApiTags('Authorization');
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Logins a user and returns a JWT-token' })
  @ApiResponse({ status: 200, type: Auth })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Incorrect login or password' })
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Signup a user' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict. Login already exists' })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Gets new pair of Access token and Refresh token' })
  @ApiResponse({ status: 200, type: Auth })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'Refresh token is invalid or expired' })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return await this.authService.refresh(dto);
  }
}
