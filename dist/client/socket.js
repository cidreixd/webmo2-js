var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { uuid } from '../utils';
import mitt from 'mitt';
import { NOT_INITIALIZED, NOT_OPEN_WEBSOCKET } from '../const/error';
var emitter = __assign(__assign({}, mitt()), { once: function () { } });
emitter.once = function (key, callback) {
    var func = function (data) {
        emitter.off(key, func);
        callback(data);
    };
    emitter.on(key, func);
};
var joinUrl = function (url) { return "ws://" + url + ":1337"; };
export var socket = function () {
    var socket = null;
    var isOpen = false;
    var onOpen = function (e) {
        isOpen = true;
        emitter.emit('open', e);
    };
    var onMessage = function (e) {
        var webSocketData = JSON.parse(e.data);
        if (webSocketData.type === 'UDP') {
            delete webSocketData.type;
            emitter.emit('UDP', webSocketData);
        }
        else if (webSocketData.receiveKey) {
            emitter.emit(webSocketData.receiveKey, webSocketData.data);
            emitter.emit('message', webSocketData);
        }
    };
    var onClose = function (e) {
        emitter.emit('close', e);
    };
    var onError = function (e) {
        emitter.emit('error', e);
    };
    var init = function (_a) {
        var host = _a.host, url = _a.url;
        emitter.all.clear();
        if (socket) {
            socket.removeEventListener('open', onOpen);
            socket.removeEventListener('message', onMessage);
            socket.removeEventListener('close', onClose);
            socket.removeEventListener('error', onError);
            socket.close();
        }
        socket = new WebSocket(url ? url : joinUrl(host || 'webmo.local'));
        if (!socket)
            return;
        socket.addEventListener('open', onOpen);
        socket.addEventListener('message', onMessage);
        socket.addEventListener('close', onClose);
        socket.addEventListener('error', onError);
    };
    var send = function (uri, method, data) { return __awaiter(void 0, void 0, void 0, function () {
        var key, webSocketData;
        return __generator(this, function (_a) {
            if (!socket) {
                throw new Error(NOT_INITIALIZED);
            }
            key = uuid();
            webSocketData = {
                uri: uri,
                method: method,
                key: key,
                data: data,
            };
            if (socket.readyState !== 1) {
                throw new Error(NOT_OPEN_WEBSOCKET);
            }
            socket.send(JSON.stringify(webSocketData));
            emitter.emit('send', webSocketData);
            return [2 /*return*/, new Promise(function (resolve) {
                    emitter.once(key, function (response) {
                        resolve(response);
                    });
                })];
        });
    }); };
    var client = {
        init: init,
        send: send,
        events: emitter,
        isOpen: isOpen,
    };
    return client;
};
