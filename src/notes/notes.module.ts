import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Version } from '../versions/version.entity';
// import { NotesSubscriber } from '../subscriber/notes.subscriber';
// add Notes Subscriber to providers
import { SongsModule } from '../songs/songs.module';
import { VersionsModule } from '../versions/versions.module';
import { Song } from '../songs/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, Version, Song]),
    AuthModule,
    SongsModule,
    VersionsModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
