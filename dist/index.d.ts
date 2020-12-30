import { Motor, SyncMotor } from './motor';
import { HttpClient, WebSocketClient } from './client/types';
export declare const motor1: Motor;
export declare const motor2: Motor;
export declare const motor: SyncMotor;
export declare const httpClient: HttpClient;
export declare const socketClient: WebSocketClient;
interface InitOptions {
    host?: string;
    isHttp?: boolean;
    isWebSocket?: boolean;
    http?: string;
    websocket?: string;
}
export declare const init: (options?: InitOptions | undefined) => void;
export declare const create: (options?: InitOptions | undefined) => {
    motor: SyncMotor;
    motor1: Motor;
    motor2: Motor;
    httpClient: HttpClient;
    socketClient: WebSocketClient;
    wait: (millis: number) => Promise<void>;
};
export declare const wait: (millis: number) => Promise<void>;
declare const _default: {
    init: (options?: InitOptions | undefined) => void;
    create: (options?: InitOptions | undefined) => {
        motor: SyncMotor;
        motor1: Motor;
        motor2: Motor;
        httpClient: HttpClient;
        socketClient: WebSocketClient;
        wait: (millis: number) => Promise<void>;
    };
    motor: SyncMotor;
    motor1: Motor;
    motor2: Motor;
    httpClient: HttpClient;
    socketClient: WebSocketClient;
    wait: (millis: number) => Promise<void>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map