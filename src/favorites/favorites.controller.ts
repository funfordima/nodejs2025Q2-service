import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './entities/favorite.entity';
import { IdParamDto } from '../common/dto/id-param.dto';

ApiTags('Favorites');
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, type: FavoritesResponse })
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 422, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  addTrack(@Param() { id }: IdParamDto) {
    return this.favoritesService.addTrack(id);
  }

  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Track is not favorite' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param() { id }: IdParamDto) {
    return this.favoritesService.removeTrack(id);
  }

  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 422, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  addArtist(@Param() { id }: IdParamDto) {
    return this.favoritesService.addArtist(id);
  }

  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Artist is not favorite' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param() { id }: IdParamDto) {
    return this.favoritesService.removeArtist(id);
  }

  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 422, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  addAlbum(@Param() { id }: IdParamDto) {
    return this.favoritesService.addAlbum(id);
  }

  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Album is not favorite' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param() { id }: IdParamDto) {
    return this.favoritesService.removeAlbum(id);
  }
}
