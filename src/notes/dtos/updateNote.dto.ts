import { IsString } from 'class-validator';
import { Version } from 'src/versions/version.entity';

export class UpdateNoteDto {
  @IsString()
  id: string;

  @IsString()
  text: string;

  @IsString()
  versionId: string;

  version: Version;
}
