import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesRepository } from './notes.repository';
import { VersionsRepository } from '../versions/versions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotesRepository, VersionsRepository]),
    AuthModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
