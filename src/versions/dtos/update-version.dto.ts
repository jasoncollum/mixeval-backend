import { IsString } from 'class-validator';

export class UpdateVersionDto {
  @IsString()
  audioFileName: string;
}
