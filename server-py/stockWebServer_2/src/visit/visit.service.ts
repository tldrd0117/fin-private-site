/* eslint-disable prefer-const */
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IVisit } from './interface/visit.interface';
import { GetPopularVisit, GetVisit, VisitType } from './dto/visit.dto';
import { IVisitHistory } from 'visitHistory/interface/visitHistory.interface';
import { add, startOfDay } from 'date-fns';
import { PostService } from 'post/post.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VisitService {
    constructor(
        @InjectModel('Visit', 'log-site')
        private readonly visitModel: Model<IVisit>,
        @InjectModel('VisitHistory', 'log-site')
        private readonly visitHistoryModel: Model<IVisitHistory>,
        private readonly postService: PostService,
    ) {}
    async getVisit(obj: GetVisit) {
        const result = await this.visitModel.find(obj).lean().exec();
        if (result.length === 0) {
            return this.makeEmptyVisit(obj);
        } else {
            return result;
        }
    }

    async getPopularVisit(obj: GetPopularVisit) {
        const { limit, type } = obj;
        if (type === 'Post') {
            return await this.visitModel
                .find({ type })
                .sort({ count: -1 })
                .limit(limit)
                .populate({
                    path: 'target',
                    populate: [
                        {
                            path: 'author',
                            select: '_id name',
                        },
                        {
                            path: 'category',
                            select: '_id name',
                        },
                        {
                            path: 'tags',
                            select: '_id name',
                        },
                    ],
                })
                .lean()
                .exec();
        } else {
            return await this.visitModel
                .find({ type })
                .sort({ count: -1 })
                .limit(limit)
                .populate('target')
                .lean()
                .exec();
        }
    }

    makeEmptyVisit(visit: GetVisit) {
        return [
            {
                ...visit,
                count: 0,
            },
        ];
    }

    async addVisit(ip: string, target: string, type: VisitType) {
        if (type === 'Post') {
            return await this.addPostVisit(ip, target, new Date(), type);
        } else if (type === 'blog') {
            return await this.addVisitByDate(ip, target, new Date(), type);
        }
        return {};
    }

    async validateHistory(
        ip: string,
        target: string,
        date: Date,
        type: VisitType,
    ) {
        const data = await this.visitHistoryModel.find({
            ip,
            target,
            type,
            createAt: {
                $lte: date,
            },
            expiredAt: {
                $gte: date,
            },
        });
        return !data.length;
    }

    async addVisitByDate(
        ip: string,
        target: string,
        date: Date,
        type: VisitType,
    ) {
        const validate = await this.validateHistory(ip, target, date, type);
        if (validate) {
            const tomorrow = add(date, { days: 1 });
            await this.visitHistoryModel.create({
                ip,
                target,
                type,
                createAt: date,
                expiredAt: tomorrow,
            });
            return await this.visitModel.updateOne(
                { target, type, createAt: startOfDay(date) },
                { $inc: { count: 1 } },
                { upsert: true },
            );
        }
        return {};
    }

    async addPostVisit(
        ip: string,
        target: string,
        date: Date,
        type: VisitType,
    ) {
        const post = await this.postService.getPost(target);
        if (post) {
            console.log(post);
            const validate = await this.validateHistory(ip, target, date, type);
            if (validate) {
                const tomorrow = add(date, { days: 1 });
                await this.visitHistoryModel.create({
                    ip,
                    target,
                    type,
                    createAt: date,
                    expiredAt: tomorrow,
                });
                const res = await this.visitModel.updateOne(
                    { target, type: 'Post' },
                    { $inc: { count: 1 } },
                    { upsert: true },
                );
                if (post?.tags?.length) {
                    for (let tag of post.tags) {
                        await this.visitModel.updateOne(
                            {
                                target: tag._id,
                                type: 'Tag',
                                createAt: startOfDay(date),
                            },
                            { $inc: { count: 1 } },
                            { upsert: true },
                        );
                    }
                }
                if (post?.category?._id) {
                    await this.visitModel.updateOne(
                        {
                            target: post.category._id,
                            type: 'Category',
                            createAt: startOfDay(date),
                        },
                        { $inc: { count: 1 } },
                        { upsert: true },
                    );
                }
                return res;
            }
        }
        return {};
    }

    async removeVisit(target: string) {
        return await this.visitModel.deleteOne({ target });
    }
}
