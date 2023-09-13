import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ITag } from './interface/tags.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagsService {
    constructor(
        @InjectModel('Tag', 'log-site') private readonly tagsModel: Model<ITag>,
    ) {}

    async findOrCreateIfNotExist(name: string) {
        return await this.tagsModel
            .findOneAndUpdate(
                { name },
                { name },
                { upsert: true, new: true, setDefaultsOnInsert: true },
            )
            .lean();
    }
}
