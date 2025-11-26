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

import { TrackService } from './track.service';
import {
  CreateTrackDto,
  TrackDto,
  TrackIdParamDto,
  UpdateTrackDto,
} from './track.model';

ApiTags('Tracks');
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [TrackDto] })
  @Get()
  getAll() {
    return this.trackService.findMany();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: TrackDto })
  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: 200, type: TrackDto })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get(':id')
  getById(@Param() params: TrackIdParamDto) {
    return this.trackService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, type: TrackDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Put(':id')
  update(@Param() params: TrackIdParamDto, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() params: TrackIdParamDto) {
    this.trackService.delete(params.id);
  }
}
