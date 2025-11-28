import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { favorites, tracks } from '../database/db';
import { Track } from './entity/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  findMany(): Track[] {
    return tracks;
  }

  findOne(id: string): Track {
    const track: Track | undefined = tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    return track;
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto): Track {
    const track: Track = {
      id: randomUUID(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };

    tracks.push(track);

    return track;
  }

  remove(trackId: string): number {
    const index = tracks.findIndex((u) => u.id === trackId);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    tracks.splice(index, 1);

    const trackIndex: number = favorites.tracks.findIndex(
      (id) => id === trackId,
    );

    if (trackIndex !== -1) {
      favorites.tracks.splice(trackIndex, 1);
    }

    return index;
  }

  update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ): Track {
    const track: Track | undefined = tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException('User not found.');
    }

    track.name = name ?? track.name;
    track.artistId = artistId ?? track.artistId;
    track.albumId = albumId ?? track.albumId;
    track.duration = duration ?? track.duration;

    return track;
  }
}
