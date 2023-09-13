import { KeyLike } from "jose";
import { UserJoin, UserLogin } from "./interfaces/user";
import { BASE_URL, encrypt, getDefaultHeader, makeQueryString, makeStringErrorByResponse } from "./utils/common";
import { CategoriesCreate, SettingCreate, SettingGetList, SettingUpdate, SettingUpdateList, SettingsDelete } from "./interfaces/setting";

export const getSettingList = async (queryStringObj: SettingGetList, token: string) => {
    let res: any = null
    try{
        const queryString = makeQueryString<SettingGetList>(queryStringObj);
        const response = await fetch(`${BASE_URL}/setting/list?${queryString}`,{
            method: "GET",
            headers:  getDefaultHeader(token)
        });
        res = await response.json();
        if(res.result === "fail"){
            const errorStr = makeStringErrorByResponse(res)
            throw new Error(errorStr)
        }
    } catch(e){
        throw e
    }
    
    return res
};

export const getCategories = async () => {
    const response = await fetch(`${BASE_URL}/setting/categories`, {
        method: "GET",
        headers:  getDefaultHeader()
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
}


export const putSetting = async (obj: SettingUpdate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting`, {
        method: "PUT",
        body: await encrypt(obj, key),
        headers: getDefaultHeader(token)
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const putSettingList = async (obj: SettingUpdateList, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting/list`, {
        method: "PUT",
        body: await encrypt(obj, key),
        headers: getDefaultHeader(token)
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const addCategories = async (obj: CategoriesCreate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting/addCategories`, {
        method: "POST",
        body: await encrypt(obj, key),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const addSetting = async (obj: SettingCreate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting/`, {
        method: "POST",
        body: await encrypt(obj, key),
        headers: getDefaultHeader(token)
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
};

export const deleteSettings = async (obj: SettingsDelete, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/setting/`, {
        method: "DELETE",
        body: await encrypt(obj, key),
        headers: getDefaultHeader(token)
    });
    const res = await response.json();
    if(res.result === "fail"){
        const errorStr = makeStringErrorByResponse(res)
        throw new Error(errorStr)
    }
    return res
}

