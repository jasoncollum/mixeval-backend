import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dtos/create-note.dto';

@Injectable()
export class TakesVersionIdReturnsVersionPipe
  implements PipeTransform<CreateNoteDto, Promise<CreateNoteDto>>
{
  constructor(
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}
  async transform(value): Promise<CreateNoteDto> {
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
