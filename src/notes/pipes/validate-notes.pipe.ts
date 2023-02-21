import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { Note } from '../note.entity';

@Injectable()
export class ValidateNotesPipe
  implements PipeTransform<CreateNoteDto[], Promise<CreateNoteDto[]>>
{
  constructor(
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}
  async transform(value: CreateNoteDto[]): Promise<CreateNoteDto[]> {
    const version = await this.versionsRepository.findOne({
      where: {
        id: value[0].versionId,
      },
    });

    if (!version) {
      throw new NotFoundException('Version not found');
    }

    // add version and create note instances
    value.forEach((note) => (note.version = version));

    return value as CreateNoteDto[];
  }
}
