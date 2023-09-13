import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import request from 'superwstest';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useWebSocketAdapter(new WsAdapter(app));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('websocket', async () => {
        const server = app.getHttpServer();
        await server.listen();
        await request(server)
            .ws('/')
            .sendJson({ event: 'identity', data: 1 })
            .expectText('1')
            .sendJson({ event: 'identity', data: 1 })
            .expectText('1')
            .close()
            .expectClosed();
    });
});
