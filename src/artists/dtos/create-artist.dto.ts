import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  image_url: string;
}
