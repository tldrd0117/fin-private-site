import { KeyLike } from "jose";
import { PostCreate, PostDelete, PostGet, PostGetList, PostSearchList, PostUpdate } from "./interfaces/post";
import { BASE_URL, encrypt, getDefaultHeader, makeQueryString } from "./utils/common";
import { CategoryCreate, CategoryDelete, CategoryGetList, CategoryUpdate } from "./interfaces/category";

export const getCategoryList = async (queryStringObj: CategoryGetList) => {
    const queryString = makeQueryString<CategoryGetList>(queryStringObj);
    const response = await fetch(`${BASE_URL}/category/list?${queryString}`);
    return await response.json();
};

export const createCategory = async (requestObj: CategoryCreate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/category/`, {
        method: "POST",
        body: await encrypt(requestObj, key),
        headers: getDefaultHeader(token)
    });
    return await response.json();
};

export const deleteCategory = async (obj: CategoryDelete, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/category/`, {
        method: "DELETE",
        body: await encrypt(obj, key),
        headers: getDefaultHeader(token)

    });
    return await response.json();
};


export const updateCategory = async (obj: CategoryUpdate, key: KeyLike, token: string) => {
    const response = await fetch(`${BASE_URL}/category`, {
        method: "PUT",
        body: await encrypt(obj, key),
        headers: getDefaultHeader(token)
    });
    return await response.json();
};
