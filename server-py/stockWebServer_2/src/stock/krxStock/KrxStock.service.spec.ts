import { Test, TestingModule } from '@nestjs/testing';
import { krxMarcapProviders } from './KrxStock.provider';
import { KrxMarcapService } from './KrxStock.service';
import * as dotenv from 'dotenv';
import { parse } from 'date-fns';
dotenv.config();

describe('CatsService unit spec', () => {
    let krxStockService: KrxMarcapService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [KrxMarcapService, ...krxMarcapProviders],
        }).compile();
        krxStockService = module.get<KrxMarcapService>(KrxMarcapService);
    });
    test('get krx marcap list', async () => {
        const result = await krxStockService.getKrxMarcapList(
            100,
            0,
            '20110103',
        );
        // console.log(result);
    }, 1800000);

    // test('get krx marcap range list', async () => {
    //     const result = await krxStockService.getKrxMarcapRange(
    //         4000,
    //         0,
    //         '20110101',
    //         '20120101',
    //     );
    //     console.log(result);
    // }, 1800000);
});
