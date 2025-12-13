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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IdParamDto } from '../common/dto/id-param.dto';
import { AuthGuard } from '../auth/auth.guard';

ApiTags('Artists');
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, type: [Artist] })
  @Get()
  async getAll() {
    return await this.artistService.findMany();
  }

  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({ status: 201, type: Artist })
  @Post()
  async create(@Body() dto: CreateArtistDto) {
    return await this.artistService.create(dto);
  }

  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get(':id')
  async getById(@Param() { id }: IdParamDto) {
    return await this.artistService.findOne(id);
  }

  @ApiOperation({ summary: 'Update artist info' })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Put(':id')
  async update(@Param() { id }: IdParamDto, @Body() dto: UpdateArtistDto) {
    return await this.artistService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete artist and references' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() { id }: IdParamDto) {
    await this.artistService.delete(id);
  }
}
