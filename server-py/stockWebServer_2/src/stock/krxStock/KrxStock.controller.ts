import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import responseUtils from 'common/utils/responseUtils';
import { KrxMarcapService } from './KrxStock.service';
import { KrxMarcapGetList, KrxMarcapGetRange } from './dto/krxMarcap.dto';

@Controller('stock')
export class KrxMarcapController {
    constructor(private readonly krxMarcapService: KrxMarcapService) {}

    @Get('/krxMarcap')
    async getKrxMarcapList(@Query() query: KrxMarcapGetList) {
        const { limit, offset, date, ...options } = query;
        const result = await this.krxMarcapService.getKrxMarcapList(
            Number(limit),
            Number(offset),
            date,
            options,
        );
        return responseUtils.makeSuccessBody(result);
    }

    @Get('/krxMarcap/range')
    async getKrxMarcapRange(@Query() query: KrxMarcapGetRange) {
        const { limit, offset, startDate, endDate, ...options } = query;
        const result = await this.krxMarcapService.getKrxMarcapRange(
            limit,
            offset,
            startDate,
            endDate,
            options,
        );
        return responseUtils.makeSuccessBody(result);
    }
}
