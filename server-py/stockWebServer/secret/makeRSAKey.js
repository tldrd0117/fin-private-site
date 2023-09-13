const fs = require('fs');

const jose = require('node-jose');

async function makeKey() {
    const keystore = jose.JWK.createKeyStore();
    await keystore.generate('RSA', 2048, { use: 'enc', alg: 'RSA-OAEP-256' });
    await keystore.generate('RSA', 2048, { use: 'sig', alg: 'RS256' });
    fs.writeFileSync(
        'secret/Keys.json',
        JSON.stringify(keystore.toJSON(true), undefined, 4),
    );
}
makeKey();
