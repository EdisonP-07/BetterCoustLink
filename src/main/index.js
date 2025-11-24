'use strict'; // eslint-disable-line
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
var electron_updater_1 = require("electron-updater");
var electron_1 = require("electron");
var electron_window_state_1 = require("electron-window-state");
var os_1 = require("os");
var path_1 = require("path");
var url_1 = require("url");
require("./hook");
var electron_overlay_window_1 = require("electron-overlay-window");
var ipc_handlers_1 = require("./ipc-handlers");
var ipc_messages_1 = require("../common/ipc-messages");
var electron_2 = require("electron");
var electron_store_1 = require("electron-store");
var electron_devtools_installer_1 = require("electron-devtools-installer");
var hook_1 = require("./hook");
var avatarGenerator_1 = require("./avatarGenerator");
var dgram = require("dgram");
var args = require('minimist')(process.argv); // eslint-disable-line
var isDevelopment = process.env.NODE_ENV !== 'production';
var devTools = (isDevelopment || args.dev === 1) && true;
var appVersion = isDevelopment ? "DEV" : electron_updater_1.autoUpdater.currentVersion.version;
// global reference to mainWindow (necessary to prevent window from being garbage collected)
global.mainWindow = null;
global.overlay = null;
var store = new electron_store_1["default"]();
electron_1.app.commandLine.appendSwitch('disable-pinch');
if ((0, os_1.platform)() === 'linux' || !store.get('hardware_acceleration', true)) {
    electron_1.app.disableHardwareAcceleration();
}
if ((0, os_1.platform)() === 'linux') {
    electron_1.app.commandLine.appendSwitch('disable-gpu-sandbox');
}
function createMainWindow() {
    var mainWindowState = (0, electron_window_state_1["default"])({});
    var window = new electron_1.BrowserWindow({
        title: 'BetterCrewLink',
        width: 250,
        height: 350,
        maxWidth: 250,
        minWidth: 250,
        maxHeight: 350,
        minHeight: 350,
        x: mainWindowState.x,
        y: mainWindowState.y,
        resizable: false,
        frame: false,
        fullscreenable: false,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindowState.manage(window);
    if (devTools) {
        //Force devtools into detached mode otherwise they are unusable
        window.on('ready-to-show', function () {
            window.webContents.openDevTools({
                mode: 'detach'
            });
        });
    }
    if (isDevelopment) {
        window.loadURL("http://localhost:".concat(process.env.ELECTRON_WEBPACK_WDS_PORT, "?version=DEV&view=app"));
    }
    else {
        window.loadURL((0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, 'index.html'),
            protocol: 'file',
            query: {
                version: appVersion,
                view: 'app'
            },
            slashes: true
        }));
    }
    //window.webContents.userAgent = `CrewLink/${crewlinkVersion} (${process.platform})`;
    window.webContents.userAgent = "BetterCrewLink/".concat(appVersion, " (win32)");
    window.on('closed', function () {
        try {
            var mainWindow = global.mainWindow;
            var overlay = global.overlay;
            global.mainWindow = null;
            global.overlay = null;
            overlay === null || overlay === void 0 ? void 0 : overlay.close();
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.destroy();
            overlay === null || overlay === void 0 ? void 0 : overlay.destroy();
        }
        catch (_a) {
            /* empty */
        }
    });
    window.webContents.on('devtools-opened', function () {
        window.focus();
        setImmediate(function () {
            window.focus();
        });
    });
    console.log('Opened app version: ', appVersion);
    return window;
}
function createLobbyBrowser() {
    var window = new electron_1.BrowserWindow({
        title: 'BetterCrewLink Browser',
        width: 900,
        height: 500,
        minWidth: 250,
        minHeight: 350,
        resizable: true,
        frame: false,
        fullscreenable: false,
        closable: true,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    window.on('closed', function () {
        global.lobbyBrowser = null;
    });
    // if (devTools) {
    // 	// Force devtools into detached mode otherwise they are unusable
    // 	window.webContents.openDevTools({
    // 		mode: 'detach',
    // 	});
    // }
    if (isDevelopment) {
        window.loadURL("http://localhost:".concat(process.env.ELECTRON_WEBPACK_WDS_PORT, "?version=DEV&view=lobbies"));
    }
    else {
        window.loadURL((0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, 'index.html'),
            protocol: 'file',
            query: {
                version: appVersion,
                view: 'lobbies'
            },
            slashes: true
        }));
    }
    window.webContents.userAgent = "BetterCrewLink/".concat(appVersion, " (win32)");
    console.log('Opened app version: ', appVersion);
    return window;
}
function createOverlay() {
    var overlay = new electron_1.BrowserWindow({
        title: 'BetterCrewLink Overlay',
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        fullscreenable: true,
        skipTaskbar: true,
        frame: false,
        show: false,
        transparent: true,
        resizable: true,
        focusable: false
    });
    if (devTools) {
        overlay.webContents.openDevTools({
            mode: 'detach'
        });
    }
    if (isDevelopment) {
        overlay.loadURL("http://localhost:".concat(process.env.ELECTRON_WEBPACK_WDS_PORT, "?version=").concat(appVersion, "&view=overlay"));
    }
    else {
        overlay.loadURL((0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, 'index.html'),
            protocol: 'file',
            query: {
                version: appVersion,
                view: 'overlay'
            },
            slashes: true
        }));
    }
    overlay.setIgnoreMouseEvents(true);
    electron_overlay_window_1.overlayWindow.attachTo(overlay, 'Among Us');
    overlay.setBackgroundColor('#00000000');
    return overlay;
}
var gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_updater_1.autoUpdater.autoDownload = false;
    electron_updater_1.autoUpdater.checkForUpdates();
    electron_updater_1.autoUpdater.on('update-available', function (info) {
        var _a;
        try {
            (_a = global.mainWindow) === null || _a === void 0 ? void 0 : _a.webContents.send(ipc_messages_1.IpcRendererMessages.AUTO_UPDATER_STATE, {
                state: 'available',
                info: info
            });
        }
        catch (e) {
            /* Empty block */
        }
    });
    electron_updater_1.autoUpdater.on('error', function (err) {
        var _a;
        try {
            (_a = global.mainWindow) === null || _a === void 0 ? void 0 : _a.webContents.send(ipc_messages_1.IpcRendererMessages.AUTO_UPDATER_STATE, {
                state: 'error',
                error: err
            });
        }
        catch (e) {
            /*empty*/
        }
    });
    electron_updater_1.autoUpdater.on('download-progress', function (progress) {
        var _a;
        try {
            (_a = global.mainWindow) === null || _a === void 0 ? void 0 : _a.webContents.send(ipc_messages_1.IpcRendererMessages.AUTO_UPDATER_STATE, {
                state: 'downloading',
                progress: progress
            });
        }
        catch (e) {
            /*empty*/
        }
    });
    electron_updater_1.autoUpdater.on('update-downloaded', function () {
        electron_updater_1.autoUpdater.quitAndInstall();
    });
    // quit application when all windows are closed
    electron_1.app.on('window-all-closed', function () {
        // on macOS it is common for applications to stay open until the user explicitly quits
        try {
            var mainWindow = global.mainWindow;
            var overlay = global.overlay;
            global.mainWindow = null;
            global.overlay = null;
            overlay === null || overlay === void 0 ? void 0 : overlay.close();
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.destroy();
            overlay === null || overlay === void 0 ? void 0 : overlay.destroy();
        }
        catch (_a) {
            /* empty */
        }
        electron_1.app.quit();
    });
    electron_1.app.on('activate', function () {
        console.log("ACTIVATE???");
        // on macOS it is common to re-create a window even after all windows have been closed
        if (global.mainWindow === null) {
            global.mainWindow = createMainWindow();
        }
        electron_1.session.fromPartition('default').setPermissionRequestHandler(function (webContents, permission, callback) {
            var allowedPermissions = ['audioCapture']; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest
            console.log('permission requested ', permission);
            if (allowedPermissions.includes(permission)) {
                callback(true); // Approve permission request
            }
            else {
                console.error("The application tried to request permission for '".concat(permission, "'. This permission was not whitelisted and has been blocked."));
                callback(false); // Deny
            }
        });
    });
    var CAMO_UDP_PORT_1 = 6000;
    var udpServer = dgram.createSocket('udp4');
    udpServer.on('message', function (msg) {
        var camoActive = msg[0] === 1;
        console.log('Camoflager active:', camoActive);
        // Broadcast to all renderer windows
        electron_1.BrowserWindow.getAllWindows().forEach(function (win) {
            win.webContents.send('camoflager-signal', camoActive);
        });
    });
    // Bind the UDP server once, outside the message handler
    udpServer.bind(CAMO_UDP_PORT_1, '127.0.0.1', function () {
        console.log("Camoflager UDP listener running on port ".concat(CAMO_UDP_PORT_1));
    });
    // create main BrowserWindow when electron is ready
    electron_1.app.whenReady().then(function () {
        electron_2.protocol.registerFileProtocol('static', function (request, callback) {
            var pathname = electron_1.app.getPath('userData') + '/static/' + request.url.replace('static:///', '');
            callback(pathname);
        });
        electron_2.protocol.registerFileProtocol('generate', function (request, callback) { return __awaiter(void 0, void 0, void 0, function () {
            var url, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(request.url.replace('generate:///', ''));
                        return [4 /*yield*/, (0, avatarGenerator_1.GenerateHat)(url, hook_1.gameReader.playercolors, Number(url.searchParams.get('color')), '')];
                    case 1:
                        path = _a.sent();
                        callback(path);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, ipc_handlers_1.initializeIpcListeners)();
        (0, ipc_handlers_1.initializeIpcHandlers)();
        global.mainWindow = createMainWindow();
        if (isDevelopment)
            (0, electron_devtools_installer_1["default"])(electron_devtools_installer_1.REACT_DEVELOPER_TOOLS)
                .then(function (name) { return console.log("Added Extension:  ".concat(name)); })["catch"](function (err) { return console.log('An error occurred: ', err); });
    });
    electron_1.app.on('second-instance', function () {
        // Someone tried to run a second instance, we should focus our window.
        if (global.mainWindow) {
            if (global.mainWindow.isMinimized())
                global.mainWindow.restore();
            global.mainWindow.focus();
        }
    });
    electron_1.ipcMain.on('update-app', function () {
        electron_updater_1.autoUpdater.downloadUpdate();
    });
    electron_1.ipcMain.on(ipc_messages_1.IpcHandlerMessages.OPEN_LOBBYBROWSER, function () {
        if (!global.lobbyBrowser) {
            global.lobbyBrowser = createLobbyBrowser();
        }
        else {
            global.lobbyBrowser.show();
            global.lobbyBrowser.moveTop();
        }
    });
    electron_1.ipcMain.on('enableOverlay', function (_event, enable) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setTimeout(function () {
                var _a, _b, _c, _d;
                try {
                    if (enable) {
                        if (!global.overlay) {
                            global.overlay = createOverlay();
                        }
                        electron_overlay_window_1.overlayWindow.show();
                    }
                    else {
                        electron_overlay_window_1.overlayWindow.hide();
                        if ((_a = global.overlay) === null || _a === void 0 ? void 0 : _a.closable) {
                            electron_overlay_window_1.overlayWindow.stop();
                            (_b = global.overlay) === null || _b === void 0 ? void 0 : _b.close();
                            global.overlay = null;
                        }
                    }
                }
                catch (exception) {
                    (_c = global.overlay) === null || _c === void 0 ? void 0 : _c.hide();
                    (_d = global.overlay) === null || _d === void 0 ? void 0 : _d.close();
                }
            }, 1000);
            return [2 /*return*/];
        });
    }); });
    electron_1.ipcMain.on('setAlwaysOnTop', function (_event, enable) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("SETALWAYSONTOP?");
            if (global.mainWindow) {
                console.log("SETALWAYSONTOP?1");
                global.mainWindow.setAlwaysOnTop(enable, 'screen-saver');
            }
            return [2 /*return*/];
        });
    }); });
}
