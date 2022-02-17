import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dtos/create-note.dto';
import { VersionsRepository } from '../versions/versions.repository';
import { Note } from './note.entity';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    private notesRepository: NotesRepository,
    private versionsRepository: VersionsRepository,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const result = await this.versionsRepository.find({
      where: { id: createNoteDto.versionId },
    });
    if (!result) {
      throw new NotFoundException('Version not found');
    }
    const version = result[0];
    return await this.notesRepository.createNote(createNoteDto, version);
  }

  async getNote(id: string): Promise<Note> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async updateNote(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return await this.notesRepository.updateNote(id, updateNoteDto);
  }

  async deleteNote(id: string): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }
  }
}
