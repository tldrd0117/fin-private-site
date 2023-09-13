import { Module } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UserService } from 'user/user.service';
import { UserController } from './user.controller';
import { SettingService } from 'setting/setting.service';
import settingTypeSchema from 'settingType/schemas/settingType.schema';
import settingSchema from 'setting/schemas/setting.schema';
import roleSchema from 'role/schemas/role.schema';
import userSchema from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: 'User', schema: userSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'Role', schema: roleSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'Setting', schema: settingSchema }],
            'log-site',
        ),
        MongooseModule.forFeature(
            [{ name: 'SettingType', schema: settingTypeSchema }],
            'log-site',
        ),
    ],
    controllers: [UserController],
    providers: [AuthService, UserService, SettingService],
})
export class UserModule {}
