import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import Socket = NodeJS.Socket;
import {Logger} from '@nestjs/common';
import {Server} from 'http';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    users: number = 0;

    constructor(private readonly logger: Logger) {
        this.logger.setContext('ChatGateway');
    }

    async handleConnection() {
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', {users: 'some users'});
        // tslint:disable-next-line:no-console
        this.logger.log(`Users count: ${this.users}`);

    }

    async handleDisconnect() {
        this.users--;
    }

    @SubscribeMessage('init')
    handleInit(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.emit('init', {name: 'Test'});
    }

}
