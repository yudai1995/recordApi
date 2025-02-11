import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './presentation/controllers/category.module';
import { RecordModule } from './presentation/controllers/record.module';

@Module({
    imports: [
        ConfigModule.forRoot(),

        // MongooseModule を用いて MongoDB との接続を行う
        MongooseModule.forRoot(process.env.MONGODB_URI),

        RecordModule,
        CategoryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
