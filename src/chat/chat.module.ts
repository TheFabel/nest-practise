import {Logger, Module} from '@nestjs/common';
import {ChatGateway} from './chat.gateway';

@Module({
    providers: [ChatGateway, Logger],
})
export class ChatModule {
}
