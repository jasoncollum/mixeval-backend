import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist]), AuthModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
