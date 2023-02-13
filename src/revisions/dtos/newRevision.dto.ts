import { IsString } from 'class-validator';
import { Note } from '../../notes/note.entity';

export class NewRevisionDto {
  @IsString()
  text: string;

  @IsString()
  noteId: string;

  note: Note;
}
