import { Test, TestingModule } from '@nestjs/testing';
import { RecordService } from './record.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { RecordController } from './record.controller';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';

describe('RecordService', () => {
  let service: RecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordController],
      providers: [
        RecordService,
        {
          provide: getRepositoryToken(Record),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RecordService>(RecordService);
  });

  describe('記録の追加', () => {
    it('成功', () => {
      const dto: CreateRecordDto = {
        category: 0,
        title: '散歩',
        recordDate: '2020-01-01',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateRecordDto) => {
          const record: Record = {
            id: 1,
            ...dto,
          };
          return record;
        });

      expect(service.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });

  describe('記録の一括取得', () => {
    it('成功', () => {
      const record: Record = {
        id: 1,
        category: 0,
        title: '散歩',
        recordDate: '2020-01-01',
      };

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [record];
      });

      expect(service.findAll()).resolves.toEqual([record]);
    });

    it('データが空', () => {
      const record: Record[] = [];

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return record;
      });

      expect(service.findAll()).resolves.toEqual(record);
    });
  });

  describe('記録の取得', () => {
    it('成功', () => {
      const record: Record = {
        id: 1,
        category: 0,
        title: '散歩',
        recordDate: '2020-01-01',
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return record;
      });

      expect(service.findOne(1)).resolves.toEqual(record);
    });

    it('失敗', () => {
      jest.spyOn(service, 'findOne').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.findOne(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('記録の更新', () => {
    it('成功', () => {
      const dto: CreateRecordDto = {
        category: 1,
        title: 'ランニング',
        recordDate: '2020-12-31',
      };

      const record: Record = {
        id: 1,
        category: 1,
        title: 'ランニング',
        recordDate: '2020-12-31',
      };

      jest.spyOn(service, 'update').mockImplementation(async () => {
        return record;
      });

      expect(service.update(1, dto)).resolves.toEqual(record);
    });

    it('失敗', () => {
      jest.spyOn(service, 'update').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      const dto: CreateRecordDto = {
        category: 1,
        title: 'ランニング',
        recordDate: '2020-12-31',
      };

      expect(service.update(2, dto)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('削除', () => {
    it('成功', () => {
      const result: DeleteResult = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(service, 'remove').mockImplementation(async () => {
        return result;
      });

      expect(service.remove(1)).resolves.toEqual(result);
    });

    it('失敗', () => {
      jest.spyOn(service, 'remove').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.remove(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
