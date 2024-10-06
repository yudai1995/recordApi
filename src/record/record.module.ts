import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { Record } from './entities/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RecordController],
  providers: [RecordService],

  imports: [TypeOrmModule.forFeature([Record])],
})
export class RecordModule {}
