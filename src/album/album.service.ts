import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albums, favorites, tracks } from '../database/db';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  create({ name, year, artistId }: CreateAlbumDto): Album {
    const album: Album = {
      id: randomUUID(),
      name,
      year,
      artistId,
    };

    albums.push(album);

    return album;
  }

  findAll(): Album[] {
    return albums;
  }

  findOne(id: string): Album {
    const album: Album | undefined = albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto): Album {
    const album: Album | undefined = albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException('User not found.');
    }

    album.name = name ?? album.name;
    album.year = year ?? album.year;
    album.artistId = artistId ?? album.artistId;

    return album;
  }

  remove(albumId: string): number {
    const index = albums.findIndex((a) => a.id === albumId);

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    albums.splice(index, 1);

    tracks
      .filter((t) => t.albumId === albumId)
      .forEach((t) => (t.albumId = null));

    const albumIndex: number = favorites.albums.findIndex(
      (id) => id === albumId,
    );

    if (albumIndex !== -1) {
      favorites.albums.splice(albumIndex, 1);
    }

    return index;
  }
}
