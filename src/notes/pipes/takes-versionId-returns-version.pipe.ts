import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';
import { NoteDto } from '../dtos/note.dto';

@Injectable()
export class TakesVersionIdReturnsVersionPipe
  implements PipeTransform<NoteDto, Promise<NoteDto>>
{
  constructor(
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}
  async transform(value): Promise<NoteDto> {
    const version = await this.versionsRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.notes', 'n')
      .where('v.id = :id', { id: value.versionId })
      .getOne();

    if (!version) {
      throw new NotFoundException('Version not found');
    }
    value.version = version;
    return value;
  }
}
