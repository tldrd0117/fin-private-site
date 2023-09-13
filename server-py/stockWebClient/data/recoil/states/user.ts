import { atom } from "recoil";
import { persistAtom } from "../persist";
import ATOM_KEYS from "./keys";


export const tokenState = atom({
    key: ATOM_KEYS.TOKEN,
    default: "",
    effects_UNSTABLE: [persistAtom],
})

export const userInfoState = atom({
    key: ATOM_KEYS.USER_INFO,
    default: undefined,
    effects_UNSTABLE: [persistAtom],
})

export const settingTypeMapState = atom({
    key: ATOM_KEYS.SETTING_TYPES,
    default: undefined,
    effects_UNSTABLE: [persistAtom],
    
})

export const roleTypeMapState = atom({
    key: ATOM_KEYS.ROLE_TYPES,
    default: undefined,
    effects_UNSTABLE: [persistAtom],
})

export const settingTypeSelectList = atom({
    key: ATOM_KEYS.SETTING_TYPE_SELECT_LIST,
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const roleTypeSelectList = atom({
    key: ATOM_KEYS.ROLE_TYPE_SELECT_LIST,
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const settingMapState = atom({
    key: ATOM_KEYS.SETTING_MAP,
    default: {},
    effects_UNSTABLE: [persistAtom],
})
