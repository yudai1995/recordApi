import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordDto } from './create-record.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {
  @MaxLength(255)
  @IsNotEmpty()
  title: string;
}
