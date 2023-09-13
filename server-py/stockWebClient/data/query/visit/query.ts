import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import QUERY_KEYS, { useEncPubicKey } from "../auth/query"
import { addVisit, getPopularVisit, getVisit } from "@/data/api/visit"
import { format, parseISO } from "date-fns"
import { Visit, VisitType } from "@/data/api/interfaces/visit"


export const useVisit = (target: string, type: VisitType) => {
    return useQuery({
        queryKey: [QUERY_KEYS.VISIT.LIST, target, type],
        queryFn: async () => {
            const items = await getVisit(target, type)
            return items?.list?.map((item: any) => {
                if(!item.createAt) item.createAt = new Date().toISOString()
                return {
                    day:  format(parseISO(item.createAt), "yyyy-MM-dd"),
                    value: item.count
                }
            }) || []
        },
        cacheTime: 1000 * 12 * 60,
        staleTime: 1000 * 12 * 60,
    })
}

export const usePopularVisit = (limit: number, type: VisitType) => {
    return useQuery({
        queryKey: [QUERY_KEYS.VISIT.POPULAR_LIST, type, limit],
        queryFn: async () => {
            const items = await getPopularVisit(limit, type)
            return items?.list
        },
        cacheTime: 1000 * 60,
        staleTime: 1000 * 60,
    })
}

export const useVisitMutation = () => {
    const queryClient = useQueryClient()
    const {data: encPublicKey, isSuccess} = useEncPubicKey()
    return useMutation({
        mutationFn: async ({target, type}: Visit) => {
            if(!encPublicKey) throw new Error("public Key not exist!")
            console.log(encPublicKey)
            const res = await addVisit({ target, type }, encPublicKey!!)
            if(res.modifiedCount > 0 || res.upsertedCount > 0){
                queryClient.invalidateQueries([QUERY_KEYS.VISIT.LIST, target])
            }
            return res
        },
        
    })  
}