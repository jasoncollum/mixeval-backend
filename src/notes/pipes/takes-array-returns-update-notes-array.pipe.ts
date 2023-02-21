import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../../notes/note.entity';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';
import { UpdateNoteDto } from '../dtos/update-note.dto';

@Injectable()
export class TakesArrayReturnsNotesArrayPipe
  implements PipeTransform<UpdateNoteDto[], Promise<UpdateNoteDto[]>>
{
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}
  async transform(value: UpdateNoteDto[]): Promise<UpdateNoteDto[]> {
    const version = await this.versionsRepository
      .createQueryBuilder('version')
      .where('version.id = :id', { id: value[0].versionId })
      .getOne();

    if (!version) {
      throw new NotFoundException('Version not found');
    }

    // 1) create note instances and 2)include version (a validation step)
    const noteInstances: UpdateNoteDto[] = value.map((note) => {
      return this.notesRepository.create({
        ...note,
        version: version,
      });
    });

    value = noteInstances;
    return value;
  }
}
