import { ConflictException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Version } from './version.entity';
import { Song } from '../songs/song.entity';
import { CreateVersionDto } from './dtos/create-version.dto';

@EntityRepository(Version)
export class VersionsRepository extends Repository<Version> {
  async createVersion(
    { number }: CreateVersionDto,
    song: Song,
  ): Promise<Version> {
    const version = this.create({
      number,
      song,
    });

    try {
      return await this.save(version);
    } catch (error) {
      throw new ConflictException('Version already exists');
    }
  }

  async updateVersion(id: string, attrs: Partial<Version>): Promise<Version> {
    const version = await this.findOne(id);
    if (!version) {
      throw new NotFoundException('Version not found');
    }
    Object.assign(version, attrs);
    return await this.save(version);
  }
}
