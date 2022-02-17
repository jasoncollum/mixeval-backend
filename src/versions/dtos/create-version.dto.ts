import { IsNumber, IsString } from 'class-validator';

export class CreateVersionDto {
  @IsNumber()
  number: number;

  @IsString()
  songId: string;
}
