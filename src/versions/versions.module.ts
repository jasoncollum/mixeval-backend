import { Module } from '@nestjs/common';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsRepository } from '../songs/songs.repository';
import { AuthModule } from '../auth/auth.module';
import { VersionsRepository } from './versions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([VersionsRepository, SongsRepository]),
    AuthModule,
  ],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
