import { IsString } from 'class-validator';
export class CreateNoteDto {
  @IsString()
  text: string;

  @IsString()
  versionId: string;
}
