import { IsNumber, IsString } from 'class-validator';
import { Song } from '../../songs/song.entity';

export class CreateVersionDto {
  @IsNumber()
  number: number;

  @IsString()
  audioFileName: string;

  @IsString()
  songId: string;

  song: Song;
}
