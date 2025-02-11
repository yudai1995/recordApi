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

import { CreateCategoryCommand, CreateCategoryService } from '../../application/category/createCategoryService';
import { DeleteCategoryService } from '../../application/category/deleteCategoryService';
import { FindCategoryByIdService } from '../../application/category/findCategoryByIdService';
import { GetAllCategorysService } from '../../application/category/getAllCategoryiesService';
import { UpdateCategoryCommand, UpdateCategoryService } from '../../application/category/updateCategoryService';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { MongooseExceptionFilter } from '../../mongoose.exception.filter';
import { CategoryDto } from '../dto/category/categoryDto';
import { Status } from '../dto/shared/status';

@Controller('category')
// 関数全てに適用したいので class 定義の上で @UseFilters デコレータを用いて
// コントローラーの関数全てに MongooseExceptionFilter を適用する
@UseFilters(MongooseExceptionFilter)
export class CategoryController {
    constructor(
        @Inject(CreateCategoryService) private readonly createCategoryService: CreateCategoryService,
        @Inject(GetAllCategorysService) private readonly getAllCategorysService: GetAllCategorysService,
        @Inject(FindCategoryByIdService) private readonly findCategoryByIdService: FindCategoryByIdService,
        @Inject(UpdateCategoryService) private readonly updateCategoryService: UpdateCategoryService,
        @Inject(DeleteCategoryService) private readonly deleteCategoryService: DeleteCategoryService,
    ) {}

    @Post()
    async create(@Body() createCategoryCommand: CreateCategoryCommand): Promise<Status> {
        {
            try {
                await this.createCategoryService.execute(createCategoryCommand);
                return { statusCode: 200 };
            } catch (error) {
                throw new InternalServerErrorException(`カテゴリの作成に失敗しました: ${error.message}`);
            }
        }
    }

    @Get()
    async findAll(): Promise<Status & { categories: CategoryDto[] }> {
        try {
            const result = await this.getAllCategorysService.execute();
            return { statusCode: 200, categories: result };
        } catch (error) {
            throw new InternalServerErrorException(`カテゴリの取得に失敗しました: ${error.message}`);
        }
    }

    @Get(':id')
    async findOne(@Param('id') categoryId: string): Promise<Status & { category?: CategoryDto }> {
        try {
            const result = await this.findCategoryByIdService.execute(new CategoryId(categoryId));
            return { statusCode: 200, category: result };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { statusCode: 404, message: 'カテゴリが見つかりません' };
            }
            throw new InternalServerErrorException(`カテゴリの取得に失敗しました: ${error.message}`);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') categoryId: string,
        @Body() updateCategoryCommand: UpdateCategoryCommand,
    ): Promise<Status> {
        try {
            await this.updateCategoryService.execute(categoryId, updateCategoryCommand);
            return { statusCode: 200 };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { statusCode: 404, message: 'カテゴリが見つかりません' };
            }
            throw new InternalServerErrorException(`カテゴリの更新に失敗しました: ${error.message}`);
        }
    }

    @Delete(':id')
    async remove(@Param('id') categoryId: string) {
        return await this.deleteCategoryService.execute(new CategoryId(categoryId));
    }
}
