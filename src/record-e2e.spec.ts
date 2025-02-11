import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { Record } from '../src/infrastructure/typeORM/schema/record.schema';
import { RecordModule } from '../src/presentation/controllers/record.module';

describe('RecordController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: '.env.test',
                }),
                MongooseModule.forRoot(process.env.MONGODB_URI),
                RecordModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    const getAllRecords = async (): Promise<Array<Record>> => {
        const res = await request(app.getHttpServer()).get('/record');
        expect(res.status).toEqual(200);
        return res.body.records as Array<Record>;
    };

    describe('Create API of Record', () => {
        it('OK /record (POST)', async () => {
            const body = {
                title: 'test-record',
                categoryId: 1,
                recordDate: new Date(),
            };
            const res = await request(app.getHttpServer()).post('/record').set('Accept', 'application/json').send(body);
            expect(res.status).toEqual(201);

            const recordResponse = res.body.record as Record;
            expect(recordResponse).toHaveProperty('categoryId');
            expect(recordResponse.title).toEqual(body.title);
        });

        it('NG /record (POST): Incorrect parameters', async () => {
            const body = {
                titlee: 'test-record',
            };
            const res = await request(app.getHttpServer()).post('/record').set('Accept', 'application/json').send(body);
            expect(res.status).toEqual(500);
        });

        it('NG /record (POST): Empty parameters', async () => {
            const body = {};
            const res = await request(app.getHttpServer()).post('/record').set('Accept', 'application/json').send(body);
            expect(res.status).toEqual(500);
        });
    });

    describe('Read API of Record', () => {
        it('OK /record (GET)', async () => {
            const recordsResponse = await getAllRecords();
            expect(recordsResponse.length).toBeGreaterThanOrEqual(0);
        });

        it('OK /record/:id (GET)', async () => {
            const recordsResponse = await getAllRecords();
            const res = await request(app.getHttpServer()).get(`/record/${recordsResponse[0].id}`);
            expect(res.status).toEqual(200);

            const recordResponse = res.body.record as Record;
            expect(recordResponse).toHaveProperty('id');
            expect(recordResponse.title).toEqual('test-record');
        });

        it('NG /record/:id (GET): Invalid id', async () => {
            const res = await request(app.getHttpServer()).get('/record/XXXXXXXXXXX');
            expect(res.status).toEqual(500);
        });

        it("NG /record/:id (GET): id that doesn't exist", async () => {
            const res = await request(app.getHttpServer()).get('/record/9999999999999999999999');
            expect(res.status).toEqual(500);
        });
    });

    describe('Update API of Record', () => {
        it('OK /record/:id (PATCH)', async () => {
            const recordsResponse = await getAllRecords();
            const body = {
                title: 'new-test-record',
                recordDate: new Date(),
            };
            const res = await request(app.getHttpServer())
                .patch(`/record/${recordsResponse[0].id}`)
                .set('Accept', 'application/json')
                .send(body);
            expect(res.status).toEqual(200);
        });

        it('NG /record/:id (PATCH): Incorrect parameters', async () => {
            const recordsResponse = await getAllRecords();
            const body = {
                titlee: 'new-test-record',
            };
            const res = await request(app.getHttpServer())
                .patch(`/record/${recordsResponse[0].id}`)
                .set('Accept', 'application/json')
                .send(body);
            expect(res.status).toEqual(500);
        });

        it('NG /record/:id (PATCH): Empty parameters', async () => {
            const recordsResponse = await getAllRecords();
            const body = {};
            const res = await request(app.getHttpServer())
                .patch(`/record/${recordsResponse[0]._id}`)
                .set('Accept', 'application/json')
                .send(body);
            expect(res.status).toEqual(500);
        });

        it('NG /record/:id (PATCH): Invalid id', async () => {
            const body = {
                title: 'new-test-record',
            };
            const res = await request(app.getHttpServer())
                .patch('/record/XXXXXXXXXXX')
                .set('Accept', 'application/json')
                .send(body);
            expect(res.status).toEqual(500);
        });

        it("NG /record/:id (PATCH): id that doesn't exist", async () => {
            const body = {};
            const res = await request(app.getHttpServer())
                .patch('/record/5349b4ddd2781d08c09890f4')
                .set('Accept', 'application/json')
                .send(body);
            expect(res.status).toEqual(500);
        });
    });

    describe('Delete API of Record', () => {
        it('OK /record/:id (DELETE)', async () => {
            const recordsResponse = await getAllRecords();
            const res = await request(app.getHttpServer()).delete(`/record/${recordsResponse[0].id}`);
            expect(res.status).toEqual(200);
        });

        it('NG /record/:id (DELETE): Empty id', async () => {
            const res = await request(app.getHttpServer()).delete('/record');
            expect(res.status).toEqual(404);
        });

        it('NG /record/:id (DELETE): Invalid id', async () => {
            const res = await request(app.getHttpServer()).delete('/record/XXXXXXXXXXX');
            expect(res.status).toEqual(500);
        });

        it("NG /record/:id (DELETE): id that doesn't exist", async () => {
            const res = await request(app.getHttpServer()).delete('/record/9999999999999999999999');
            expect(res.status).toEqual(404);
        });
    });

    afterEach(async () => {
        await app.close();
    });
});
