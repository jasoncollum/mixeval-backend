import { EntityRepository, Repository } from 'typeorm';
import { Note } from './note.entity';
import { Version } from '../versions/version.entity';
import { CreateNoteDto } from './dtos/create-note.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async createNote({ text }: CreateNoteDto, version: Version): Promise<Note> {
    const note = this.create({
      text,
      version,
    });

    try {
      return await this.save(note);
    } catch (error) {
      throw new ConflictException('Note already exists');
    }
  }

  async updateNote(id: string, attrs: Partial<Note>): Promise<Note> {
    const note = await this.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    Object.assign(note, attrs);
    return await this.save(note);
  }
}
