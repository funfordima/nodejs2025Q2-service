import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entity/track.entity';
import { IFavorite } from '../favorites/entities/favorite.entity';
import { User } from '../user/entity/user.entity';

export const users: User[] = [];
export const tracks: Track[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const favorites: IFavorite = {
  artists: [],
  albums: [],
  tracks: [],
};
