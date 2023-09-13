import { PaginationState } from "@tanstack/react-table"
import QUERY_KEYS, { useEncPubicKey, useToken } from "../auth/query"
import { tokenState } from "@/data/recoil/states/user"
import { useRecoilState } from "recoil"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createCategory, deleteCategory, getCategoryList, updateCategory } from "@/data/api/category"
import { CategoryCreate, CategoryDelete, CategoryUpdate } from "@/data/api/interfaces/category"

export const useCategoryList = (fetchDataOptions: PaginationState) => {
    return useQuery({
        queryKey: [QUERY_KEYS.CATEGORY.LIST, fetchDataOptions],
        queryFn: async () => {
            const items = await getCategoryList({ limit: fetchDataOptions.pageSize, 
                offset: fetchDataOptions.pageSize * fetchDataOptions.pageIndex })
            return items
        },
    })
}

export const useCategoryAll = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CATEGORY.LIST, 1000],
        queryFn: async () => {
            const items = await getCategoryList({ limit: 1000, 
                offset: 0 })
            return items
        },
    })
}

export const useCategoryCreateMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const {data: token} = useToken()
    return useMutation({
        mutationFn: async (data: CategoryCreate) => {
            return await createCategory(data, encPublicKey!!, token!!)
        }
    })
}

export const useCategoryUpdateMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const {data: token} = useToken()
    return useMutation({
        mutationFn: async (data: CategoryUpdate) => {
            return await updateCategory(data, encPublicKey!!, token!!)
        }
    })
}

export const useCategoryDeleteMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const {data: token} = useToken()
    return useMutation({
        mutationFn: async (data: CategoryDelete) => {
            return await deleteCategory(data, encPublicKey!!, token!!)
        }
    })
}