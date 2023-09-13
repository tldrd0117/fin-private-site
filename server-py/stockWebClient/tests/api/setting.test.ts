import { JWK, JWTPayload, KeyLike, importJWK } from 'jose'
import { getPublicKey, verifyToken } from '../../data/api/auth'
import { loginUser } from '@/data/api/user'
import sha256 from 'crypto-js/sha256'
import { decryptToken } from '@/data/api/utils/cryptoUtils'
import { addCategories, getSetting, putSetting } from '@/data/api/setting'

describe('setting api', () => {
    let token: string;
    let user: JWTPayload;
    let rsaPublicKey: KeyLike;

    beforeEach(async () => {
        const response = await getPublicKey()
        const encPublicKey: JWK = response.keys.find((key: JWK)=>key.use === "enc")
        rsaPublicKey = (await importJWK(encPublicKey)) as KeyLike
        
        const loginResponse = await loginUser({
            email: `tester01@naver.com`,
            password: sha256("12345678").toString()
        }, rsaPublicKey)
        expect(loginResponse).toHaveProperty("result", "success")
        expect(loginResponse).toHaveProperty("token")
        token = loginResponse.token;
        user = await decryptToken(loginResponse.token);
        console.log(token, user)
        
    });
    it('should request add Categories And Get Setting And Put Setting', async () => {
        await addCategories({
            categories: ["카테고리1", "카테고리2", "카테고리3"]
        }, rsaPublicKey, token)
        let setting = await getSetting(rsaPublicKey, token)
        expect(setting.list).toStrictEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: expect.any(String),
                type: 'site',
                role: 'guest',
                userId: expect.any(String),
                name: 'category',
                value: '카테고리1',
                createAt: expect.any(String),
                updateAt: expect.any(String),
                __v: expect.any(Number)
            }),
            expect.objectContaining({
                _id: expect.any(String),
                type: 'site',
                role: 'guest',
                userId: expect.any(String),
                name: 'category',
                value: '카테고리2',
                createAt: expect.any(String),
                updateAt: expect.any(String),
                __v: 0
            }),
            expect.objectContaining({
                _id: expect.any(String),
                type: 'site',
                role: 'guest',
                userId: expect.any(String),
                name: 'category',
                value: '카테고리3',
                createAt: expect.any(String),
                updateAt: expect.any(String),
                __v: 0
            })
        ]))
        const target = setting.list[0]
        await putSetting({
            _id: target._id,
            value: "카테고리 수정됨"
        }, rsaPublicKey, token)
        setting = await getSetting(rsaPublicKey, token)
        expect(setting.list).toStrictEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: expect.any(String),
                type: 'site',
                role: 'guest',
                userId: expect.any(String),
                name: 'category',
                value: '카테고리 수정됨',
                createAt: expect.any(String),
                updateAt: expect.any(String),
                __v: expect.any(Number)
            }),
        ]))
    })
})