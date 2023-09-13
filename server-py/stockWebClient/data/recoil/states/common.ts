
import { atom } from "recoil";
import { persistAtom } from "../persist";
import ATOM_KEYS from "./keys";

export const networkErrorHandleState = atom({
    key: ATOM_KEYS.NETWORK_ERROR_HANDLE,
    default: {
        isError: false,
        message: "",
        date: new Date(),
    },
})