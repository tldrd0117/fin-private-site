import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { getTypes } from "@/data/api/info"

export const prefetchTypes = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.INFO.TYPE], async () => {
        const list = await getTypes()
        return list
    })
}

