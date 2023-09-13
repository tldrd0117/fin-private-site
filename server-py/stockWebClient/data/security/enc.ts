import sha256 from "crypto-js/sha256";
import jose, { JWK, KeyLike, importJWK, decodeJwt } from "jose";

export const getEncPublicKey = async (keyObject: any) => {
    const encPublicKey: JWK = keyObject.keys.find((key: JWK)=>key.use === "enc")
    return (await importJWK(encPublicKey)) as KeyLike
}

export const encPassword = (pwd:string) => {
    return sha256(pwd).toString()
}

export const getLoginInfo = (token: string) => {
    return decodeJwt(token)
}

