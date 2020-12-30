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
    stop: (prop?: SyncRotateStopProp, prop2?: RotateStopProp | null) => Promise<any>;
    lock: (prop?: SyncRotateLockProp, prop2?: RotateLockProp | null) => Promise<any>;
    rotate: (prop: SyncRotateProp, prop2?: RotateProp | null) => Promise<any>;
    rotateBy: (prop: SyncRotateByProp, prop2?: RotateByProp | null) => Promise<any>;
    rotateTo: (prop: SyncRotateToProp, prop2?: RotateToProp | null) => Promise<any>;
    getRotation: () => Promise<any>;
    resetRotation: (prop: SyncRotationResetProp, prop2?: RotationResetProp | null) => Promise<any>;
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
export declare type SyncRotateStopProp = RotateStopProp | (RotateStopProp | null)[] | null;
export declare type SyncRotateLockProp = RotateLockProp | (RotateLockProp | null)[] | null;
export declare type SyncRotateProp = RotateProp | (RotateProp | null)[] | null;
export declare type SyncRotateToProp = RotateToProp | (RotateToProp | null)[] | null;
export declare type SyncRotateByProp = RotateByProp | (RotateByProp | null)[] | null;
export declare type SyncRotationResetProp = RotationResetProp | (RotationResetProp | null)[] | null;
export {};
//# sourceMappingURL=types.d.ts.map