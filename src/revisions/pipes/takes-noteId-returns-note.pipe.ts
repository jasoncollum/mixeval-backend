import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../../notes/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TakesNoteIdReturnsNotePipe
  implements PipeTransform<any, Promise<any>>
{
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}
  async transform(value): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: {
        id: value.noteId,
      },
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    value.note = note;
    return value;
  }
}
