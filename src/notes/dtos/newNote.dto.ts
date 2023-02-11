import { IsString } from 'class-validator';
import { Version } from '../../versions/version.entity';

export class NewNoteDto {
  @IsString()
  text: string;

  @IsString()
  versionId: string;

  version: Version;
}
