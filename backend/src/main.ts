import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const extraOrigins =
    config.get<string>('ALLOWED_ORIGINS')?.split(',').map((o) => o.trim()) ??
    [];

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('chrome-extension://') ||
        extraOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const port = config.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
