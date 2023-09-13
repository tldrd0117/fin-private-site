import { KeyLike } from 'jose';
declare const _default: {
    encForClient: (object: any, rsaPublicKey: any) => Promise<string>;
    getEncPublicKey: (keyObject: any) => Promise<KeyLike>;
};
export default _default;
