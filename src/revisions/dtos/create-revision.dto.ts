import { IsString } from 'class-validator';
import { Note } from '../../notes/note.entity';

export class CreateRevisionDto {
  @IsString()
  text: string;

  @IsString()
  noteId: string;

  note: Note;
}
