import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
declare global {
    interface Window {
        enc: any;
    }
}

export const setupSwagger = async (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Stock Web Server')
        .setDescription('Stock Web Server API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    console.log(document);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            requestInterceptor: async (req: any) => {
                if (req.method !== 'GET') {
                    const pubKey = await fetch('/auth/publicKey');
                    const pubKeyJson = await pubKey.json();
                    const rsaPublicKey = await window.enc.getEncPublicKey(
                        pubKeyJson,
                    );
                    if (!req.body) req.body = {};
                    if (typeof req.body == 'string')
                        req.body = JSON.parse(req.body);
                    req.body = JSON.stringify({
                        enc: await window.enc.encForClient(
                            req.body,
                            rsaPublicKey,
                        ),
                    });
                }
                console.log(req.body);
                return req;
            },
        },
        customJs: 'enc_dist.js',
    });
};
