import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { TransformInterceptor } from './transform.interceptor';
import { ArtistsModule } from './artists/artists.module';
import { Artist } from './artists/artist.entity';
import { SongsModule } from './songs/songs.module';
import { Song } from './songs/song.entity';
import { VersionsModule } from './versions/versions.module';
import { Version } from './versions/version.entity';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';
import { RevisionsModule } from './revisions/revisions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Artist, Song, Version, Note],
      synchronize: true,
    }),
    AuthModule,
    ArtistsModule,
    SongsModule,
    VersionsModule,
    NotesModule,
    RevisionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
