"use strict";
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
exports.__esModule = true;
var react_1 = require("react");
var Voice_1 = require("./Voice");
var Menu_1 = require("./Menu");
var electron_1 = require("electron");
var Settings_1 = require("./settings/Settings");
var SettingsStore_1 = require("./settings/SettingsStore");
var contexts_1 = require("./contexts");
var styles_1 = require("@mui/material/styles");
var makeStyles_1 = require("@mui/styles/makeStyles");
var ipc_messages_1 = require("../common/ipc-messages");
var theme_1 = require("./theme");
var Settings_2 = require("@mui/icons-material/Settings");
var RefreshSharp_1 = require("@mui/icons-material/RefreshSharp");
var Close_1 = require("@mui/icons-material/Close");
var IconButton_1 = require("@mui/material/IconButton");
var Dialog_1 = require("@mui/material/Dialog");
var LinearProgress_1 = require("@mui/material/LinearProgress");
var DialogTitle_1 = require("@mui/material/DialogTitle");
var DialogContent_1 = require("@mui/material/DialogContent");
var DialogContentText_1 = require("@mui/material/DialogContentText");
var DialogActions_1 = require("@mui/material/DialogActions");
var Button_1 = require("@mui/material/Button");
var pretty_bytes_1 = require("pretty-bytes");
var ipc_messages_2 = require("../common/ipc-messages");
var react_dom_1 = require("react-dom");
require("./css/index.css");
require("source-code-pro/source-code-pro.css");
require("typeface-varela/index.css");
var avatarGenerator_1 = require("../main/avatarGenerator");
require("./language/i18n");
var react_i18next_1 = require("react-i18next");
var appVersion = '';
if (typeof window !== 'undefined' && window.location) {
    var query = new URLSearchParams(window.location.search.substring(1));
    appVersion = ' v' + query.get('version') || '';
}
var useStyles = (0, makeStyles_1["default"])(function () { return ({
    root: {
        position: 'absolute',
        width: '100vw',
        height: theme_1["default"].spacing(3),
        backgroundColor: '#1d1a23',
        top: 0,
        WebkitAppRegion: 'drag',
        zIndex: 100
    },
    title: {
        width: '100%',
        textAlign: 'center',
        display: 'block',
        height: theme_1["default"].spacing(3),
        lineHeight: theme_1["default"].spacing(3),
        color: theme_1["default"].palette.primary.main
    },
    button: {
        WebkitAppRegion: 'no-drag',
        marginLeft: 'auto',
        padding: 0,
        position: 'absolute',
        top: 0
    }
}); });
var RawTitleBar = function (_a) {
    var settingsOpen = _a.settingsOpen, setSettingsOpen = _a.setSettingsOpen;
    var classes = useStyles();
    return (react_1["default"].createElement("div", { className: classes.root },
        react_1["default"].createElement("span", { className: classes.title, style: { marginLeft: 10 } },
            "BetterCrewLink",
            appVersion),
        react_1["default"].createElement(IconButton_1["default"], { className: classes.button, style: { left: 0 }, size: "small", onClick: function () { return setSettingsOpen(!settingsOpen); } },
            react_1["default"].createElement(Settings_2["default"], { htmlColor: "#777" })),
        react_1["default"].createElement(IconButton_1["default"], { className: classes.button, style: { left: 22 }, size: "small", onClick: function () { return electron_1.ipcRenderer.send('reload'); } },
            react_1["default"].createElement(RefreshSharp_1["default"], { htmlColor: "#777" })),
        react_1["default"].createElement(IconButton_1["default"], { className: classes.button, style: { right: 0 }, size: "small", onClick: function () { return electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.QUIT_CREWLINK); } },
            react_1["default"].createElement(Close_1["default"], { htmlColor: "#777" }))));
};
var TitleBar = react_1["default"].memo(RawTitleBar);
var AppState;
(function (AppState) {
    AppState[AppState["MENU"] = 0] = "MENU";
    AppState[AppState["VOICE"] = 1] = "VOICE";
})(AppState || (AppState = {}));
// @ts-ignore
function App(_a) {
    var t = _a.t;
    var _b = (0, react_1.useState)(AppState.MENU), state = _b[0], setState = _b[1];
    var _c = (0, react_1.useState)({}), gameState = _c[0], setGameState = _c[1];
    var _d = (0, react_1.useState)(false), settingsOpen = _d[0], setSettingsOpen = _d[1];
    var _e = (0, react_1.useState)(true), diaOpen = _e[0], setDiaOpen = _e[1];
    var _f = (0, react_1.useState)(''), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)({
        state: 'unavailable'
    }), updaterState = _g[0], setUpdaterState = _g[1];
    var playerColors = (0, react_1.useRef)(avatarGenerator_1.DEFAULT_PLAYERCOLORS);
    var overlayInitCount = (0, react_1.useRef)(0);
    var _h = (0, react_1.useState)(SettingsStore_1["default"].store), settings = _h[0], setSettings = _h[1];
    var _j = (0, react_1.useState)(settings.localLobbySettings), hostLobbySettings = _j[0], setHostLobbySettings = _j[1];
    (0, react_1.useEffect)(function () {
        SettingsStore_1["default"].onDidAnyChange(function (newValue, _) { setSettings(newValue); });
    }, []);
    (0, react_1.useEffect)(function () {
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_2.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, playerColors.current);
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_2.IpcOverlayMessages.NOTIFY_SETTINGS_CHANGED, SettingsStore_1["default"].store);
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_2.IpcOverlayMessages.NOTIFY_GAME_STATE_CHANGED, gameState);
    }, [overlayInitCount.current]);
    (0, react_1.useEffect)(function () {
        var onOpen = function (_, isOpen) {
            setState(isOpen ? AppState.VOICE : AppState.MENU);
        };
        var onState = function (_, newState) {
            setGameState(newState);
        };
        var onError = function (_, error) {
            shouldInit = false;
            setError(error);
        };
        var onAutoUpdaterStateChange = function (_, state) {
            setUpdaterState(function (old) { return (__assign(__assign({}, old), state)); });
        };
        var onColorsChange = function (_, colors) {
            console.log('RECIEVED COLORS');
            playerColors.current = colors;
            electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_2.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, colors);
        };
        var onOverlayInit = function () {
            overlayInitCount.current++;
        };
        var shouldInit = true;
        electron_1.ipcRenderer
            .invoke(ipc_messages_1.IpcHandlerMessages.START_HOOK)
            .then(function () {
            if (shouldInit) {
                setGameState(electron_1.ipcRenderer.sendSync(ipc_messages_1.IpcSyncMessages.GET_INITIAL_STATE));
            }
        })["catch"](function (error) {
            if (shouldInit) {
                shouldInit = false;
                setError(error.message);
            }
        });
        electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.AUTO_UPDATER_STATE, onAutoUpdaterStateChange);
        electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.NOTIFY_GAME_OPENED, onOpen);
        electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.NOTIFY_GAME_STATE_CHANGED, onState);
        electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.ERROR, onError);
        electron_1.ipcRenderer.on(ipc_messages_2.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, onColorsChange);
        electron_1.ipcRenderer.on(ipc_messages_2.IpcOverlayMessages.REQUEST_INITVALUES, onOverlayInit);
        return function () {
            electron_1.ipcRenderer.off(ipc_messages_1.IpcRendererMessages.AUTO_UPDATER_STATE, onAutoUpdaterStateChange);
            electron_1.ipcRenderer.off(ipc_messages_1.IpcRendererMessages.NOTIFY_GAME_OPENED, onOpen);
            electron_1.ipcRenderer.off(ipc_messages_1.IpcRendererMessages.NOTIFY_GAME_STATE_CHANGED, onState);
            electron_1.ipcRenderer.off(ipc_messages_1.IpcRendererMessages.ERROR, onError);
            electron_1.ipcRenderer.off(ipc_messages_2.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, onColorsChange);
            shouldInit = false;
        };
    }, []);
    (0, react_1.useEffect)(function () {
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_2.IpcOverlayMessages.NOTIFY_GAME_STATE_CHANGED, gameState);
    }, [gameState]);
    (0, react_1.useEffect)(function () {
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_2.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, playerColors.current);
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_2.IpcOverlayMessages.NOTIFY_SETTINGS_CHANGED, SettingsStore_1["default"].store);
    }, [settings]);
    var page;
    switch (state) {
        case AppState.MENU:
            page = react_1["default"].createElement(Menu_1["default"], { t: t, error: error });
            break;
        case AppState.VOICE:
            page = react_1["default"].createElement(Voice_1["default"], { t: t, error: error });
            break;
    }
    return (react_1["default"].createElement(contexts_1.PlayerColorContext.Provider, { value: playerColors.current },
        react_1["default"].createElement(contexts_1.GameStateContext.Provider, { value: gameState },
            react_1["default"].createElement(contexts_1.HostSettingsContext.Provider, { value: [hostLobbySettings, setHostLobbySettings] },
                react_1["default"].createElement(contexts_1.SettingsContext.Provider, { value: [settings, SettingsStore_1.setSetting, SettingsStore_1.setLobbySetting] },
                    react_1["default"].createElement(styles_1.StyledEngineProvider, { injectFirst: true },
                        react_1["default"].createElement(styles_1.ThemeProvider, { theme: theme_1["default"] },
                            react_1["default"].createElement(TitleBar, { settingsOpen: settingsOpen, setSettingsOpen: setSettingsOpen }),
                            react_1["default"].createElement(Settings_1["default"], { t: t, open: settingsOpen, onClose: function () { return setSettingsOpen(false); } }),
                            react_1["default"].createElement(Dialog_1["default"], { fullWidth: true, open: updaterState.state !== 'unavailable' && diaOpen },
                                updaterState.state === 'available' && updaterState.info && (react_1["default"].createElement(DialogTitle_1["default"], null,
                                    "Update v",
                                    updaterState.info.version)),
                                updaterState.state === 'error' && (react_1["default"].createElement(DialogTitle_1["default"], null, "Updater Error")),
                                updaterState.state === 'downloading' && react_1["default"].createElement(DialogTitle_1["default"], null, "Updating..."),
                                react_1["default"].createElement(DialogContent_1["default"], null,
                                    updaterState.state === 'downloading' && updaterState.progress && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                        react_1["default"].createElement(LinearProgress_1["default"], { variant: 'determinate', value: updaterState.progress.percent }),
                                        react_1["default"].createElement(DialogContentText_1["default"], null,
                                            (0, pretty_bytes_1["default"])(updaterState.progress.transferred),
                                            " / ",
                                            (0, pretty_bytes_1["default"])(updaterState.progress.total)))),
                                    updaterState.state === 'available' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                        react_1["default"].createElement(LinearProgress_1["default"], { variant: 'indeterminate' }),
                                        react_1["default"].createElement(DialogContentText_1["default"], null, "Update now or later?"))),
                                    updaterState.state === 'error' && (react_1["default"].createElement(DialogContentText_1["default"], { color: "error" }, String(updaterState.error)))),
                                updaterState.state === 'error' && (react_1["default"].createElement(DialogActions_1["default"], null,
                                    react_1["default"].createElement(Button_1["default"], { color: "grey", onClick: function () {
                                            electron_1.shell.openExternal("https://github.com/OhMyGuus/BetterCrewLink/releases/latest");
                                        } }, "Download Manually"),
                                    react_1["default"].createElement(Button_1["default"], { color: "grey", onClick: function () {
                                            setDiaOpen(false);
                                        } }, "Skip"))),
                                updaterState.state === 'available' && (react_1["default"].createElement(DialogActions_1["default"], null,
                                    react_1["default"].createElement(Button_1["default"], { onClick: function () {
                                            electron_1.ipcRenderer.send('update-app');
                                        } }, "Now"),
                                    react_1["default"].createElement(Button_1["default"], { onClick: function () {
                                            setDiaOpen(false);
                                        } }, "Later")))),
                            page)))))));
}
exports["default"] = App;
// @ts-ignore
var App2 = (0, react_i18next_1.withNamespaces)()(App);
// @ts-ignore
react_dom_1["default"].render(react_1["default"].createElement(App2, null), document.getElementById('app'));
