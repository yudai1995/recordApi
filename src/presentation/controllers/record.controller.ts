import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Injectable } from '@nestjs/common';

import { RecordDto } from '../dto/record/recordDto';
import { GetAllRecordsService } from '../../application/record/getAllRecordsService';
import { DeleteRecordService } from '../../application/record/deleteRecordService';
import { FindRecordByIdService } from '../../application/record/findRecordByIdService';
import { UpdateRecordCommand, UpdateRecordService } from '../../application/record/updateRecordService';
import { Id } from '../../domain/model/valueObjects/record/id/id';
import { CreateRecordCommand, CreateRecordService } from '../../application/record/createRecordService';

@Controller('record')
export class RecordController {
    constructor(
        @Inject(CreateRecordService) private readonly createRecordService: CreateRecordService,
        @Inject(GetAllRecordsService) private readonly getAllRecordsService: GetAllRecordsService,
        @Inject(FindRecordByIdService) private readonly findRecordByIdService: FindRecordByIdService,
        @Inject(UpdateRecordService) private readonly updateRecordService: UpdateRecordService,
        @Inject(DeleteRecordService) private readonly deleteRecordService: DeleteRecordService,
    ) {}

    @Post()
    create(@Body() body: CreateRecordCommand): Promise<RecordDto> {
        return this.createRecordService.execute(body);
    }

    @Get()
    async findAll(): Promise<RecordDto[]> {
        return await this.getAllRecordsService.execute();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RecordDto> {
        return this.findRecordByIdService.execute(new Id(id.toString()));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateRecordCommand) {
        return this.updateRecordService.execute(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.deleteRecordService.execute(new Id(id));
    }
}
