import { IsString } from 'class-validator';
import { Note } from '../../notes/note.entity';

export class UpdateRevisionDto {
  @IsString()
  id: string;

  @IsString()
  text: string;

  @IsString()
  noteId: string;

  note: Note;
}
