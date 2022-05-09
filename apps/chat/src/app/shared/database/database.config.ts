import {registerAs} from '@nestjs/config';
import Joi from 'joi';

const schema = Joi.object({url: Joi.string().uri().required()});

export const databaseConfig = registerAs(
    'database',
    async (): Promise<{ url: string }> => {
        const config = {url: process.env[`TYPEORM_CHAT_URI`]};
        return schema.validateAsync(config);
    },
);
