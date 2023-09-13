import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISetting } from './interface/setting.interface';
import { ISettingType } from '../settingType/interface/settingType.interface';
import { DecodedUserInfo } from 'auth/dto/auth.dto';
import { IRole } from 'role/interface/role.interface';
import { SettingCreate, SettingUpdate } from './dto/setting.dto';
import { UserService } from 'user/user.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SettingService {
    constructor(
        @InjectModel('Setting', 'log-site')
        private readonly settingModel: Model<ISetting>,
        @InjectModel('SettingType', 'log-site')
        private readonly settingTypeModel: Model<ISettingType>,
        @InjectModel('Role', 'log-site')
        private readonly roleModel: Model<IRole>,
        private readonly userService: UserService,
    ) {}

    async getSettingList(
        userInfo: DecodedUserInfo,
        limit: number,
        offset: number,
    ) {
        const roleTypes = await this.roleModel.find();
        const role = roleTypes.find(
            (type) => type._id.toString() === userInfo.role,
        );
        let list: Array<any>, total;
        try {
            if (role.name === 'admin') {
                total = await this.settingModel.countDocuments();
                list = await this.settingModel
                    .find()
                    .limit(limit)
                    .skip(offset)
                    .sort({ updateAt: -1 })
                    .populate('type')
                    .populate('role')
                    .populate({
                        path: 'userId',
                        select: 'name',
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
            } else if (role.name === 'user') {
                total = await this.settingModel.countDocuments({
                    userId: userInfo._id,
                });
                list = await this.settingModel
                    .find({ userId: userInfo._id })
                    .limit(limit)
                    .skip(offset)
                    .sort({ updateAt: -1 })
                    .populate('type')
                    .populate('role')
                    .populate({
                        path: 'userId',
                        select: 'name',
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
            } else if (role.name === 'guest') {
                total = await this.settingModel.countDocuments({
                    role: role._id,
                });
                list = await this.settingModel
                    .find({ role: role._id })
                    .limit(limit)
                    .skip(offset)
                    .sort({ updateAt: -1 })
                    .populate('type')
                    .populate('role')
                    .populate({
                        path: 'userId',
                        select: 'name',
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
            } else {
                total = 0;
                list = [];
                return {
                    total,
                    list,
                    pageCount: Math.ceil(total / limit),
                    pageIndex: Math.floor(offset / limit),
                    pageSize: limit,
                };
            }
        } catch (e) {
            throw new BadRequestException('setting.notFound', {
                cause: new Error(),
                description: 'setting.notFound',
            });
        }
    }

    async getCategories() {
        return await this.settingModel
            .find({ name: 'category' }, '_id name value')
            .lean()
            .exec();
    }

    async addSettings(settings: Array<SettingCreate>) {
        const userId = settings[0].userId.toString();
        if (!settings.every((v) => v.userId.toString() === userId)) {
            throw new BadRequestException('user.diff', {
                cause: new Error(),
                description: 'user.diff',
            });
        }
        if (await this.userService.checkExistUserById(userId.toString())) {
            const created = await this.settingModel.create(settings);
            return created;
        } else {
            throw new BadRequestException('user.notFound', {
                cause: new Error(),
                description: 'user.notFound',
            });
        }
    }

    async putSetting(setting: SettingUpdate) {
        if (
            setting.userId &&
            (await this.userService.checkExistUserById(
                setting.userId.toString(),
            ))
        ) {
            return await this.settingModel.updateOne(
                { _id: setting._id },
                { $set: setting },
            );
        } else if (!setting.userId) {
            setting.userId = undefined;
            return await this.settingModel.updateOne(
                { _id: setting._id },
                { $set: setting },
            );
        } else {
            throw new BadRequestException('user.notFound', {
                cause: new Error(),
                description: 'user.notFound',
            });
        }
    }

    async putSettingList(settingList: Array<SettingUpdate>) {
        for (let i = 0; i < settingList.length; ++i) {
            await this.putSetting(settingList[i]);
        }
    }

    async deleteSetting(ids: Array<string>) {
        return await this.settingModel.deleteMany({ _id: { $in: ids } });
    }

    async getSettingTypes() {
        return await this.settingTypeModel.find();
    }
}
