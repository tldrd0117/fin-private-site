import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Query,
    Put,
    Delete,
} from '@nestjs/common';
import responseUtils from 'common/utils/responseUtils';
import { AuthGuard } from 'common/auth.guard';
import { EncPipe } from 'common/enc.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SettingService } from './setting.service';
import {
    SettingCreate,
    SettingGetList,
    SettingUpdate,
    SettingsDelete,
} from './dto/setting.dto';
import { AuthService } from 'auth/auth.service';
import { Token } from 'common/token.decorator';

@Controller('setting')
export class SettingController {
    constructor(
        private readonly settingService: SettingService,
        private readonly authService: AuthService,
    ) {}

    @Post('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async createSetting(
        @Body(EncPipe) settingCreate: SettingCreate,
        @Token() token: string,
    ) {
        const userInfo: any = await this.authService.decryptToken(token);
        settingCreate.role = userInfo.role;
        settingCreate.userId = userInfo._id;
        const result = await this.settingService.addSettings([settingCreate]);
        return responseUtils.makeSuccessBody({ list: result });
    }

    @Get('/list')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getSettingList(
        @Query() settingGetList: SettingGetList,
        @Token() token: string,
    ) {
        const userInfo: any = await this.authService.decryptToken(token);
        const result = await this.settingService.getSettingList(
            userInfo,
            settingGetList.limit,
            settingGetList.offset,
        );
        return responseUtils.makeSuccessBody({ ...result });
    }

    @Put('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async putSetting(@Body(EncPipe) settingUpdate: SettingUpdate) {
        const result = await this.settingService.putSetting(settingUpdate);
        return responseUtils.makeSuccessBody({ list: result });
    }

    @Put('/list')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async putSettingList(@Body(EncPipe) settingUpdate: SettingUpdate[]) {
        const result = await this.settingService.putSettingList(settingUpdate);
        return responseUtils.makeSuccessBody({ list: result });
    }

    @Delete('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deleteSetting(@Body(EncPipe) settingDelete: SettingsDelete) {
        const result = await this.settingService.deleteSetting(
            settingDelete.ids,
        );
        return responseUtils.makeSuccessBody({ list: result });
    }
}
