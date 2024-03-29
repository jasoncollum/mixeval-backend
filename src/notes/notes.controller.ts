import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { AuthGuard } from '@nestjs/passport';
import { ValidateUpdateNotesPipe } from './pipes/validate-update-notes.pipe';
import { NoteByIdPipe } from './pipes/note-by-id.pipe';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { CreateNoteDto } from './dtos/create-note.dto';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post('/')
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.notesService.createNote(createNoteDto);
  }

  @Get('/:id')
  async getNote(@Param('id', NoteByIdPipe) note: Note): Promise<Note> {
    return note;
  }

  @Patch('/')
  async updateBulkNotes(
    @Body(ValidateUpdateNotesPipe) updateNotes: UpdateNoteDto[],
  ): Promise<void> {
    return await this.notesService.updateBulkNotes(updateNotes);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string): Promise<void> {
    return await this.notesService.deleteNote(id);
  }
}
