import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateVersionDto } from './dtos/create-version.dto';
import { Version } from './version.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../songs/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VersionsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}

  async createVersion(createVersionDto: CreateVersionDto): Promise<Version> {
    const version = this.versionsRepository.create({
      number: createVersionDto.number,
      song: createVersionDto.song,
    });

    try {
      return await this.versionsRepository.save(version);
    } catch (error) {
      throw new ConflictException('Version already exists');
    }
  }

  async getVersion(id: string): Promise<Version> {
    const version = await this.versionsRepository.findOne(id);
    if (!version) {
      throw new NotFoundException('Version not found');
    }
    return version;
  }

  async updateVersion(id: string, attrs: Partial<Version>): Promise<Version> {
    const version = await this.versionsRepository.findOne(id);
    if (!version) {
      throw new NotFoundException('Version not found');
    }
    Object.assign(version, attrs);
    return await this.versionsRepository.save(version);
  }

  async deleteVersion(id: string): Promise<void> {
    const result = await this.versionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Version not found');
    }
  }
}
