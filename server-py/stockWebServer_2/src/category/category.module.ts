import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthService } from 'auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import categorySchema from './schemas/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: 'Category', schema: categorySchema }],
            'log-site',
        ),
    ],
    controllers: [CategoryController],
    providers: [AuthService, CategoryService],
})
export class CategoryModule {}
