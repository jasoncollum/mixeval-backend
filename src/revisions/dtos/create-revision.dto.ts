import { IsString } from 'class-validator';

export class CreateRevisionDto {
  @IsString()
  text: string;

  @IsString()
  noteId: string;
}
