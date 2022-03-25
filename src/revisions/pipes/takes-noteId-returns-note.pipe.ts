import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../../notes/note.entity';
import { Repository } from 'typeorm';
import { CreateRevisionDto } from '../dtos/create-revision.dto';

@Injectable()
export class TakesNoteIdReturnsNotePipe
  implements PipeTransform<CreateRevisionDto, Promise<CreateRevisionDto>>
{
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}
  async transform(value): Promise<CreateRevisionDto> {
    const note = await this.notesRepository
      .createQueryBuilder('n')
      .leftJoinAndSelect('n.revisions', 'r')
      .where('n.id = :id', { id: value.noteId })
      .getOne();

    if (!note) {
      throw new NotFoundException('Note not found');
    }
    value.note = note;
    return value;
  }
}
