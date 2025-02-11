import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseFilters,
} from '@nestjs/common';

import { CreateRecordCommand, CreateRecordService } from '../../application/record/createRecordService';
import { DeleteRecordService } from '../../application/record/deleteRecordService';
import { FindRecordByIdService } from '../../application/record/findRecordByIdService';
import { GetAllRecordsService } from '../../application/record/getAllRecordsService';
import { UpdateRecordCommand, UpdateRecordService } from '../../application/record/updateRecordService';
import { Id } from '../../domain/model/valueObjects/record/id/id';
import { MongooseExceptionFilter } from '../../mongoose.exception.filter';
import { RecordDto } from '../dto/record/recordDto';
import { Status } from '../dto/shared/status';

@Controller('record')
// 関数全てに適用したいので class 定義の上で @UseFilters デコレータを用いて
// コントローラーの関数全てに MongooseExceptionFilter を適用する
@UseFilters(MongooseExceptionFilter)
export class RecordController {
    constructor(
        @Inject(CreateRecordService) private readonly createRecordService: CreateRecordService,
        @Inject(GetAllRecordsService) private readonly getAllRecordsService: GetAllRecordsService,
        @Inject(FindRecordByIdService) private readonly findRecordByIdService: FindRecordByIdService,
        @Inject(UpdateRecordService) private readonly updateRecordService: UpdateRecordService,
        @Inject(DeleteRecordService) private readonly deleteRecordService: DeleteRecordService,
    ) {}

    @Post()
    async create(@Body() body: CreateRecordCommand): Promise<Status & { record: RecordDto }> {
        try {
            const result = await this.createRecordService.execute(body);
            return { statusCode: 200, record: result };
        } catch (error) {
            throw new InternalServerErrorException(`レコードの作成に失敗しました: ${error.message}`);
        }
    }

    @Get()
    async findAll(): Promise<Status & { records: RecordDto[] }> {
        try {
            const records = await this.getAllRecordsService.execute();
            return { statusCode: 200, records };
        } catch (error) {
            throw new InternalServerErrorException(`レコードの取得に失敗しました: ${error.message}`);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Status & { record?: RecordDto }> {
        try {
            const result = await this.findRecordByIdService.execute(new Id(id.toString()));
            return { statusCode: 200, record: result };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { statusCode: 404, message: 'レコードが見つかりません' };
            }
            throw new InternalServerErrorException(`レコードの取得に失敗しました: ${error.message}`);
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: UpdateRecordCommand): Promise<Status> {
        try {
            await this.updateRecordService.execute(id, body);
            return { statusCode: 200 };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { statusCode: 404, message: 'レコードが見つかりません' };
            }
            throw new InternalServerErrorException(`レコードの更新に失敗しました: ${error.message}`);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Status> {
        try {
            await this.deleteRecordService.execute(new Id(id));
            return { statusCode: 200 };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { statusCode: 404, message: 'レコードが見つかりません' };
            }
            throw new InternalServerErrorException(`削除に失敗しました: ${error.message}`);
        }
    }
}
