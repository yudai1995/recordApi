import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
  ) {}

  async create({
    category,
    title,
    recordDate,
  }: CreateRecordDto): Promise<Record> {
    return await this.recordRepository
      .save({
        category: category,
        title: title,
        recordDate: recordDate,
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          `[${e.message}]：ユーザーの登録に失敗しました。`,
        );
      });
  }

  async findAll(): Promise<Record[]> {
    return await this.recordRepository
      .find({
        order: {
          recordDate: 'DESC',
        },
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          `[${e.message}]：ユーザーの取得に失敗しました。`,
        );
      });
  }

  async findOne(id: number): Promise<Record> {
    return await this.recordRepository
      .findOne({
        where: { id: id },
      })
      .then((res) => {
        if (!res) {
          throw new NotFoundException();
        }
        return res;
      });
  }

  async update(id: number, createRecordDto: UpdateRecordDto): Promise<Record> {
    const record = await this.recordRepository.findOne({ where: { id: id } });
    if (!record) {
      throw new NotFoundException();
    }

    record.category = createRecordDto.category;
    record.title = createRecordDto.title;
    record.recordDate = createRecordDto.recordDate;
    return await this.recordRepository.save(record);
  }

  async remove(id: number): Promise<DeleteResult> {
    const record = await this.recordRepository.findOne({ where: { id: id } });
    if (!record) {
      throw new NotFoundException();
    }
    return await this.recordRepository.delete(record.id);
  }
}
