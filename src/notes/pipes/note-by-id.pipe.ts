import { Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteByIdPipe implements PipeTransform<string, Promise<Note>> {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}
  async transform(value: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id: value });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }
}
