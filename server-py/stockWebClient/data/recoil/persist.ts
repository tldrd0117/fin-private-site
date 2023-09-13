import { recoilPersist } from 'recoil-persist'

export const { persistAtom } = recoilPersist({
    key: 'recoil-persist', // this key is using to store data in local storage
    storage: typeof window != "undefined"? window.localStorage: undefined, // configure which storage will be used to store the data
    converter: JSON // configure how values will be serialized/deserialized in storage
})