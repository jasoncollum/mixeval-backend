import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Version } from '../versions/version.entity';
import { NotesSubscriber } from '../subscriber/notes.subscriber';
import { SongsModule } from '../songs/songs.module';
import { Song } from '../songs/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, Version, Song]),
    AuthModule,
    SongsModule,
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesSubscriber],
})
export class NotesModule {}
