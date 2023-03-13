import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Artist } from 'src/artists/artist.entity';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  artistId: string;

  artist: Artist;

  @IsBoolean()
  @IsOptional()
  isOpen: boolean;
}
