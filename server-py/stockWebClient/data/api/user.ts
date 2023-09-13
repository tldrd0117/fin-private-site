import { KeyLike } from "jose";
import { UserJoin, UserLogin } from "./interfaces/user";
import { BASE_URL, encrypt, getDefaultHeader, makeStringErrorByResponse } from "./utils/common";

export const registerUser = async (obj: UserJoin, key: KeyLike) => {
    const response = await fetch(`${BASE_URL}/user/join`, {
        method: "POST",
        body: await encrypt(obj, key),
        headers: getDefaultHeader()
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const loginUser = async (obj: UserLogin, key: KeyLike) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        body: await encrypt(obj, key),
        headers: getDefaultHeader()
    });
    const res = await response.json()
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res;
};