import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { getCategories } from "@/data/api/setting"

export const prefetchCategories = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.SETTING.CATEGORIES], async () => {
        return await getCategories()
    })
}