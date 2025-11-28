import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { IdParamDto } from '../common/dto/id-param.dto';

ApiTags('Albums');
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({ status: 201, type: Album })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, type: [Album] })
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get(':id')
  findOne(@Param() { id }: IdParamDto) {
    return this.albumService.findOne(id);
  }

  @ApiOperation({ summary: 'Update album info' })
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Put(':id')
  update(@Param() { id }: IdParamDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album and references' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Delete(':id')
  remove(@Param() { id }: IdParamDto) {
    return this.albumService.remove(id);
  }
}
