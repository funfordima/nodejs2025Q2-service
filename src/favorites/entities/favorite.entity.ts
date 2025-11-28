import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entity/track.entity';

export class FavoritesResponse {
  @ApiProperty({
    example: [{ name: 'Elton John', grammy: true }],
    description: 'List of artists',
  })
  artists: Artist[];

  @ApiProperty({
    example: [{ name: 'To the Moon', year: 2018, artistId: randomUUID() }],
    description: 'List of albums',
  })
  albums: Album[];

  @ApiProperty({
    example: [
      {
        name: 'Track',
        artistId: randomUUID(),
        albumId: randomUUID(),
        duration: 240,
      },
    ],
    description: 'List of tracks',
  })
  tracks: Track[];
}

export interface IFavorite {
  artists: string[];
  albums: string[];
  tracks: string[];
}
