import { VisitType } from "@/data/api/interfaces/visit"

export const QUERY_KEYS = {
    AUTH: {
        PUBLIC_KEY: "publicKey",
        ENC_PUBLIC_KEY: "encPublicKey"
    },
    POST: {
        LIST: 'postList',
        POST: 'post',
        SEARCH_LIST: 'postSearchList',
    },
    USER: {
        GUEST_TOKEN: "guestToken",
        TOKEN: "token",
        LOGIN_STATE: "loginState",
        LOGIN_CHECK: "loginCheck",
        INFO: "loginInfo"
    },
    SETTING: {
        DATA: "settingData",
        CATEGORIES: "settingCategories",
        LIST: "settingList",
    },
    INFO: {
        TYPE: "infoType",
    },
    VISIT: {
        LIST: "visitList",
        POPULAR_LIST: "popularVisitList",
    },
    CATEGORY: {
        LIST: "categoryList"
    }
}

export const VISIT_TARGET = {
    TODAY: "today",
}

export const VISIT_TYPES = {
    BLOG: "blog" as VisitType,
    POST: "Post" as VisitType,
    TAG: "Tag" as VisitType,
    CATEGORY: "Category" as VisitType,
}

export const POST_LIST = {
    DEFAULT_LIMIT: 20,
    RECENT_LIST_LIMIT: 10,
}