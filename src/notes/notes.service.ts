import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-note.dto';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const alreadyExists = createNoteDto.version.notes.filter(
      (note) => note.text === createNoteDto.text,
    );

    if (alreadyExists.length > 0) {
      throw new ConflictException(`This mix note already exists`);
    }

    const note = this.notesRepository.create({
      text: createNoteDto.text,
      version: createNoteDto.version,
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
