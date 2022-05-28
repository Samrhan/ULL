import {Injectable} from '@nestjs/common';
import {Message} from '@ull/api-interfaces';

@Injectable()
export class AppService {
    getData(): Message {
        return {message: 'Welcome to accounting!'};
    }
}
