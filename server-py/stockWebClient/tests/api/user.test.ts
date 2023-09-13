import {loginUser, registerUser} from '../../data/api/user'
import {getPublicKey} from '../../data/api/auth'
import {JWK, KeyLike, importJWK} from 'jose'
import { randomBytes } from 'crypto'
import sha256 from 'crypto-js/sha256'

describe('user api', () => {
    let rsaPublicKey: KeyLike

    beforeEach(async () => {
        const response = await getPublicKey()
        const encPublicKey: JWK = response.keys.find((key: JWK)=>key.use === "enc")
        rsaPublicKey = (await importJWK(encPublicKey)) as KeyLike
        
    })

    it.skip('should register and login user', async () => {
        const randomID = randomBytes(3).toString('hex')
        const response = await registerUser({
            name: randomID,
            email: `${randomID}@naver.com`,
            password: sha256("1234").toString()
        }, rsaPublicKey);
        expect(response).toHaveProperty("result", "success")
        expect(response).toHaveProperty("token")

        const loginResponse = await loginUser({
            email: `${randomID}@naver.com`,
            password: sha256("1234").toString()
        }, rsaPublicKey)
        expect(loginResponse).toHaveProperty("result", "success")
        expect(loginResponse).toHaveProperty("token")
    })

    it("should login user", async () => {
        const loginResponse = await loginUser({
            email: `testUser@example.com`,
            password: sha256("********").toString()
        }, rsaPublicKey)
        expect(loginResponse).toHaveProperty("result", "success")
        expect(loginResponse).toHaveProperty("token")
    })

})

