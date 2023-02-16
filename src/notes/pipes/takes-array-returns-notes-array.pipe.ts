import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../../notes/note.entity';
import { Version } from '../../versions/version.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dtos/create-note.dto';

@Injectable()
export class TakesArrayReturnsNotesArrayPipe
  implements PipeTransform<CreateNoteDto[], Promise<CreateNoteDto[]>>
{
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}
  async transform(value: CreateNoteDto[]): Promise<CreateNoteDto[]> {
    // const version = this.versionsRepository
    //   .createQueryBuilder('version')
    //   .andWhere('version.id = :versionId', { versionId: value[0].versionId })
    //   .getOne();

    // if (!version) {
    //   throw new NotFoundException('Version not found');
    // }

    // 1) create note instances and 2)include version (a validation step)
    const noteInstances: CreateNoteDto[] = value.map((note) => {
      return this.notesRepository.create({
        ...note,
      });
    });

    value = noteInstances;
    return value;
    return value;
  }
}
