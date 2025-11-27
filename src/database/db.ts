import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { IUser } from '../user/user.model';
import { Track } from '../track/entity/track.entity';
import { IFavorite } from '../favorites/entities/favorite.entity';

export const users: IUser[] = [];
export const tracks: Track[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const favorites: IFavorite = {
  artists: [],
  albums: [],
  tracks: [],
};
