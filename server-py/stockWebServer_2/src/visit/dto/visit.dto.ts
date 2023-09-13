import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Visit {
    @ApiProperty()
    target: string;
    @ApiProperty()
    type: VisitType;
}

export class GetVisit {
    @ApiPropertyOptional()
    target?: string;
    @ApiPropertyOptional()
    type?: VisitType;
}

export class GetPopularVisit {
    @ApiProperty()
    limit: number;
    @ApiProperty()
    type: VisitType;
}

export const visitTypes = ['blog', 'Tag', 'Post', 'Category'] as const;
export type VisitType = (typeof visitTypes)[number];
