import { ApiProperty } from '@nestjs/swagger';

export class CategoryGetList {
    @ApiProperty()
    limit: number;
    @ApiProperty()
    offset: number;
}

export class CategoryCreate {
    @ApiProperty()
    name: string;
}

export class CategoryUpdate {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    name: string;
}

export class CategoryDelete {
    @ApiProperty()
    _id: string;
}
