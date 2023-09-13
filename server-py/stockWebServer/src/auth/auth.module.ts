import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from 'user/schemas/user.schema';
import roleSchema from 'role/schemas/role.schema';

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
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
})
export class AuthModule {}
