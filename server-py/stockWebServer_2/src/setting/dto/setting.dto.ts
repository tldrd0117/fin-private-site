import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class SettingUpdate {
    @ApiProperty()
    _id: Types.ObjectId;
    @ApiPropertyOptional()
    type?: Types.ObjectId;
    @ApiPropertyOptional()
    role?: Types.ObjectId;
    @ApiPropertyOptional()
    userId?: Types.ObjectId;
    @ApiPropertyOptional()
    name?: string;
    @ApiPropertyOptional()
    value?: string;
    @ApiPropertyOptional()
    createAt?: Date;
    @ApiPropertyOptional()
    updateAt?: Date;
}

export class SettingUpdateList {
    @ApiProperty()
    list: Array<SettingUpdate>;
}

export class SettingCreate {
    @ApiProperty()
    type: string;
    @ApiPropertyOptional()
    role?: string;
    @ApiPropertyOptional()
    userId?: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    value: string;
}

export class SettingsDelete {
    @ApiProperty()
    ids: Array<string>;
}

export class SettingGetList {
    @ApiProperty()
    limit: number;
    @ApiProperty()
    offset: number;
}
