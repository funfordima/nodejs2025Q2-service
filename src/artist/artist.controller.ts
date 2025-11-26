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

import { ArtistService } from './artist.service';
import {
  ArtistDto,
  ArtistIdParamDto,
  CreateArtistDto,
  UpdateArtistDto,
} from './artist.model';

ApiTags('Artists');
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, type: [ArtistDto] })
  @Get()
  getAll() {
    return this.artistService.findMany();
  }

  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({ status: 201, type: ArtistDto })
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiResponse({ status: 200, type: ArtistDto })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get(':id')
  getById(@Param() params: ArtistIdParamDto) {
    return this.artistService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Update artist info' })
  @ApiResponse({ status: 200, type: ArtistDto })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Put(':id')
  update(@Param() params: ArtistIdParamDto, @Body() dto: UpdateArtistDto) {
    return this.artistService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Delete artist and references' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() params: ArtistIdParamDto) {
    this.artistService.delete(params.id);
  }
}
