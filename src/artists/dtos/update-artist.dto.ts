import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  image_url: string;
}
