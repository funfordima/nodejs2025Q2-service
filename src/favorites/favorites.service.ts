import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { albums, artists, favorites, tracks } from '../database/db';
import { FavoritesResponse } from './entities/favorite.entity';
import { Track } from '../track/entity/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class FavoritesService {
  findAll(): FavoritesResponse {
    const favoriteArtists: FavoritesResponse['artists'] = favorites.artists
      .map((id) => artists.find((a) => a.id === id))
      .filter((a) => !!a);
    const favoriteAlbums: FavoritesResponse['albums'] = favorites.albums
      .map((id) => albums.find((a) => a.id === id))
      .filter((a) => !!a);
    const favoriteTracks: FavoritesResponse['tracks'] = favorites.tracks
      .map((id) => tracks.find((t) => t.id === id))
      .filter((a) => !!a);

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  addTrack(trackId: string): void {
    const track: Track | undefined = tracks.find((t) => t.id === trackId);

    if (!track) {
      throw new UnprocessableEntityException('Track not found.');
    }

    favorites.tracks.push(trackId);
  }

  removeTrack(trackId: string): void {
    const index: number = favorites.tracks.findIndex((id) => id === trackId);

    if (index === -1) {
      throw new NotFoundException('Track is not favorite.');
    }

    favorites.tracks.splice(index, 1);
  }

  addAlbum(albumId: string): void {
    const album: Album | undefined = albums.find((a) => a.id === albumId);

    if (!album) {
      throw new UnprocessableEntityException('Album not found.');
    }

    favorites.albums.push(albumId);
  }

  removeAlbum(albumId: string): void {
    const index: number = favorites.albums.findIndex((id) => id === albumId);

    if (index === -1) {
      throw new NotFoundException('Album is not favorite.');
    }

    favorites.albums.splice(index, 1);
  }

  addArtist(artistId: string): void {
    const artist: Artist | undefined = artists.find((a) => a.id === artistId);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found.');
    }

    favorites.artists.push(artistId);
  }

  removeArtist(artistId: string): void {
    const index: number = favorites.artists.findIndex((id) => id === artistId);

    if (index === -1) {
      throw new NotFoundException('Artist is not favorite.');
    }

    favorites.artists.splice(index, 1);
  }
}
