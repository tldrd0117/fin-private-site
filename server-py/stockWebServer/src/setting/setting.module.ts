import { Module } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { UserService } from 'user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from 'user/schemas/user.schema';
import roleSchema from 'role/schemas/role.schema';
import settingSchema from './schemas/setting.schema';
import settingTypeSchema from 'settingType/schemas/settingType.schema';

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
    controllers: [SettingController],
    providers: [AuthService, SettingService, UserService],
})
export class SettingModule {}
