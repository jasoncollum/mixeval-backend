import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteDto } from './dtos/note.dto';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async createBulkNotes(newNotes: NoteDto[]): Promise<NoteDto[]> {
    try {
      return await this.notesRepository.save(newNotes);
    } catch (error) {
      // add a custom exception message here ?
    }
  }

  async updateNote(note: Note, attrs: Partial<Note>): Promise<Note> {
    Object.assign(note, attrs);
    return await this.notesRepository.save(note);
  }

  async deleteNote(id: string): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }
  }
}
