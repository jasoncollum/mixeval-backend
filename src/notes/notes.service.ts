import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from 'src/versions/version.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Version)
    private versionsRepository: Repository<Version>,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(createNoteDto);
    return await this.notesRepository.save(note);
  }

  async updateBulkNotes(updateNotes: UpdateNoteDto[]): Promise<void> {
    try {
      await this.notesRepository.upsert(updateNotes, ['id']);
    } catch (error) {
      // add a custom exception message here ?
      console.log(error);
    }
  }

  async deleteNote(id: string): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }
  }
}
