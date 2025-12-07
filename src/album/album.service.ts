import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateAlbumDto): Promise<Album> {
    if (!!data.artistId) {
      const artist: Artist | undefined =
        await this.prismaService.artist.findUnique({
          where: { id: data.artistId },
        });

      if (!artist) {
        throw new NotFoundException('Artist not found.');
      }
    }

    return await this.prismaService.album.create({ data });
  }

  async findAll(): Promise<Album[]> {
    return await this.prismaService.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album: Album | undefined = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: string, data: UpdateAlbumDto): Promise<Album> {
    const album: Album | undefined = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    return await this.prismaService.album.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    const album: Album | undefined = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    await this.prismaService.album.delete({
      where: { id },
    });
  }
}
