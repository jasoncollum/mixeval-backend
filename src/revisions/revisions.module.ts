import { Module } from '@nestjs/common';
import { RevisionsService } from './revisions.service';
import { RevisionsController } from './revisions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Note } from '../notes/note.entity';
import { Revision } from './revision.entity';
import { RevisionsSubscriber } from '../subscriber/revisions.subscriber';
import { Song } from '../songs/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Revision, Note, Song]), AuthModule],
  providers: [RevisionsService, RevisionsSubscriber],
  controllers: [RevisionsController],
})
export class RevisionsModule {}
