import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IKrxMarcap } from './interface/krxMarcap.interface';
import { ICount } from './interface/count.interface';
import { parse, formatISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { KrxMarcapFindOptions } from './dto/krxMarcap.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class KrxMarcapService {
    constructor(
        @InjectModel('KrxMarcap', 'stock')
        private readonly krxMarcapModel: Model<IKrxMarcap>,
        @InjectModel('Count', 'stock')
        private readonly countModel: Model<ICount>,
    ) {}

    async getKrxMarcapRange(
        limit: number,
        offset: number,
        startDate: string,
        endDate: string,
        options: KrxMarcapFindOptions = {},
    ) {
        let list: Array<any>, total;
        try {
            // total = await this.countModel.findOne({
            //     _id: 'collectService_krxMarcap',
            // });
            // total = total.count;
            total = await this.krxMarcapModel.countDocuments({
                ...options,
                date: {
                    $gte: parse(startDate, 'yyyyMMdd', new Date()),
                    $lte: parse(endDate, 'yyyyMMdd', new Date()),
                },
            });
            list = await this.krxMarcapModel
                .find({
                    ...options,
                    date: {
                        $gte: parse(startDate, 'yyyyMMdd', new Date()),
                        $lte: parse(endDate, 'yyyyMMdd', new Date()),
                    },
                })
                .limit(limit)
                .skip(offset)
                .sort({ date: -1 })
                .lean()
                .exec();
            return {
                total,
                list,
                pageCount: Math.ceil(total / limit),
                pageIndex: Math.floor(offset / limit),
                pageSize: limit,
            };
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getKrxMarcapList(
        limit: number,
        offset: number,
        date: string,
        options: KrxMarcapFindOptions = {},
    ) {
        let list: Array<any>, total;
        const utcTime = zonedTimeToUtc(
            parse(date, 'yyyyMMdd', new Date()),
            'utc',
        );
        try {
            const findOptions = {
                ...options,
                date: utcTime,
            };
            total = await this.krxMarcapModel.countDocuments(findOptions);
            list = await this.krxMarcapModel
                .find(findOptions)
                .limit(limit)
                .skip(offset)
                .sort({ date: -1 })
                .lean()
                .exec();
            console.log(list.length, options, utcTime, options, findOptions);
            return {
                total,
                list,
                pageCount: Math.ceil(total / limit),
                pageIndex: Math.floor(offset / limit),
                pageSize: limit,
            };
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}
