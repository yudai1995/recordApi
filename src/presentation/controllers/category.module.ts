import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateCategoryService } from '../../application/category/createCategoryService';
import { DeleteCategoryService } from '../../application/category/deleteCategoryService';
import { FindCategoryByIdService } from '../../application/category/findCategoryByIdService';
import { GetAllCategorysService } from '../../application/category/getAllCategoryiesService';
import { UpdateCategoryService } from '../../application/category/updateCategoryService';
import { CategoryDuplicationCheckService } from '../../domain/services//categoryDuplicationCheckService';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { Category, CategorySchema } from '../../infrastructure/typeORM/schema/category.schema';
import { CategoryController } from '../../presentation/controllers/category.controller';

import { RecordModule } from './record.module';

@Module({
    controllers: [CategoryController],
    providers: [
        CategoryRepository,
        RecordRepository,
        DeleteCategoryService,
        GetAllCategorysService,
        UpdateCategoryService,
        CreateCategoryService,
        FindCategoryByIdService,
        CategoryDuplicationCheckService,
    ],
    imports: [
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
        forwardRef(() => RecordModule),
    ],
    exports: [CategoryRepository],
})
export class CategoryModule {}

