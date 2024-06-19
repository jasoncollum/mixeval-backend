import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:8080'],
  });
  await app.listen(process.env.PORT || 5001); // 5001
}
bootstrap();
