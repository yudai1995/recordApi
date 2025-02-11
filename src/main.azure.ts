import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);

    // CORSの設定
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.setGlobalPrefix('api');

    await app.init();
    return app;
}
