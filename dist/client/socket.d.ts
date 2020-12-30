import { WebSocketClient } from '../client/types';
import { Emitter } from 'mitt';
export interface WebmoEvent extends Emitter {
    once: any;
}
export declare const socket: () => WebSocketClient;
//# sourceMappingURL=socket.d.ts.map