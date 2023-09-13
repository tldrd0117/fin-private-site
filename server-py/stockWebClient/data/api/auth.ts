import { KeyLike } from "jose";
import { TokenPayload } from "./interfaces/auth";
import { BASE_URL, encrypt, getDefaultHeader } from "./utils/common";

export const getPublicKey = async () => {
    const response = await fetch(`${BASE_URL}/auth/publicKey`);
    return await response.json();
};

export const verifyToken = async ({ token }: TokenPayload, key: KeyLike) => {
    const response = await fetch(`${BASE_URL}/auth/verify`, {
        method: "POST",
        headers: getDefaultHeader(token),
        body: await encrypt({}, key),
    });
    return await response.json();
};

export const getGuestToken = async () => {
    const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "GET",
        headers: getDefaultHeader(),
    });
    return await response.json();
}