import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateRecordService } from '../../application/record/createRecordService';
import { DeleteRecordService } from '../../application/record/deleteRecordService';
import { FindRecordByIdService } from '../../application/record/findRecordByIdService';
import { GetAllRecordsService } from '../../application/record/getAllRecordsService';
import { UpdateRecordService } from '../../application/record/updateRecordService';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { Record, RecordSchema } from '../../infrastructure/typeORM/schema/record.schema';

import { CategoryModule } from './category.module';
import { RecordController } from './record.controller';

@Module({
    controllers: [RecordController],
    providers: [
        RecordRepository,
        DeleteRecordService,
        GetAllRecordsService,
        UpdateRecordService,
        CreateRecordService,
        FindRecordByIdService,
    ],
    imports: [
        MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
        forwardRef(() => CategoryModule),
    ],
    exports: [MongooseModule, RecordRepository],
})
export class RecordModule {}
