import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  category: number;

  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  recordDate: string;
}
