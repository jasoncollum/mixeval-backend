import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-note.dto';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from '../versions/version.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const version = await this.versionsRepository.findOne({
      where: { id: createNoteDto.versionId },
    });
    if (!version) {
      throw new NotFoundException('Version not found');
    }

    const note = this.notesRepository.create({
      text: createNoteDto.text,
      version,
    });

    try {
      return await this.notesRepository.save(note);
    } catch (error) {
      throw new ConflictException('Note already exists');
    }
  }

  async getNote(id: string): Promise<Note> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async updateNote(id: string, attrs: Partial<Note>): Promise<Note> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
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
