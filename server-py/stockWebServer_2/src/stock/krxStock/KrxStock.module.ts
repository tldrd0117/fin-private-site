import { Module } from '@nestjs/common';
import { KrxMarcapController } from './KrxStock.controller';
import { KrxMarcapService } from './KrxStock.service';
import { MongooseModule } from '@nestjs/mongoose';
import krxMarcapSchema from './schemas/krxMarcap.schema';
import countSchema from './schemas/count.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: 'KrxMarcap',
                    schema: krxMarcapSchema,
                    collection: 'collectService_krxMarcap',
                },
                { name: 'Count', schema: countSchema, collection: 'counts' },
            ],
            'stock',
        ),
    ],
    controllers: [KrxMarcapController],
    providers: [KrxMarcapService],
})
export class KrxStockModule {}
