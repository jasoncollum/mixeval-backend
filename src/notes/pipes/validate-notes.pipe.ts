import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';
import { NewNoteDto } from '../dtos/newNote.dto';
import { Note } from '../note.entity';

@Injectable()
export class ValidateNotesPipe
  implements PipeTransform<NewNoteDto[], Promise<NewNoteDto[]>>
{
  constructor(
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}
  async transform(value: NewNoteDto[]): Promise<NewNoteDto[]> {
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

    return value as NewNoteDto[];
  }
}
