import { IsString } from 'class-validator';
import { Version } from '../../versions/version.entity';

export class NoteDto {
  @IsString()
  text: string;

  @IsString()
  versionId: string;

  version: Version;
}
