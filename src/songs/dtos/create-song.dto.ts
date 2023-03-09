import { IsBoolean, IsString } from 'class-validator';
import { Artist } from '../../artists/artist.entity';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsBoolean()
  isOpen: boolean;

  @IsString()
  artistId: string;

  artist: Artist;

  @IsString()
  audioFileNameForVersion: string;
}
