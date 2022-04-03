import { IsString } from 'class-validator';
import { Note } from '../../notes/note.entity';

export class RevisionDto {
  @IsString()
  text: string;

  @IsString()
  noteId: string;

  note: Note;
}
