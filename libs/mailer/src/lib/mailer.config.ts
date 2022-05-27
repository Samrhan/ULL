import {registerAs} from '@nestjs/config';
import Joi from 'joi';

const schema = Joi.object({apiKey: Joi.string().required(), domainName: Joi.string().required()});

export const mailerConfig = registerAs(
  'mailer',
  async (): Promise<{ apiKey: string, domainName: string }> => {
    const config = {apiKey: process.env[`MAILGUN_API_KEY`], domainName: process.env['MAILGUN_DOMAIN_NAME']};
    return schema.validateAsync(config);
  },
);
