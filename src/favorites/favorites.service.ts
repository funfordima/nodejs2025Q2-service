import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { FavoritesResponse } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async findAll(): Promise<FavoritesResponse> {
    const [artists, albums, tracks] = await Promise.all([
      this.prismaService.favoriteArtist.findMany({ select: { artist: true } }),
      this.prismaService.favoriteAlbum.findMany({ select: { album: true } }),
      this.prismaService.favoriteTrack.findMany({ select: { track: true } }),
    ]);

    return {
      artists: artists.map(({ artist }) => artist),
      albums: albums.map(({ album }) => album),
      tracks: tracks.map(({ track }) => track),
    };
  }

  async addTrack(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (!track) throw new UnprocessableEntityException('Track not found.');

    try {
      await this.prismaService.favoriteTrack.create({
        data: { trackId: id },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new UnprocessableEntityException('Track is already favorite.');
      }

      throw e;
    }
  }

  async removeTrack(id: string) {
    try {
      await this.prismaService.favoriteTrack.delete({ where: { trackId: id } });
    } catch {
      throw new NotFoundException('Track not found');
    }
  }

  async addAlbum(id: string) {
    const album = await this.prismaService.album.findUnique({ where: { id } });

    if (!album) throw new UnprocessableEntityException('Album not found.');

    try {
      await this.prismaService.favoriteAlbum.create({ data: { albumId: id } });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new UnprocessableEntityException('Album is already favorite.');
      }
      
      throw e;
    }
  }

  async removeAlbum(id: string) {
    try {
      await this.prismaService.favoriteAlbum.delete({ where: { albumId: id } });
    } catch {
      throw new NotFoundException('Album not found');
    }
  }

  async addArtist(id: string) {
    const artist = await this.prismaService.artist.findUnique({ where: { id } });

    if (!artist) throw new UnprocessableEntityException('Artist not found.');

    try {
      await this.prismaService.favoriteArtist.create({ data: { artistId: id } });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new UnprocessableEntityException('Artist is already favorite.');
      }
      throw e;
    }
  }

  async removeArtist(id: string) {
    try {
      await this.prismaService.favoriteArtist.delete({ where: { artistId: id } });
    } catch {
      throw new NotFoundException('Artist not found');
    }
  }
}
