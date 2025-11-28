import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { albums, artists, favorites, tracks } from '../database/db';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  findMany(): Artist[] {
    return artists;
  }

  findOne(id: string): Artist {
    const artist: Artist | undefined = artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  create({ name, grammy }: CreateArtistDto): Artist {
    const artist: Artist = {
      id: randomUUID(),
      name,
      grammy,
    };

    artists.push(artist);

    return artist;
  }

  delete(artistId: string): number {
    const index = artists.findIndex((a) => a.id === artistId);

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    artists.splice(index, 1);

    tracks
      .filter((t) => t.artistId === artistId)
      .forEach((t) => (t.artistId = null));
    albums
      .filter((a) => a.artistId === artistId)
      .forEach((t) => (t.artistId = null));

    const artistIndex: number = favorites.artists.findIndex(
      (id) => id === artistId,
    );

    if (artistIndex !== -1) {
      favorites.artists.splice(artistIndex, 1);
    }

    return index;
  }

  update(id: string, { name, grammy }: UpdateArtistDto): Artist {
    const artist: Artist | undefined = artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException('User not found.');
    }

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    return artist;
  }
}
