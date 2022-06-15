import {registerAs} from '@nestjs/config';
import Joi from 'joi';

const schema = Joi.object({url: Joi.string().uri().required()});

export const RabbitMQConfig = registerAs(
  'rabbitmq',
  async (): Promise<{ url: string }> => {
    const config = {url: process.env[`RABBITMQ_URI`]};
    return schema.validateAsync(config);
  },
);
