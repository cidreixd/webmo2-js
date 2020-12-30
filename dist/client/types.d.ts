import { Emitter } from 'mitt';
export interface WebmoEvent extends Emitter {
    once: any;
}
export interface HttpClient {
    init: ({ host, url }: {
        host?: string;
        url?: string;
    }) => void;
    send: (uri: string, method: string, data: any) => Promise<any>;
    ping: () => Promise<{
        ip: string;
    }>;
}
export interface WebSocketClient {
    init: ({ host, url }: {
        host?: string;
        url?: string;
    }) => void;
    send: (uri: string, method: string, data: any) => Promise<any>;
    events: WebmoEvent;
    isOpen: boolean;
}
//# sourceMappingURL=types.d.ts.map