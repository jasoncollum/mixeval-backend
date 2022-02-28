import { Module } from '@nestjs/common';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Version } from './version.entity';
import { Song } from '../songs/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Version, Song]), AuthModule],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
