import { IsBoolean, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsBoolean()
  isOpen: boolean;

  @IsString()
  artistId: string;
}
