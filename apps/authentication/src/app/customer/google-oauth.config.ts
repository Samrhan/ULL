import {registerAs} from '@nestjs/config';
import Joi from 'joi';

const schema = Joi.object({
  client_id: Joi.string().required(),
  client_secret: Joi.string().required(),
  redirect_uri: Joi.string().uri().required(),
});

export const googleOauthConfig = registerAs(
  'google-oauth',
  async (): Promise<{
    client_id: string,
    client_secret: string,
    redirect_uri: string
  }> => {
    const config = {
      client_id: process.env.GCP_CLIENT_ID,
      client_secret: process.env.GCP_CLIENT_SECRET,
      redirect_uri: process.env.GCP_REDIRECT_URI,
    };
    return schema.validateAsync(config);
  },
);
