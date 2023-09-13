import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './websocket/events/events.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/allException.filter';
import { SettingModule } from './setting/setting.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { VisitModule } from 'visit/visit.module';
import { KrxStockModule } from 'stock/krxStock/KrxStock.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DATABASE_PATH, {
            connectionName: 'log-site',
            dbName: 'log-site-dev',
        }),
        MongooseModule.forRoot(process.env.STOCK_DATABASE_PATH, {
            connectionName: 'stock',
            dbName: 'stock',
        }),
        EventsModule,
        AuthModule,
        CategoryModule,
        PostModule,
        SettingModule,
        UserModule,
        VisitModule,
        KrxStockModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'assets', 'dist'),
            serveStaticOptions: {
                index: false,
            },
            exclude: ['/*/*'],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
