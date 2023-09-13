import { CompactEncrypt, JWK, KeyLike, base64url, importJWK } from 'jose';
import { Buffer } from 'buffer';

const encForClient = async (object, rsaPublicKey) => {
    const encodedText = base64url.encode(JSON.stringify(object));
    const text = new Uint8Array(Buffer.from(encodedText));
    return await new CompactEncrypt(text)
        .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
        .encrypt(rsaPublicKey);
};

const getEncPublicKey = async (keyObject: any) => {
    const encPublicKey: JWK = keyObject.keys.find(
        (key: JWK) => key.use === 'enc',
    );
    return (await importJWK(encPublicKey)) as KeyLike;
};

export default {
    encForClient,
    getEncPublicKey,
};
