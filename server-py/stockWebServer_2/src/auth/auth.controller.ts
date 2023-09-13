import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'user/user.service';
import responseUtils from 'common/utils/responseUtils';
import { AuthGuard } from 'common/auth.guard';
import { EncPipe } from 'common/enc.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EmptyBody, EncBody } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Get('/publicKey')
    async getPublicKey() {
        return responseUtils.makeSuccessBody(
            await this.authService.getPublicJWK(),
        );
    }

    @Post('/verify')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async verifyToken(@Body(EncPipe) body: EmptyBody) {
        return responseUtils.makeSuccessBody({});
    }

    @Get('/token')
    async getToken() {
        const types = await this.userService.getRoleTypes();
        const userType = types.find((type) => type.name === 'guest');
        const token = await this.authService.getToken({
            role: userType?._id.toString(),
        });
        return responseUtils.makeSuccessBody({ token });
    }
}
