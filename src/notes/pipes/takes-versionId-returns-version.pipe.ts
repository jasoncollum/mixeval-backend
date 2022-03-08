import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TakesVersionIdReturnsVersionPipe
  implements PipeTransform<any, Promise<any>>
{
  constructor(
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}
  async transform(value): Promise<Version> {
    const version = await this.versionsRepository.findOne({
      where: {
        id: value.versionId,
      },
    });
    if (!version) {
      throw new NotFoundException('Version not found');
    }
    value.version = version;
    return value;
  }
}
