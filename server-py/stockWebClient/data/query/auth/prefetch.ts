import { getGuestToken, getPublicKey } from "../../api/auth"
import { getEncPublicKey } from "../../security/enc"
import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query"
import { KeyLike } from "jose"
import { useRecoilState } from "recoil"
import { tokenState } from "../../recoil/states/user"


export const prefetchPublicKey = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.AUTH.PUBLIC_KEY], async () => {
        const publicKey = await getPublicKey()
        return await getEncPublicKey(publicKey)
    })
}
