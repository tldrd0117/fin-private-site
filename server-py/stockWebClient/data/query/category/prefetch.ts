import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { getCategoryList } from "@/data/api/category"

export const prefetchCategoryList = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.CATEGORY.LIST, 1000], async () => {
        const items = await getCategoryList({ limit: 1000, 
            offset: 0 })
        return items
    })
}