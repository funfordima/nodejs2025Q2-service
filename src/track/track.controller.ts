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
import { IdParamDto } from '../common/dto/id-param.dto';
import { Track } from './entity/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

ApiTags('Tracks');
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  @Get()
  getAll() {
    return this.trackService.findMany();
  }

  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({ status: 201, type: Track })
  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get(':id')
  getById(@Param() { id }: IdParamDto) {
    return this.trackService.findOne(id);
  }

  @ApiOperation({ summary: 'Update track info' })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Put(':id')
  update(@Param() { id }: IdParamDto, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() { id }: IdParamDto) {
    this.trackService.delete(id);
  }
}
