import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  async createNote(noteDto: NoteDto): Promise<Note> {
    const alreadyExists = noteDto.version.notes.filter(
      (note) => note.text === noteDto.text,
    );

    if (alreadyExists.length > 0) {
      throw new ConflictException(`This mix note already exists`);
    }

    const note = this.notesRepository.create({
      text: noteDto.text,
      version: noteDto.version,
    });

    try {
      return await this.notesRepository.save(note);
    } catch (error) {}
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
