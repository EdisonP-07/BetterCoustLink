"use strict";
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
exports.__esModule = true;
exports.gameReader = void 0;
var electron_1 = require("electron");
var GameReader_1 = require("./GameReader");
var node_keyboard_watcher_1 = require("node-keyboard-watcher");
var electron_store_1 = require("electron-store");
var ipc_messages_1 = require("../common/ipc-messages");
var store = new electron_store_1["default"]();
var currentPlayerConfigMap = store.get('playerConfigMap', {});
var playerConfigMapLength = Object.keys(currentPlayerConfigMap).length;
console.log('CONFIG count: ', playerConfigMapLength);
if (playerConfigMapLength > 50) {
    store.set('playerConfigMap', {});
}
var readingGame = false;
var pushToTalkShortcut;
var deafenShortcut;
var muteShortcut;
var impostorRadioShortcut;
function resetKeyHooks() {
    pushToTalkShortcut = store.get('pushToTalkShortcut', 'V');
    deafenShortcut = store.get('deafenShortcut', 'RControl');
    muteShortcut = store.get('muteShortcut', 'RAlt');
    impostorRadioShortcut = store.get('impostorRadioShortcut', 'F');
    node_keyboard_watcher_1.keyboardWatcher.clearKeyHooks();
    addKeyHandler(pushToTalkShortcut);
    addKeyHandler(deafenShortcut);
    addKeyHandler(muteShortcut);
    addKeyHandler(impostorRadioShortcut);
}
electron_1.ipcMain.on(ipc_messages_1.IpcHandlerMessages.RESET_KEYHOOKS, function () {
    resetKeyHooks();
});
electron_1.ipcMain.on(ipc_messages_1.IpcHandlerMessages.JOIN_LOBBY, function (event, lobbycode, server) {
    var tryjoin = exports.gameReader === null || exports.gameReader === void 0 ? void 0 : exports.gameReader.joinGame(lobbycode, server);
    console.log('JOIN LOBBY:', lobbycode, tryjoin);
    if (!tryjoin) {
        event.reply(ipc_messages_1.IpcHandlerMessages.JOIN_LOBBY_ERROR, lobbycode, server);
    }
});
electron_1.ipcMain.on(ipc_messages_1.IpcSyncMessages.GET_INITIAL_STATE, function (event) {
    if (!readingGame) {
        console.error('Recieved GET_INITIAL_STATE message before the START_HOOK message was received');
        event.returnValue = null;
        return;
    }
    event.returnValue = exports.gameReader.lastState;
});
electron_1.ipcMain.handle(ipc_messages_1.IpcMessages.REQUEST_MOD, function () {
    return exports.gameReader.loadedMod.id;
});
electron_1.ipcMain.handle(ipc_messages_1.IpcHandlerMessages.START_HOOK, function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var speaking_1, gotError_1, frame_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!readingGame) return [3 /*break*/, 2];
                readingGame = true;
                speaking_1 = 0;
                resetKeyHooks();
                node_keyboard_watcher_1.keyboardWatcher.on('keydown', function (keyId) {
                    var _a, _b;
                    if (keyCodeMatches(pushToTalkShortcut, keyId)) {
                        speaking_1 += 1;
                    }
                    if (keyCodeMatches(impostorRadioShortcut, keyId) && ((_b = (_a = exports.gameReader.lastState.players) === null || _a === void 0 ? void 0 : _a.find(function (value) { return value.clientId === exports.gameReader.lastState.clientId; })) === null || _b === void 0 ? void 0 : _b.isImpostor)) {
                        speaking_1 += 1;
                        event.sender.send(ipc_messages_1.IpcRendererMessages.IMPOSTOR_RADIO, true);
                    }
                    // Cover weird cases which shouldn't happen but just in case
                    if (speaking_1 > 2) {
                        speaking_1 = 2;
                    }
                    if (speaking_1) {
                        event.sender.send(ipc_messages_1.IpcRendererMessages.PUSH_TO_TALK, true);
                    }
                });
                node_keyboard_watcher_1.keyboardWatcher.on('keyup', function (keyId) {
                    var _a, _b;
                    if (keyCodeMatches(pushToTalkShortcut, keyId)) {
                        speaking_1 -= 1;
                    }
                    if (keyCodeMatches(deafenShortcut, keyId)) {
                        event.sender.send(ipc_messages_1.IpcRendererMessages.TOGGLE_DEAFEN);
                    }
                    if (keyCodeMatches(muteShortcut, keyId)) {
                        event.sender.send(ipc_messages_1.IpcRendererMessages.TOGGLE_MUTE);
                    }
                    if (keyCodeMatches(impostorRadioShortcut, keyId) && ((_b = (_a = exports.gameReader.lastState.players) === null || _a === void 0 ? void 0 : _a.find(function (value) { return value.clientId === exports.gameReader.lastState.clientId; })) === null || _b === void 0 ? void 0 : _b.isImpostor)) {
                        speaking_1 -= 1;
                        event.sender.send(ipc_messages_1.IpcRendererMessages.IMPOSTOR_RADIO, false);
                    }
                    // Cover weird cases which shouldn't happen but just in case
                    if (speaking_1 < 0) {
                        speaking_1 = 0;
                    }
                    if (!speaking_1) {
                        event.sender.send(ipc_messages_1.IpcRendererMessages.PUSH_TO_TALK, false);
                    }
                });
                node_keyboard_watcher_1.keyboardWatcher.start();
                // Read game memory
                exports.gameReader = new GameReader_1["default"](event.sender.send.bind(event.sender));
                gotError_1 = false;
                frame_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var err;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, exports.gameReader.loop()];
                            case 1:
                                err = _a.sent();
                                if (err) {
                                    // readingGame = false;
                                    gotError_1 = true;
                                    event.sender.send(ipc_messages_1.IpcRendererMessages.ERROR, err);
                                    setTimeout(frame_1, 7500);
                                }
                                else {
                                    if (gotError_1) {
                                        event.sender.send(ipc_messages_1.IpcRendererMessages.ERROR, '');
                                        gotError_1 = false;
                                    }
                                    setTimeout(frame_1, 1000 / 5);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, frame_1()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                if (exports.gameReader) {
                    exports.gameReader.amongUs = null;
                    exports.gameReader.checkProcessDelay = 0;
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.on('reload', function (_, lobbybrowser) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        if (!lobbybrowser) {
            (_a = global.mainWindow) === null || _a === void 0 ? void 0 : _a.reload();
        }
        (_b = global.lobbyBrowser) === null || _b === void 0 ? void 0 : _b.reload();
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('minimize', function (_, lobbybrowser) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        if (!lobbybrowser) {
            (_a = global.mainWindow) === null || _a === void 0 ? void 0 : _a.minimize();
        }
        (_b = global.lobbyBrowser) === null || _b === void 0 ? void 0 : _b.minimize();
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.handle("getlocale", function () {
    return electron_1.app.getLocale();
});
electron_1.ipcMain.on('relaunch', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        electron_1.app.relaunch();
        electron_1.app.exit();
        return [2 /*return*/];
    });
}); });
var keycodeMap = {
    Space: 0x20,
    Backspace: 0x08,
    Delete: 0x2e,
    Enter: 0x0d,
    Up: 0x26,
    Down: 0x28,
    Left: 0x24,
    Right: 0x27,
    Home: 0x24,
    End: 0x23,
    PageUp: 0x21,
    PageDown: 0x22,
    Escape: 0x1b,
    Control: 0x11,
    LShift: 0xa0,
    RShift: 0xa1,
    RAlt: 0xa5,
    LAlt: 0xa4,
    RControl: 0xa3,
    LControl: 0xa2,
    Shift: 0x10,
    Alt: 0x12,
    F1: 0x70,
    F2: 0x71,
    F3: 0x72,
    F4: 0x73,
    F5: 0x74,
    F6: 0x75,
    F7: 0x76,
    F8: 0x77,
    F9: 0x78,
    F10: 0x79,
    F11: 0x7a,
    F12: 0x7b,
    MouseButton4: 0x05,
    MouseButton5: 0x06,
    Numpad0: 0x60,
    Numpad1: 0x61,
    Numpad2: 0x62,
    Numpad3: 0x63,
    Numpad4: 0x64,
    Numpad5: 0x65,
    Numpad6: 0x66,
    Numpad7: 0x67,
    Numpad8: 0x68,
    Numpad9: 0x69,
    Disabled: -1
};
function keyCodeMatches(key, keyId) {
    if (keycodeMap[key])
        return keycodeMap[key] === keyId;
    else if (key && key.length === 1)
        return key.charCodeAt(0) === keyId;
    else {
        console.error('Invalid key', key);
        return false;
    }
}
function addKeyHandler(key) {
    if (keycodeMap[key] && keycodeMap[key] !== -1) {
        node_keyboard_watcher_1.keyboardWatcher.addKeyHook(keycodeMap[key]);
    }
    else if (key && key.length === 1) {
        node_keyboard_watcher_1.keyboardWatcher.addKeyHook(key.charCodeAt(0));
    }
}
