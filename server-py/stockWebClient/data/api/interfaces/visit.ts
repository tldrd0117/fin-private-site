export interface Visit{
    target: string;
    type: VisitType;
}


export const visitTypes = ['blog', 'Tag', 'Post', 'Category'] as const;
export type VisitType = typeof visitTypes[number];