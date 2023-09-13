import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class KrxMarcapFindOptions {
    @ApiPropertyOptional()
    시가?: number;
    @ApiPropertyOptional()
    종가?: number;
    @ApiPropertyOptional()
    시가총액?: number;
    @ApiPropertyOptional()
    종목코드?: string;
    @ApiPropertyOptional()
    종목명?: string;
}

export class KrxMarcapGetList extends KrxMarcapFindOptions {
    @ApiProperty()
    limit: number;
    @ApiProperty()
    offset: number;
    @ApiProperty()
    date: string;
}

export class KrxMarcapGetRange extends KrxMarcapFindOptions {
    @ApiProperty()
    limit: number;
    @ApiProperty()
    offset: number;
    @ApiProperty()
    startDate: string;
    @ApiProperty()
    endDate: string;
}
