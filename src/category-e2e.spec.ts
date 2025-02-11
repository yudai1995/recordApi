import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './app.module';
import { CreateCategoryCommand } from './application/category/createCategoryService';
import { CategoryDto } from './presentation/dto/category/categoryDto';

describe('CategoryController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: '.env.test',
                }),
                MongooseModule.forRoot(process.env.MONGODB_URI),
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    // const createCategory = async (createCategoryCommand: CreateCategoryCommand): Promise<CategoryDto> => {
    //     const res = await request(app.getHttpServer())
    //         .post('/category')
    //         .set('Accept', 'application/json')
    //         .send(createCategoryCommand);
    //     expect(res.status).toEqual(201);
    //     return res.body.category;
    // };

    const getAllRecords = async (): Promise<Array<CategoryDto>> => {
        const res = await request(app.getHttpServer()).get('/category');
        expect(res.status).toEqual(200);
        return res.body.categories as Array<CategoryDto>;
    };

    describe('Category CRUD operations', () => {
        it('should create a new category', async () => {
            const createCategoryCommand: CreateCategoryCommand = {
                categoryName: 'Test Category1',
            };
            const res = await request(app.getHttpServer())
                .post('/category')
                .set('Accept', 'application/json')
                .send(createCategoryCommand);
            expect(res.status).toEqual(201);
        });

        it('should get all categories', async () => {
            const res = await request(app.getHttpServer()).get('/category').set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.categories.length).toBeGreaterThan(0);
        });

        it('should get a category by id', async () => {
            const categories = await getAllRecords();
            const res = await request(app.getHttpServer())
                .get(`/category/${categories[0].categoryId}`)
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            expect(res.body.category.categoryName).toEqual(categories[0].categoryName);
        });

        it('should update a category', async () => {
            const categories = await getAllRecords();
            const updateCategoryCommand = {
                categoryName: 'Updated Category',
            };
            const res = await request(app.getHttpServer())
                .patch(`/category/${categories[0].categoryId}`)
                .set('Accept', 'application/json')
                .send(updateCategoryCommand);
            expect(res.status).toEqual(200);
            const updatedCategory = await request(app.getHttpServer())
                .get(`/category/${categories[0].categoryId}`)
                .set('Accept', 'application/json');
            expect(updatedCategory.body.category.categoryName).toEqual(updateCategoryCommand.categoryName);
        });

        it('should delete a category', async () => {
            const categories = await getAllRecords();
            const res = await request(app.getHttpServer()).delete(`/record/${categories[0].categoryId}`);
            expect(res.status).toEqual(200);
        });
    });
});
