/* eslint-disable prefer-const */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IPost } from './interface/post.interface';
import { PostCreate, PostUpdate } from './dto/post.dto';
import { UserService } from 'user/user.service';
import { TagsService } from 'tags/tags.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
    constructor(
        @InjectModel('Post', 'log-site')
        private readonly postModel: Model<IPost>,
        private userService: UserService,
        private tagService: TagsService,
    ) {}

    async getPost(postId: string) {
        const post = await this.postModel
            .findOne({ _id: postId })
            .populate({
                path: 'author',
                select: '_id name',
            })
            .populate({
                path: 'tags',
                select: '_id name',
            })
            .populate({
                path: 'category',
                select: '_id name',
            })
            .lean()
            .exec();
        return post;
    }

    async getList(limit: number, offset: number) {
        const total = await this.getPostTotalCount();
        const list = await this.postModel
            .find()
            .limit(limit)
            .skip(offset)
            .sort({ order: -1 })
            .populate({
                path: 'author',
                select: '_id name',
            })
            .populate({
                path: 'tags',
                select: '_id name',
            })
            .populate({
                path: 'category',
                select: '_id name',
            })
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

    async searchList(limit: number, offset: number, word: string) {
        const total = await this.postModel.countDocuments({
            $or: [
                { text: { $regex: word, $options: 'i' } },
                { summary: { $regex: word, $options: 'i' } },
            ],
        });
        const list = await this.postModel
            .find({
                $or: [
                    { text: { $regex: word, $options: 'i' } },
                    { summary: { $regex: word, $options: 'i' } },
                ],
            })
            .limit(limit)
            .skip(offset)
            .sort({ order: 1 })
            .populate({
                path: 'author',
                select: '_id name',
            })
            .populate({
                path: 'tags',
                select: '_id name',
            })
            .populate({
                path: 'category',
                select: '_id name',
            })
            .lean()
            .exec();
        return {
            total,
            list,
        };
    }

    async convertTags(tags: string[]) {
        let ids = [],
            obj: any = {};
        for (let tag of tags) {
            obj = await this.tagService.findOrCreateIfNotExist(tag.toString());
            ids.push(obj._id);
        }
        return ids;
    }

    async post(postCreate: PostCreate) {
        if (
            await this.userService.checkExistUserById(
                postCreate.author.toString(),
            )
        ) {
            if (postCreate.tags) {
                postCreate.tags = await this.convertTags(postCreate.tags);
            }
            const created = await this.postModel.create(postCreate);
            return created;
        } else {
            throw new BadRequestException('user.notFound', {
                cause: new Error(),
                description: 'user.notFound',
            });
        }
    }

    async getPostTotalCount() {
        return await this.postModel.countDocuments();
    }

    async postMany(postCreates: Array<PostCreate>) {
        const author = postCreates[0].author.toString();
        if (!postCreates.every((v) => v.author.toString() === author)) {
            throw new BadRequestException('user.diff', {
                cause: new Error(),
                description: 'user.diff',
            });
        } else if (await this.userService.checkExistUserById(author)) {
            for (let postCreate of postCreates) {
                if (postCreate.tags) {
                    postCreate.tags = await this.convertTags(postCreate.tags);
                }
            }
            const creates = await this.postModel.create(postCreates);
            return creates;
        } else {
            throw new BadRequestException('user.notFound', {
                cause: new Error(),
                description: 'user.notFound',
            });
        }
    }

    async putPost(postUpdate: PostUpdate) {
        if (
            postUpdate.author &&
            (await this.userService.checkExistUserById(
                postUpdate.author.toString(),
            ))
        ) {
            if (postUpdate.tags) {
                postUpdate.tags = await this.convertTags(postUpdate.tags);
            }
            return await this.postModel.updateOne(
                { _id: postUpdate._id },
                { $set: postUpdate },
            );
        } else if (!postUpdate.author) {
            postUpdate.author = undefined;
            postUpdate.authorName = undefined;
            if (postUpdate.tags) {
                postUpdate.tags = await this.convertTags(postUpdate.tags);
            }
            return await this.postModel.updateOne(
                { _id: postUpdate._id },
                { $set: postUpdate },
            );
        } else {
            throw new BadRequestException('user.notFound', {
                cause: new Error(),
                description: 'user.notFound',
            });
        }
    }

    async putPosts(arr: Array<PostUpdate>) {
        for (let i = 0; i < arr.length; ++i) {
            await this.putPost(arr[i]);
        }
    }

    async delPost(postId: string) {
        return await this.postModel.deleteOne({ _id: postId });
    }

    async delPosts(arr: Array<string>) {
        return await this.postModel.deleteMany({ _id: { $in: arr } });
    }
}
