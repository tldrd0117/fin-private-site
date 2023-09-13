import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { setupSwagger } from './swagger/setup';
import { AllExceptionsFilter } from './common/allException.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useWebSocketAdapter(new WsAdapter(app));
    app.enableCors();
    setupSwagger(app);
    await app.listen(3001);
}
bootstrap();
