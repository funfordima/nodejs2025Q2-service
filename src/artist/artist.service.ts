import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { albums, artists, tracks } from '../database/db';
import { CreateArtistDto, IArtist, UpdateArtistDto } from './artist.model';

@Injectable()
export class ArtistService {
  findMany(): IArtist[] {
    return artists;
  }

  findOne(id: string): IArtist {
    const artist: IArtist | undefined = artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  create({ name, grammy }: CreateArtistDto): IArtist {
    const artist: IArtist = {
      id: randomUUID(),
      name,
      grammy,
    };

    artists.push(artist);

    return artist;
  }

  delete(id: string): number {
    const index = artists.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    artists.splice(index, 1);

    tracks.filter((t) => t.artistId === id).forEach((t) => (t.artistId = null));
    albums.filter((a) => a.artistId === id).forEach((t) => (t.artistId = null));

    return index;
  }

  update(id: string, { name, grammy }: UpdateArtistDto): IArtist {
    const artist: IArtist | undefined = artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException('User not found.');
    }

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    return artist;
  }
}
