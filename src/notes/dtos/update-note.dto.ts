import { IsString } from 'class-validator';
import { Version } from '../../versions/version.entity';

export class UpdateNoteDto {
  @IsString()
  text: string;

  @IsString()
  versionId: string;

  version: Version;
}
