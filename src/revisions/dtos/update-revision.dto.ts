import { IsString } from 'class-validator';

export class UpdateRevisionDto {
  @IsString()
  text: string;
}
