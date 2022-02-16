import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsRepository } from './songs.repository';
import { ArtistsRepository } from '../artists/artists.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SongsRepository, ArtistsRepository]),
    AuthModule,
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
