import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import ms from 'ms';
import jwt from 'jsonwebtoken';
import * as jose from 'node-jose';
import { KeyLike, importJWK } from 'jose';

@Injectable()
export class AuthService {
    async getToken(payload: any) {
        return await this.getTokenByExp(payload, '1d');
    }

    async getTokenByExp(payload: any, exp: string) {
        const ks = fs.readFileSync('secret/Keys.json');
        const keyStore = await jose.JWK.asKeyStore(ks.toString());
        const [key] = keyStore.all({ use: 'sig' });

        const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } };

        payload = JSON.stringify({
            exp: Math.floor((Date.now() + ms(exp)) / 1000),
            iat: Math.floor(Date.now() / 1000),
            ...payload,
        });
        return (await jose.JWS.createSign(opt, key)
            .update(payload, 'utf8')
            .final()) as any;
    }

    async getPublicJWK() {
        const ks = fs.readFileSync('secret/Keys.json');
        const enryptKey: jose.JWK.KeyStore = await jose.JWK.asKeyStore(
            ks.toString(),
        );
        return enryptKey.toJSON();
    }

    async getEncPublicKey() {
        const publicJWK: any = await this.getPublicJWK();
        const targetPublicKey: any =
            publicJWK.keys.find((key: any) => key.alg === 'RSA-OAEP-256') || {};
        const rsaPublicKey: KeyLike = (await importJWK(
            targetPublicKey,
        )) as KeyLike;
        return rsaPublicKey;
    }

    async getPrivateJWK() {
        const ks = fs.readFileSync('secret/Keys.json');
        const enryptKey: jose.JWK.KeyStore = await jose.JWK.asKeyStore(
            ks.toString(),
        );
        return enryptKey.toJSON(true);
    }

    async encryptData(data: string) {
        const ks = fs.readFileSync('secret/Keys.json');
        const enryptKey: jose.JWK.KeyStore = await jose.JWK.asKeyStore(
            ks.toString(),
        );
        const text = jose.util.base64url.encode(data, 'utf8');
        return await jose.JWE.createEncrypt(
            {
                format: 'compact',
            },
            enryptKey.all({ use: 'enc' }),
        )
            .update(text)
            .final();
    }

    async decryptData(data: string) {
        const ks = fs.readFileSync('secret/Keys.json');
        const enryptKey: jose.JWK.KeyStore = await jose.JWK.asKeyStore(
            ks.toString(),
        );
        const decoded = await jose.JWE.createDecrypt(enryptKey).decrypt(data);
        return jose.util.base64url
            .decode(decoded.plaintext.toString())
            .toString();
    }

    async decryptJSON(data: string) {
        const decData: string = await this.decryptData(data);
        return JSON.parse(decData);
    }

    async verifyToken(token: string) {
        const ks = fs.readFileSync('secret/Keys.json');
        const keyStore = await jose.JWK.asKeyStore(ks.toString());
        const [publicKey] = keyStore.all({ use: 'sig' });
        return jwt.verify(token, publicKey.toPEM());
    }

    async decryptToken(token: string) {
        return jwt.decode(token);
    }
}
