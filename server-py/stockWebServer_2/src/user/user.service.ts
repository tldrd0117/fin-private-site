/* eslint-disable prefer-const */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IUser } from './interface/user.interface';
import { UserJoin, UserLogin } from './dto/user.dto';
import { th } from 'date-fns/locale';
import { IRole } from 'role/interface/role.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User', 'log-site')
        private readonly userModel: Model<IUser>,
        @InjectModel('Role', 'log-site')
        private readonly roleModel: Model<IRole>,
    ) {}

    async doLogin(user: UserLogin) {
        return await this.userModel.findOne({
            email: user.email,
            password: user.password,
        });
    }

    async doJoin(userJoin: UserJoin) {
        const isPassedName = await this.checkNameDuplicate(userJoin.name);
        const isPassedEmail = await this.checkEmailDuplicate(userJoin.email);
        const errors = [];
        if (!isPassedName) {
            throw new BadRequestException('user.name.duplicated');
        }
        if (!isPassedEmail) {
            throw new BadRequestException('user.email.duplicated');
        }
        return await this.createUser(userJoin);
    }

    async createUser(userJoin: UserJoin) {
        return await this.userModel.create(userJoin);
    }

    async checkEmailDuplicate(email: string) {
        const result = await this.userModel.findOne({ email });
        return !result;
    }

    async checkNameDuplicate(name: string) {
        const result = await this.userModel.findOne({ name });
        return !result;
    }

    async checkExistUserById(userId: string) {
        const result = await this.userModel.findOne({ _id: userId });
        return !!result;
    }
    async searchUserByName(name: string) {
        return this.userModel.find({ name: { $regex: name, $options: 'i' } });
    }

    async getUserByEmail(email: string) {
        return this.userModel.findOne(
            { email },
            { _id: 1, name: 1, email: 1, role: 1, createAt: 1 },
        );
    }
    async getRoleTypes() {
        return await this.roleModel.find();
    }
}
