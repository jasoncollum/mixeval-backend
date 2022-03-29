import { Type } from 'class-transformer';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class GetArtistsFilterDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasOpenSongs: boolean;

  @IsOptional()
  @IsString()
  searchText: string;
}
