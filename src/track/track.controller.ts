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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TrackService } from './track.service';
import { IdParamDto } from '../common/dto/id-param.dto';
import { Track } from './entity/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { AuthGuard } from '../auth/auth.guard';

ApiTags('Tracks');
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  @Get()
  async getAll() {
    return await this.trackService.findMany();
  }

  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({ status: 201, type: Track })
  @Post()
  async create(@Body() dto: CreateTrackDto) {
    return await this.trackService.create(dto);
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get(':id')
  async getById(@Param() { id }: IdParamDto) {
    return await this.trackService.findOne(id);
  }

  @ApiOperation({ summary: 'Update track info' })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Put(':id')
  async update(@Param() { id }: IdParamDto, @Body() dto: UpdateTrackDto) {
    return await this.trackService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() { id }: IdParamDto) {
    await this.trackService.remove(id);
  }
}
