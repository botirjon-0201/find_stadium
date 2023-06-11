import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const getFilePathConfig = (): ConfigModuleOptions => ({
  envFilePath: '.env',
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    PORT: Joi.number().default(5000),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
});
