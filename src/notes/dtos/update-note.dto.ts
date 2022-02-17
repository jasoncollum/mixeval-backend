import { IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  text: string;
}
