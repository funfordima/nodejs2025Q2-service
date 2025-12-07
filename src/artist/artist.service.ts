import { Injectable, NotFoundException } from '@nestjs/common';

import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Artist[]> {
    return await this.prismaService.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist | undefined =
      await this.prismaService.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  async create(data: CreateArtistDto): Promise<Artist> {
    return await this.prismaService.artist.create({ data });
  }

  async delete(id: string): Promise<void> {
    const artist: Artist | undefined =
      await this.prismaService.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    await this.prismaService.artist.delete({
      where: { id },
    });
  }

  async update(id: string, data: UpdateArtistDto): Promise<Artist> {
    const artist: Artist | undefined =
      await this.prismaService.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('User not found.');
    }

    return await this.prismaService.artist.update({
      where: { id },
      data,
    });
  }
}
