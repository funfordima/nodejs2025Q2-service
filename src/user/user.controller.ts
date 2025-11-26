import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateUserDto,
  UpdatePasswordDto,
  UserResponseDto,
} from './user.model';
import { UserService } from './user.service';
import { IdParamDto } from '../common/dto/id-param.dto';

ApiTags('Users');
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  @Get()
  getAll() {
    return this.userService.findMany();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get(':id')
  getById(@Param() { id }: IdParamDto) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Put(':id')
  update(@Param() { id }: IdParamDto, @Body() dto: UpdatePasswordDto) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() { id }: IdParamDto) {
    this.userService.delete(id);
  }
}
