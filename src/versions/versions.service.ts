import { Injectable, NotFoundException } from '@nestjs/common';
import { SongsRepository } from '../songs/songs.repository';
import { CreateVersionDto } from './dtos/create-version.dto';
import { VersionsRepository } from './versions.repository';
import { Version } from './version.entity';
import { UpdateVersionDto } from './dtos/update-version.dto';

@Injectable()
export class VersionsService {
  constructor(
    private songsRepository: SongsRepository,
    private versionsRepository: VersionsRepository,
  ) {}

  async createVersion(createVersionDto: CreateVersionDto): Promise<Version> {
    const result = await this.songsRepository.find({
      id: createVersionDto.songId,
    });
    if (!result) {
      throw new NotFoundException('Song not found');
    }
    const song = result[0];
    return await this.versionsRepository.createVersion(createVersionDto, song);
  }

  async getVersion(id: string): Promise<Version> {
    const version = await this.versionsRepository.findOne(id);
    if (!version) {
      throw new NotFoundException('Version not found');
    }
    return version;
  }

  async updateVersion(
    id: string,
    updateVersionDto: UpdateVersionDto,
  ): Promise<Version> {
    return await this.versionsRepository.updateVersion(id, updateVersionDto);
  }

  async deleteVersion(id: string): Promise<void> {
    const result = await this.versionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Version not found');
    }
  }
}
