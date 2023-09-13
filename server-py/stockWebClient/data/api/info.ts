import { KeyLike } from "jose";
import { TokenPayload } from "./interfaces/auth";
import { BASE_URL, encrypt } from "./utils/common";

export const getTypes = async () => {
    const response = await fetch(`${BASE_URL}/user/types`);
    return await response.json();
};
