import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Version } from '../versions/version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Version]), AuthModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
