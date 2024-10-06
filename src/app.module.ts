import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { CategoryModule } from './presentation/controllers/category.module';
import { RecordModule } from './presentation/controllers/record.module';

@Module({
    imports: [
        AppModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.name'),
                entities: ['dist/**/entities/**/*.entity.js', __dirname + '/**/*.entity{.ts,.js}'],
            }),
            inject: [ConfigService],
        }),
        RecordModule,
        CategoryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
