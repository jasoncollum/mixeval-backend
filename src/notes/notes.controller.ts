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
import { NoteDto } from './dtos/note.dto';
import { Note } from './note.entity';
import { AuthGuard } from '@nestjs/passport';
import { TakesVersionIdReturnsVersionPipe } from './pipes/takes-versionId-returns-version.pipe';
import { NoteByIdPipe } from './pipes/note-by-id.pipe';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post('/')
  async createBulkNotes(
    @Body(
      new ParseArrayPipe({ items: NoteDto }),
      TakesVersionIdReturnsVersionPipe,
    )
    newNotes: NoteDto[],
  ): Promise<NoteDto[]> {
    return await this.notesService.createBulkNotes(newNotes);
  }

  @Get('/:id')
  async getNote(@Param('id', NoteByIdPipe) note: Note): Promise<Note> {
    return note;
  }

  @Patch('/:id')
  async updateNote(
    @Param('id', NoteByIdPipe) note: Note,
    @Body(TakesVersionIdReturnsVersionPipe) noteDto: NoteDto,
  ): Promise<Note> {
    return await this.notesService.updateNote(note, noteDto);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string): Promise<void> {
    return await this.notesService.deleteNote(id);
  }
}
