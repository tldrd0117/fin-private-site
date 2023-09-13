import { JWK, KeyLike, importJWK } from 'jose'
import { getPublicKey, verifyToken } from '../../data/api/auth'
import { loginUser } from '@/data/api/user'
import sha256 from 'crypto-js/sha256'

describe('auth api', () => {
    it('should request publicKey', async () => {
        const response = await getPublicKey()
        expect(response).toHaveProperty("keys")
        expect(response).toHaveProperty("result", "success")
        expect(response.keys).toHaveLength(2)
        expect(response.keys[0]).toHaveProperty("use", "enc")
        expect(response.keys[1]).toHaveProperty("use", "sig")
    })
    it('should request verify', async () => {
        const response = await getPublicKey()
        const encPublicKey: JWK = response.keys.find((key: JWK)=>key.use === "enc")
        const signPublicKey: JWK = response.keys.find((key: JWK)=>key.use === "sig")
        const rsaPublicKey = (await importJWK(encPublicKey)) as KeyLike
        const loginResponse = await loginUser({
            email: `testUser@example.com`,
            password: sha256("********").toString()
        }, rsaPublicKey)
        const verifyResponse = await verifyToken({ token: loginResponse.token}, rsaPublicKey);
        expect(verifyResponse).toHaveProperty("result", "success")

    })
})