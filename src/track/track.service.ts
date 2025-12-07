import { Injectable, NotFoundException } from '@nestjs/common';

import { Track } from './entity/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Album, Artist } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async findMany(): Promise<Track[]> {
    return await this.prismaService.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track: Track | undefined = await this.prismaService.track.findUnique({ where: { id }});

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    return track;
  }

  async create(data: CreateTrackDto): Promise<Track> {
    if (!!data.artistId) {
      const artist: Artist | undefined = await this.prismaService.artist.findUnique({ where: { id: data.artistId }});
    
      if (!artist) {
        throw new NotFoundException('Artist not found.');
      }
    }
    
    if (!!data.albumId) {
      const album: Album | undefined = await this.prismaService.album.findUnique({ where: { id: data.albumId }});
      
      if (!album) {
        throw new NotFoundException('Album not found.');
      }
    }

    return await this.prismaService.track.create({ data });
  }

  async remove(id: string): Promise<void> {
    const track: Track | undefined = await this.prismaService.track.findUnique({ where: { id }});

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    await this.prismaService.track.delete({
      where: { id },
    });
  }

  async update(
    id: string,
    data: UpdateTrackDto,
  ): Promise<Track> {
    const track: Track | undefined = await this.prismaService.track.findUnique({ where: { id }});

    if (!track) {
      throw new NotFoundException('User not found.');
    }

    return await this.prismaService.track.update({
      where: { id },
      data,
    });
  }
}
