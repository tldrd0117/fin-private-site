import { getGuestToken, getPublicKey } from "../../api/auth"
import { getEncPublicKey, getLoginInfo } from "../../security/enc"
import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query"
import { JWTPayload, KeyLike } from "jose"
import { useRecoilState } from "recoil"
import { tokenState, userInfoState } from "../../recoil/states/user"
import { useTypes } from "../info/query"

export const useEncPubicKey = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.AUTH.PUBLIC_KEY],
        queryFn: async () => {
            const publicKey = await getPublicKey()
            const enc = await getEncPublicKey(publicKey)
            return enc;
        },
    })
}

export const useToken = () => {
    const [token, setToken] = useRecoilState(tokenState)
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    const {data} = useTypes()
    return useQuery({
        queryKey: [QUERY_KEYS.USER.GUEST_TOKEN],
        queryFn: async () => {
            if(!token){
                const res = await getGuestToken()
                setToken(res.token)
                const userInfo: JWTPayload = getLoginInfo(res.token);
                setUserInfo(userInfo)
                return res.token
            } else {
                return token
            }
        },
        enabled: !!data,
    })
}

export default QUERY_KEYS
