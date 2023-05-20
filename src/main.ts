import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(`api`);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    const PORT = process.env.PORT || 3333;
    const config = getSwaggerConfig;
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/find-stadium`, app, document);

    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
