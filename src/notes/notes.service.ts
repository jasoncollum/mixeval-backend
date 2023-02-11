import { Injectable, NotFoundException } from '@nestjs/common';
import { NewNoteDto } from './dtos/newNote.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';
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

  async createBulkNotes(newNotes: NewNoteDto[]): Promise<void> {
    try {
      await this.notesRepository.save(newNotes);
    } catch (error) {
      console.log(error);
      // add a custom exception message here ?
    }
  }

  // async updateNote(note: Note, attrs: Partial<Note>): Promise<Note> {
  //   Object.assign(note, attrs);
  //   return await this.notesRepository.save(note);
  // }

  async updateBulkNotes(updateNotes: UpdateNoteDto[]): Promise<void> {
    try {
      // await this.notesRepository.upsert(updateNotes, ['id']);
      await this.notesRepository.save(updateNotes);
    } catch (error) {
      // add a custom exception message here ?
    }
  }

  async deleteBulkNotes(deletedNoteIds: string[]): Promise<void> {
    try {
      await this.notesRepository.delete(deletedNoteIds);
    } catch (error) {
      // throw new NotFoundException('Note not found');
    }
  }

  // async deleteNote(id: string): Promise<void> {
  //   const result = await this.notesRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException('Note not found');
  //   }
  // }

  async addVersionToNotes(newNotes: NewNoteDto[]): Promise<Note[]> {
    const versionId = newNotes[0].versionId;
    const version = await this.versionsRepository.findOne({
      where: {
        id: versionId,
      },
    });
    const validatedNotes: Note[] = newNotes.map((note: Note) => {
      return {
        ...note,
        version: version,
      };
    });
    return validatedNotes;
  }
}
