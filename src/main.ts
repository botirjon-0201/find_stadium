import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3333;

    const config = new DocumentBuilder()
      .setTitle(`Stadium finder`)
      .setDescription(`Mini project for stadium finder`)
      .setVersion(`1.0.0`)
      .addTag(`NodeJS, NestJS, Postgres, Sequelize,JWT, Swagger`)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`/docs`, app, document);

    app.setGlobalPrefix(`api`);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}
start();
