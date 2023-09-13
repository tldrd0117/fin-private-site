import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICategory } from './interface/category.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category', 'log-site')
        private readonly categoryModel: Model<ICategory>,
    ) {}

    async getCategory(limit: number, offset: number) {
        const total = await this.categoryModel.countDocuments();
        const list = await this.categoryModel
            .find()
            .limit(limit)
            .skip(offset)
            .sort({ order: -1 })
            .lean()
            .exec();
        return {
            total,
            list,
            pageCount: Math.ceil(total / limit),
            pageIndex: Math.floor(offset / limit),
            pageSize: limit,
        };
    }

    async createCategory(name: string) {
        return await this.categoryModel.create({ name });
    }

    async putCategory(id: string, name: string) {
        return await this.categoryModel.updateOne({ _id: id }, { name });
    }

    async deleteCategory(id: string) {
        return await this.categoryModel.deleteOne({ _id: id });
    }
}
