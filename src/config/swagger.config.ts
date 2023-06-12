import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = new DocumentBuilder()
  .setTitle(`Stadium finder`)
  .setDescription(`Mini project for stadium finder`)
  .setVersion(`1.0.0`)
  .addTag(`NodeJS, NestJS, Postgres, Sequelize, JWT, Swagger`)
  .addServer('api')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'Bearer', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();
