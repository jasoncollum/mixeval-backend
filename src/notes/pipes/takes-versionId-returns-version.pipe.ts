import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from '../../versions/version.entity';
import { CreateNoteDto } from '../dtos/create-note.dto';

@Injectable()
export class TakesArtistIdReturnsArtistPipe
  implements PipeTransform<CreateNoteDto, Promise<CreateNoteDto>>
{
  constructor(
    @InjectRepository(Version)
    private artistsRepository: Repository<Version>,
  ) {}
  async transform(value): Promise<CreateNoteDto> {
    const version = await this.artistsRepository
      .createQueryBuilder('version')
      .where('version.id = :id', { id: value.versionId })
      .getOne();

    if (!version) {
      throw new NotFoundException('Version not found');
    }
    value.version = version;
    return value;
  }
}
