import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';
import { UpdateNoteDto } from '../dtos/update-note.dto';
import { Note } from '../note.entity';

@Injectable()
export class ValidateUpdateNotesPipe
  implements PipeTransform<UpdateNoteDto[], Promise<UpdateNoteDto[]>>
{
  constructor(
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}
  async transform(value: UpdateNoteDto[]): Promise<UpdateNoteDto[]> {
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

    return value as UpdateNoteDto[];
  }
}
