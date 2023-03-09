import { IsNumber, IsString } from 'class-validator';

export class UpdateVersionDto {
  @IsNumber()
  number: number;

  @IsString()
  audioFileName: string;

  @IsString()
  songId: string;
}
