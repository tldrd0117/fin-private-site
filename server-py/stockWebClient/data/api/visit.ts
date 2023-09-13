import { KeyLike } from "jose";
import { UserJoin, UserLogin } from "./interfaces/user";
import { BASE_URL, encrypt, getDefaultHeader, makeStringErrorByResponse } from "./utils/common";
import { Visit, VisitType } from "./interfaces/visit";

export const addVisit = async (obj: Visit, key: KeyLike) => {
    const response = await fetch(`${BASE_URL}/visit/`, {
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

export const getVisit = async (target: string, type: VisitType) => {
    const response = await fetch(`${BASE_URL}/visit/?target=${target}&type=${type}`, {
        method: "GET",
        headers: getDefaultHeader()
    });
    const res = await response.json()
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        console.error(errorStr)
        throw new Error(errorStr)
    }
    return res;
};

export const getPopularVisit = async (limit: number, type: VisitType) => {
    const response = await fetch(`${BASE_URL}/visit/popular/?limit=${limit}&type=${type}`, {
        method: "GET",
        headers: getDefaultHeader()
    });
    const res = await response.json()
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        console.error(errorStr)
        throw new Error(errorStr)
    }
    return res;
};