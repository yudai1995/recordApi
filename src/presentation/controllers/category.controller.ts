import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CategoryDto } from '../dto/category/categoryDto';
import { CreateCategoryCommand, CreateCategoryService } from '../../application/category/createCategoryService';
import { DeleteCategoryService } from '../../application/category/deleteCategoryService';
import { FindCategoryByIdService } from '../../application/category/findCategoryByIdService';
import { GetAllCategorysService } from '../../application/category/getAllCategoryiesService';
import { UpdateCategoryCommand, UpdateCategoryService } from '../../application/category/updateCategoryService';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';

@Controller('category')
export class CategoryController {
    constructor(
        @Inject(CreateCategoryService) private readonly createCategoryService: CreateCategoryService,
        @Inject(GetAllCategorysService) private readonly getAllCategorysService: GetAllCategorysService,
        @Inject(FindCategoryByIdService) private readonly findCategoryByIdService: FindCategoryByIdService,
        @Inject(UpdateCategoryService) private readonly updateCategoryService: UpdateCategoryService,
        @Inject(DeleteCategoryService) private readonly deleteCategoryService: DeleteCategoryService,
    ) {}

    @Post()
    async create(@Body() createCategoryCommand: CreateCategoryCommand) {
        return await this.createCategoryService.execute(createCategoryCommand);
    }

    @Get()
    async findAll(): Promise<CategoryDto[]> {
        return await this.getAllCategorysService.execute();
    }

    @Get(':id')
    async findOne(@Param('id') categoryId: string) {
        return await this.findCategoryByIdService.execute(new CategoryId(categoryId));
    }

    @Patch(':id')
    async update(@Param('id') categoryId: string, @Body() updateCategoryCommand: UpdateCategoryCommand) {
        return await this.updateCategoryService.execute(categoryId, updateCategoryCommand);
    }

    @Delete(':id')
    async remove(@Param('id') categoryId: string) {
        return await this.deleteCategoryService.execute(new CategoryId(categoryId));
    }
}
