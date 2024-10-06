import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from './record.controller';
import { Record } from '../../infrastructure/typeORM/entities/record.entity';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { DeleteRecordService } from '../../application/record/deleteRecordService';
import { FindRecordByIdService } from '../../application/record/findRecordByIdService';
import { GetAllRecordsService } from '../../application/record/getAllRecordsService';
import { UpdateRecordService } from '../../application/record/updateRecordService';
import { CreateRecordService } from '../../application/record/createRecordService';
import { TransactionManager } from '../../infrastructure/typeORM/shared/transactionManager';

@Module({
    controllers: [RecordController],
    providers: [
        RecordRepository,
        DeleteRecordService,
        GetAllRecordsService,
        UpdateRecordService,
        CreateRecordService,
        FindRecordByIdService,
        {
            provide: 'ITransactionManager',
            useClass: TransactionManager,
        },
    ],
    imports: [TypeOrmModule.forFeature([Record])],
    exports: [RecordRepository],
})
export class RecordModule {}
