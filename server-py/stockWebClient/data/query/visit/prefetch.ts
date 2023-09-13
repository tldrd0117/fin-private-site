import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { getCategories } from "@/data/api/setting"
import { getPopularVisit, getVisit } from "@/data/api/visit"
import { format, parseISO } from "date-fns"
import { VisitType } from "@/data/api/interfaces/visit"

export const prefetchVisit = (target: string, type: VisitType) => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.VISIT.LIST, target, type], async () => {
        const items = await getVisit(target, type)
        return items?.list?.map((item: any) => {
            return {
                day:  format(parseISO(item.createAt), "yyyy-MM-dd"),
                value: item.count
            }
        }) || []
            
    })
}

export const prefetchPopularVisit = (limit: number, type: VisitType) => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.VISIT.POPULAR_LIST, type, limit], async () => {
        const items = await getPopularVisit(limit, type)
        return items?.list
    })
}