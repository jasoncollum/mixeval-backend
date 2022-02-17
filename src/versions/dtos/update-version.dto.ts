import { IsNumber } from 'class-validator';

export class UpdateVersionDto {
  @IsNumber()
  number: number;
}
