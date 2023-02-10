import { IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  id: string;

  @IsString()
  text: string;

  @IsString()
  versionId: string;
}
