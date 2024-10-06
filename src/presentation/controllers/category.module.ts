import { Module } from '@nestjs/common';
import { CategoryController } from '../../presentation/controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDuplicationCheckService } from '../../domain/services//categoryDuplicationCheckService';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';
import { Category } from '../../infrastructure/typeORM/entities/category.entity';
import { TransactionManager } from '../../infrastructure/typeORM/shared/transactionManager';
import { CreateCategoryService } from '../../application/category/createCategoryService';
import { DeleteCategoryService } from '../../application/category/deleteCategoryService';
import { FindCategoryByIdService } from '../../application/category/findCategoryByIdService';
import { GetAllCategorysService } from '../../application/category/getAllCategoryiesService';
import { UpdateCategoryService } from '../../application/category/updateCategoryService';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';

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
        {
            provide: 'ITransactionManager',
            useClass: TransactionManager,
        },
    ],
    imports: [TypeOrmModule.forFeature([Category])],
    exports: [CategoryRepository],
})
export class CategoryModule {}
