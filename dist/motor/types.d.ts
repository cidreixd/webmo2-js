import { HttpClient, WebSocketClient } from '../client/types';
interface SetClient {
    httpClient?: HttpClient;
    socketClient?: WebSocketClient;
}
export interface Motor {
    setClient: (prop: SetClient) => void;
    stop: (prop?: RotateStopProp) => Promise<any>;
    lock: (prop?: RotateLockProp) => Promise<any>;
    rotate: (prop: RotateProp) => Promise<any>;
    rotateBy: (prop: RotateByProp) => Promise<any>;
    rotateTo: (prop: RotateToProp) => Promise<any>;
    getRotation: () => Promise<any>;
    resetRotation: (prop: RotationResetProp) => Promise<any>;
}
export interface SyncMotor {
    setClient: (prop: SetClient) => void;
    stop: (prop?: SyncRotateStopProp) => Promise<any>;
    lock: (prop?: SyncRotateLockProp) => Promise<any>;
    rotate: (prop: SyncRotateProp, isVolatilize?: boolean) => Promise<any>;
    rotateBy: (prop: SyncRotateByProp) => Promise<any>;
    rotateTo: (prop: SyncRotateToProp) => Promise<any>;
    getRotation: () => Promise<any>;
    resetRotation: (prop: SyncRotationResetProp) => Promise<any>;
}
export interface RotateStopProp {
    smooth?: boolean;
}
export interface RotateLockProp {
    smooth?: boolean;
}
export interface RotateProp {
    speed: number;
}
export interface RotateToProp {
    speed: number;
    degree: number;
}
export interface RotateByProp {
    speed: number;
    degree: number;
}
export interface RotationResetProp {
    offset?: number;
}
export declare type SyncRotateStopProp = RotateStopProp | [RotateStopProp | null];
export declare type SyncRotateLockProp = RotateLockProp | [RotateLockProp | null];
export declare type SyncRotateProp = RotateProp | (RotateProp | null)[];
export declare type SyncRotateToProp = RotateToProp | (RotateToProp | null)[];
export declare type SyncRotateByProp = RotateByProp | (RotateByProp | null)[];
export declare type SyncRotationResetProp = RotationResetProp | (RotationResetProp | null)[];
export {};
//# sourceMappingURL=types.d.ts.map