import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from '../version.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VersionByIdPipe
  implements PipeTransform<string, Promise<Version>>
{
  constructor(
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}
  async transform(value: string): Promise<Version> {
    const version = await this.versionsRepository.findOne(value);
    if (!version) {
      throw new NotFoundException('Version not found');
    }
    return version;
  }
}
