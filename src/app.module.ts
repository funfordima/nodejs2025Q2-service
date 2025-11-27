import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { CommonModule } from './common/common.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    CommonModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
