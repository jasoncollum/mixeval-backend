import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Param,
  Get,
  Delete,
  ParseArrayPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NewNoteDto } from './dtos/newNote.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';
import { Note } from './note.entity';
import { AuthGuard } from '@nestjs/passport';
import { ValidateNotesPipe } from './pipes/validate-notes.pipe';
import { NoteByIdPipe } from './pipes/note-by-id.pipe';
import { TakesArrayReturnsNotesArrayPipe } from './pipes/takes-array-returns-notes-array.pipe';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post('/')
  async createBulkNotes(
    @Body(ValidateNotesPipe) newNotes: NewNoteDto[],
  ): Promise<void> {
    console.log('FIRST NOTE', newNotes[0]);
    return await this.notesService.createBulkNotes(newNotes);
  }

  @Get('/:id')
  async getNote(@Param('id', NoteByIdPipe) note: Note): Promise<Note> {
    return note;
  }

  @Patch('/')
  async updateBulkNotes(
    @Body(TakesArrayReturnsNotesArrayPipe)
    updateNotes: UpdateNoteDto[],
  ): Promise<void> {
    console.log('CONTROLLER::', updateNotes);
    return await this.notesService.updateBulkNotes(updateNotes);
  }

  // @Patch('/:id')
  // async updateNote(
  //   @Param('id', NoteByIdPipe) note: Note,
  //   @Body(TakesVersionIdReturnsVersionPipe) noteDto: NoteDto,
  // ): Promise<Note> {
  //   return await this.notesService.updateNote(note, noteDto);
  // }

  @Delete('/')
  async deleteBulkNotes(
    @Body(new ParseArrayPipe({ items: String }))
    deletedNoteIds: string[],
  ): Promise<void> {
    return await this.notesService.deleteBulkNotes(deletedNoteIds);
  }

  // @Delete('/:id')
  // async deleteNote(@Param('id') id: string): Promise<void> {
  //   return await this.notesService.deleteNote(id);
  // }
}
