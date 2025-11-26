import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { tracks } from '../database/db';
import { CreateTrackDto, ITrack, UpdateTrackDto } from './track.model';

@Injectable()
export class TrackService {
  findMany(): ITrack[] {
    return tracks;
  }

  findOne(id: string): ITrack {
    const track: ITrack | undefined = tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    return track;
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto): ITrack {
    const track: ITrack = {
      id: randomUUID(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };

    tracks.push(track);

    return track;
  }

  delete(id: string): number {
    const index = tracks.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    tracks.splice(index, 1);

    return index;
  }

  update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ): ITrack {
    const track: ITrack | undefined = tracks.find((t) => t.id === id);

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
