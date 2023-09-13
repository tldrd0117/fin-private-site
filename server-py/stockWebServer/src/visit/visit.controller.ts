import {
    Body,
    Controller,
    Get,
    Ip,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import responseUtils from 'common/utils/responseUtils';
import { AuthGuard } from 'common/auth.guard';
import { EncPipe } from 'common/enc.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { VisitService } from './visit.service';
import { GetPopularVisit, Visit } from './dto/visit.dto';

@Controller('visit')
export class VisitController {
    constructor(private readonly visitService: VisitService) {}
    @Get('/')
    async getVisit(@Query() query: Visit) {
        const result = await this.visitService.getVisit(query);
        return responseUtils.makeSuccessBody({ list: result });
    }

    @Get('/popular')
    async getPopularVisit(@Query() query: GetPopularVisit) {
        const result = await this.visitService.getPopularVisit(query);
        return responseUtils.makeSuccessBody({ list: result });
    }

    @Post('/')
    async postVisit(@Body(EncPipe) visit: Visit, @Ip() ip: string) {
        const result = await this.visitService.addVisit(
            ip,
            visit.target,
            visit.type,
        );
        return responseUtils.makeSuccessBody(result);
    }
}
