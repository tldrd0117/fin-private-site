import jestFetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util'

jestFetchMock.disableMocks();
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

beforeAll( async () => {
    const {webcrypto} = await import('crypto')
    // @ts-ignore
    global.crypto.subtle = webcrypto.subtle
    // @ts-ignore
    global.CryptoKey = webcrypto.CryptoKey
})
