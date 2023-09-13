import { selector } from "recoil";
import { roleTypeMapState, tokenState, userInfoState } from "../states/user";
import { BasicTypes } from "@/data/api/interfaces/common";

export const isLoginSelector = selector({
    key: "isLogged",
    get: ({ get }) => {
        const userInfo = get(userInfoState);
        const roleType = get(roleTypeMapState)
        if(!userInfo || !roleType) return false;
        console.log(userInfo, roleType)
        
        return (userInfo?.role === roleType.name["admin"] || userInfo?.role === roleType.name["user"]);
    }
});
