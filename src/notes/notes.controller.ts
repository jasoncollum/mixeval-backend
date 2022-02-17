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
import { CreateNoteDto } from './dtos/create-note.dto';
import { Note } from './note.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post('/')
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.notesService.createNote(createNoteDto);
  }

  @Get('/:id')
  async getNote(@Param('id') id: string): Promise<Note> {
    return await this.notesService.getNote(id);
  }

  @Patch('/:id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return await this.notesService.updateNote(id, updateNoteDto);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string): Promise<void> {
    return await this.notesService.deleteNote(id);
  }
}
