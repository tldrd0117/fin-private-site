import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import responseUtils from 'common/utils/responseUtils';
import { AuthGuard } from 'common/auth.guard';
import { EncPipe } from 'common/enc.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserJoin, UserLogin } from './dto/user.dto';
import { AuthService } from 'auth/auth.service';
import { SettingService } from 'setting/setting.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly settingService: SettingService,
    ) {}

    @Post('/join')
    async joinUser(@Body(EncPipe) userJoin: UserJoin) {
        const types = await this.userService.getRoleTypes();
        const userType = types.find((type) => type.name === 'user');
        userJoin.role = userType?._id.toString();
        const result = await this.userService.doJoin(userJoin);
        const userInfo = await this.userService.getUserByEmail(result.email);
        const token = await this.authService.getToken(userInfo.toJSON());
        return responseUtils.makeSuccessBody({
            token,
        });
    }

    @Post('/login')
    async loginUser(@Body(EncPipe) userLogin: UserLogin) {
        const result = await this.userService.doLogin(userLogin);
        if (result) {
            const userInfo = await this.userService.getUserByEmail(
                result.email,
            );
            console.log('login', userInfo.toJSON());
            const token = await this.authService.getToken(userInfo.toJSON());
            return responseUtils.makeSuccessBody({
                token,
            });
        } else {
            throw new UnauthorizedException('validate.password');
        }
    }

    @Get('types')
    async getRoleTypes() {
        const settingTypes = await this.settingService.getSettingTypes();
        const roleTypes = await this.userService.getRoleTypes();
        return responseUtils.makeSuccessBody({
            settingTypes: settingTypes,
            roleTypes: roleTypes,
        });
    }
}
