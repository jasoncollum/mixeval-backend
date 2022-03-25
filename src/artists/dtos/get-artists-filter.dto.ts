import { Type } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';

export class GetArtistsFilterDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasOpenSongs: boolean;
}
