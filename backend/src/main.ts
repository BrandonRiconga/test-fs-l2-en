import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CategorySeederService } from './categories/category-seeders.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const categorySeederService = app.get(CategorySeederService);
  await categorySeederService.seed();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
      transform: true
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
