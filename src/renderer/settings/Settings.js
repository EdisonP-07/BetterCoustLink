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
var react_1 = require("react");
var contexts_1 = require("../contexts");
var MicrophoneSoundBar_1 = require("./MicrophoneSoundBar");
var TestSpeakersButton_1 = require("./TestSpeakersButton");
var makeStyles_1 = require("@mui/styles/makeStyles");
var withStyles_1 = require("@mui/styles/withStyles");
var material_1 = require("@mui/material");
var material_2 = require("@mui/material");
var material_3 = require("@mui/material");
var ArrowBack_1 = require("@mui/icons-material/ArrowBack");
var Alert_1 = require("@mui/material/Alert");
var AmongUsState_1 = require("../../common/AmongUsState");
var electron_1 = require("electron");
var ipc_messages_1 = require("../../common/ipc-messages");
var i18next_1 = require("i18next");
var languages_1 = require("../language/languages");
var ServerURLInput_1 = require("./ServerURLInput");
var Divider_1 = require("@mui/material/Divider");
var PublicLobbySettings_1 = require("./PublicLobbySettings");
var SettingsStore_1 = require("./SettingsStore");
var Divider = (0, withStyles_1["default"])(function (theme) { return ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}); })(Divider_1["default"]);
var useStyles = (0, makeStyles_1["default"])(function (theme) { return ({
    root: {
        width: '100vw',
        height: "calc(100vh - ".concat(theme.spacing(3), ")"),
        background: '#171717ad',
        backdropFilter: 'blur(4px)',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 99,
        alignItems: 'center',
        marginTop: theme.spacing(3),
        transition: 'transform .1s ease-in-out',
        WebkitAppRegion: 'no-drag',
        transform: function (_a) {
            var open = _a.open;
            return (open ? 'translateX(0)' : 'translateX(-100%)');
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    scroll: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        paddingBottom: theme.spacing(7),
        height: "calc(100vh - 40px - ".concat(theme.spacing(7 + 3 + 3), ")")
    },
    shortcutField: {
        marginTop: theme.spacing(1)
    },
    back: {
        cursor: 'pointer',
        position: 'absolute',
        right: theme.spacing(1),
        WebkitAppRegion: 'no-drag'
    },
    alert: {
        position: 'absolute',
        bottom: theme.spacing(1),
        zIndex: 10
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        '&>*': {
            marginBottom: theme.spacing(1)
        }
    },
    formLabel: {
        width: '100%',
        borderTop: '1px solid #313135',
        marginRight: '0px'
    }
}); });
var keys = new Set([
    'CapsLock',
    'Space',
    'Backspace',
    'Delete',
    'Enter',
    'Up',
    'Down',
    'Left',
    'Right',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'Escape',
    'LShift',
    'RShift',
    'RAlt',
    'LAlt',
    'RControl',
    'LControl',
]);
var DisabledTooltip = function (_a) {
    var disabled = _a.disabled, children = _a.children, title = _a.title;
    if (disabled)
        return (react_1["default"].createElement(material_2.Tooltip, { placement: "top", arrow: true, title: title },
            react_1["default"].createElement("span", null, children)));
    else
        return react_1["default"].createElement(react_1["default"].Fragment, null, children);
};
var Settings = function (_a) {
    var _this = this;
    var t = _a.t, open = _a.open, onClose = _a.onClose;
    var classes = useStyles({ open: open });
    var _b = (0, react_1.useContext)(contexts_1.SettingsContext), settings = _b[0], setSettings = _b[1], setLobbySettings = _b[2];
    var gameState = (0, react_1.useContext)(contexts_1.GameStateContext);
    var hostLobbySettings = (0, react_1.useContext)(contexts_1.HostSettingsContext)[0];
    var _c = (0, react_1.useState)(0), unsavedCount = _c[0], setUnsavedCount = _c[1];
    var unsaved = unsavedCount > 1;
    // Used to buffer changes that are only sent out on settings close
    var _d = (0, react_1.useState)(settings.localLobbySettings), localLobbySettingsBuffer = _d[0], setLocalLobbySettingsBuffer = _d[1];
    var updateLocalLobbySettingsBuffer = function (newValues) { return setLocalLobbySettingsBuffer(function (oldState) { return __assign(__assign({}, oldState), newValues); }); };
    (0, react_1.useEffect)(function () {
        setUnsavedCount(function (s) { return s + 1; });
    }, [
        settings.microphone,
        settings.speaker,
        settings.serverURL,
        settings.vadEnabled,
        settings.hardware_acceleration,
        settings.natFix,
        settings.noiseSuppression,
        settings.oldSampleDebug,
        settings.echoCancellation,
        settings.mobileHost,
        settings.microphoneGainEnabled,
        settings.micSensitivityEnabled,
    ]);
    (0, react_1.useEffect)(function () {
        electron_1.ipcRenderer.send('setAlwaysOnTop', settings.alwaysOnTop);
    }, [settings.alwaysOnTop]);
    (0, react_1.useEffect)(function () {
        electron_1.ipcRenderer.send('enableOverlay', settings.enableOverlay);
    }, [settings.enableOverlay]);
    var _e = (0, react_1.useState)([]), devices = _e[0], setDevices = _e[1];
    var _f = (0, react_1.useReducer)(function (state) { return state + 1; }, 0), _ = _f[0], updateDevices = _f[1];
    (0, react_1.useEffect)(function () {
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            return setDevices(devices.map(function (d) {
                var label = d.label;
                if (d.deviceId === 'default') {
                    label = t('buttons.default');
                }
                else {
                    var match = /.+?\([^(]+\)/.exec(d.label);
                    if (match && match[0])
                        label = match[0];
                }
                return {
                    id: d.deviceId,
                    kind: d.kind,
                    label: label
                };
            }));
        });
    }, [_]);
    var setShortcut = function (ev, shortcut) {
        var k = ev.key;
        if (k.length === 1)
            k = k.toUpperCase();
        else if (k.startsWith('Arrow'))
            k = k.substring(5);
        if (k === ' ')
            k = 'Space';
        /* @ts-ignore */
        var c = ev.code;
        if (c && c.startsWith('Numpad')) {
            k = c;
        }
        if (k === 'Control' || k === 'Alt' || k === 'Shift')
            k = (ev.location === 1 ? 'L' : 'R') + k;
        if (/^[0-9A-Z]$/.test(k) || /^F[0-9]{1,2}$/.test(k) || keys.has(k) || k.startsWith('Numpad')) {
            if (k === 'Escape') {
                console.log('disable??');
                k = 'Disabled';
            }
            setSettings(shortcut, k);
            electron_1.ipcRenderer.send(ipc_messages_1.IpcHandlerMessages.RESET_KEYHOOKS);
        }
    };
    var setMouseShortcut = function (ev, shortcut) {
        if (ev.button > 2) {
            // this makes our button start at 1 instead of 0
            // React Mouse event starts at 0, but IOHooks starts at 1
            var k = "MouseButton".concat(ev.button + 1);
            setSettings(shortcut, k);
            electron_1.ipcRenderer.send(ipc_messages_1.IpcHandlerMessages.RESET_KEYHOOKS);
        }
    };
    var resetDefaults = function () {
        SettingsStore_1["default"].clear();
        // This is necessary for resetting hotkeys properly, the main thread needs to be notified to reset the hooks
        electron_1.ipcRenderer.send(ipc_messages_1.IpcHandlerMessages.RESET_KEYHOOKS);
        location.reload();
    };
    var microphones = devices.filter(function (d) { return d.kind === 'audioinput'; });
    var speakers = devices.filter(function (d) { return d.kind === 'audiooutput'; });
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var locale, lang;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(settings.language);
                        if (!(settings.language === 'unkown')) return [3 /*break*/, 2];
                        return [4 /*yield*/, electron_1.ipcRenderer.invoke("getlocale")];
                    case 1:
                        locale = _a.sent();
                        lang = Object.keys(languages_1["default"]).includes(locale)
                            ? locale
                            : Object.keys(languages_1["default"]).includes(locale.split('-')[0])
                                ? locale.split('-')[0]
                                : undefined;
                        if (lang) {
                            settings.language = lang;
                            setSettings('language', settings.language);
                        }
                        _a.label = 2;
                    case 2:
                        i18next_1["default"].changeLanguage(settings.language);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [settings.language]);
    var isInMenuOrLobby = (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === AmongUsState_1.GameState.LOBBY || (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === AmongUsState_1.GameState.MENU;
    var canChangeLobbySettings = (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === AmongUsState_1.GameState.MENU || ((gameState === null || gameState === void 0 ? void 0 : gameState.isHost) && (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === AmongUsState_1.GameState.LOBBY);
    var canResetSettings = (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === undefined ||
        !(gameState === null || gameState === void 0 ? void 0 : gameState.isHost) ||
        gameState.gameState === AmongUsState_1.GameState.MENU ||
        gameState.gameState === AmongUsState_1.GameState.LOBBY;
    var _g = react_1["default"].useState({ open: false }), warningDialog = _g[0], setWarningDialog = _g[1];
    var handleWarningDialogClose = function (confirm) {
        if (confirm && warningDialog.confirmCallback) {
            warningDialog.confirmCallback();
        }
        setWarningDialog({ open: false });
    };
    var openWarningDialog = function (dialogTitle, dialogDescription, confirmCallback, showDialog) {
        if (!showDialog) {
            if (confirmCallback)
                confirmCallback();
        }
        else {
            setWarningDialog({ title: dialogTitle, description: dialogDescription, open: true, confirmCallback: confirmCallback });
        }
    };
    var URLInputCallback = (0, react_1.useCallback)(function (url) {
        setSettings('serverURL', url);
    }, []);
    var SavePublicLobbyCallback = (0, react_1.useCallback)(function (setting, newValue) {
        // We want lobby browser related settings to save on Submit button click
        setLobbySettings(setting, newValue);
        var newSetting = {};
        newSetting[setting] = newValue;
        updateLocalLobbySettingsBuffer(newSetting);
    }, []);
    if (!open) {
        return react_1["default"].createElement(react_1["default"].Fragment, null);
    }
    return (react_1["default"].createElement(material_1.Box, { className: classes.root },
        react_1["default"].createElement("div", { className: classes.header },
            react_1["default"].createElement(material_1.IconButton, { className: classes.back, size: "small", onClick: function () {
                    setSettings('localLobbySettings', localLobbySettingsBuffer);
                    if (unsaved) {
                        onClose();
                        location.reload();
                    }
                    else
                        onClose();
                } },
                react_1["default"].createElement(ArrowBack_1["default"], { htmlColor: "#777" })),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.title'))),
        react_1["default"].createElement("div", { className: classes.scroll },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_3.Dialog, { open: warningDialog.open, onClose: handleWarningDialogClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                    react_1["default"].createElement(material_2.DialogTitle, { id: "alert-dialog-title" }, warningDialog.title),
                    react_1["default"].createElement(material_2.DialogContent, null,
                        react_1["default"].createElement(material_2.DialogContentText, { id: "alert-dialog-description" }, warningDialog.description)),
                    react_1["default"].createElement(material_2.DialogActions, null,
                        react_1["default"].createElement(material_1.Button, { onClick: function () { return handleWarningDialogClose(true); }, color: "primary" }, t('buttons.confirm')),
                        react_1["default"].createElement(material_1.Button, { onClick: function () { return handleWarningDialogClose(false); }, color: "primary", autoFocus: true }, t('buttons.cancel'))))),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.lobbysettings.title')),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_1.Typography, { id: "input-slider", gutterBottom: true },
                    (canChangeLobbySettings ? localLobbySettingsBuffer.visionHearing : hostLobbySettings.visionHearing)
                        ? t('settings.lobbysettings.voicedistance_impostor')
                        : t('settings.lobbysettings.voicedistance'),
                    ": ",
                    canChangeLobbySettings ? localLobbySettingsBuffer.maxDistance.toFixed(1) : hostLobbySettings.maxDistance.toFixed(1)),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_2.Slider, { size: "small", disabled: !canChangeLobbySettings, value: canChangeLobbySettings ? localLobbySettingsBuffer.maxDistance : hostLobbySettings.maxDistance, min: 1, max: 10, step: 0.1, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ maxDistance: newValue }); } }))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.public_lobby.enabled'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) {
                            openWarningDialog(t('settings.warning'), t('settings.lobbysettings.public_lobby.enable_warning'), function () { updateLocalLobbySettingsBuffer({ publicLobby_on: newValue }); }, !localLobbySettingsBuffer.publicLobby_on);
                        }, value: canChangeLobbySettings ? localLobbySettingsBuffer.publicLobby_on : hostLobbySettings.publicLobby_on, checked: canChangeLobbySettings ? localLobbySettingsBuffer.publicLobby_on : hostLobbySettings.publicLobby_on, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(PublicLobbySettings_1["default"], { t: t, updateSetting: SavePublicLobbyCallback, lobbySettings: canChangeLobbySettings ? localLobbySettingsBuffer : hostLobbySettings, canChange: canChangeLobbySettings, className: classes.dialog })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.wallsblockaudio'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ wallsBlockAudio: newValue }); }, value: canChangeLobbySettings ? localLobbySettingsBuffer.wallsBlockAudio : hostLobbySettings.wallsBlockAudio, checked: canChangeLobbySettings ? localLobbySettingsBuffer.wallsBlockAudio : hostLobbySettings.wallsBlockAudio, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.visiononly'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ visionHearing: newValue }); }, value: canChangeLobbySettings ? localLobbySettingsBuffer.visionHearing : hostLobbySettings.visionHearing, checked: canChangeLobbySettings ? localLobbySettingsBuffer.visionHearing : hostLobbySettings.visionHearing, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.impostorshearsghost'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ haunting: newValue }); }, value: canChangeLobbySettings ? localLobbySettingsBuffer.haunting : hostLobbySettings.haunting, checked: canChangeLobbySettings ? localLobbySettingsBuffer.haunting : hostLobbySettings.haunting, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.hear_imposters_invents'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ hearImpostorsInVents: newValue }); }, value: canChangeLobbySettings ? localLobbySettingsBuffer.hearImpostorsInVents : hostLobbySettings.hearImpostorsInVents, checked: canChangeLobbySettings ? localLobbySettingsBuffer.hearImpostorsInVents : hostLobbySettings.hearImpostorsInVents, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.private_talk_invents'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ impostersHearImpostersInvent: newValue }); }, value: canChangeLobbySettings
                            ? localLobbySettingsBuffer.impostersHearImpostersInvent
                            : hostLobbySettings.impostersHearImpostersInvent, checked: canChangeLobbySettings
                            ? localLobbySettingsBuffer.impostersHearImpostersInvent
                            : hostLobbySettings.impostersHearImpostersInvent, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.comms_sabotage_audio'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ commsSabotage: newValue }); }, value: canChangeLobbySettings ? localLobbySettingsBuffer.commsSabotage : hostLobbySettings.commsSabotage, checked: canChangeLobbySettings ? localLobbySettingsBuffer.commsSabotage : hostLobbySettings.commsSabotage, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.hear_through_cameras'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ hearThroughCameras: newValue }); }, value: canChangeLobbySettings ? localLobbySettingsBuffer.hearThroughCameras : hostLobbySettings.hearThroughCameras, checked: canChangeLobbySettings ? localLobbySettingsBuffer.hearThroughCameras : hostLobbySettings.hearThroughCameras, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.impostor_radio'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) { return updateLocalLobbySettingsBuffer({ impostorRadioEnabled: newValue }); }, value: canChangeLobbySettings ? localLobbySettingsBuffer.impostorRadioEnabled : hostLobbySettings.impostorRadioEnabled, checked: canChangeLobbySettings ? localLobbySettingsBuffer.impostorRadioEnabled : hostLobbySettings.impostorRadioEnabled, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.ghost_only'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) {
                            console.log('new vlaue of setting: ', newValue);
                            openWarningDialog(t('settings.warning'), t('settings.lobbysettings.ghost_only_warning'), function () { return updateLocalLobbySettingsBuffer({ meetingGhostOnly: false, deadOnly: newValue }); }, newValue);
                        }, value: canChangeLobbySettings ? localLobbySettingsBuffer.deadOnly : hostLobbySettings.deadOnly, checked: canChangeLobbySettings ? localLobbySettingsBuffer.deadOnly : hostLobbySettings.deadOnly, control: react_1["default"].createElement(material_1.Checkbox, null) })),
                react_1["default"].createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.meetings_only'), disabled: !canChangeLobbySettings, onChange: function (_, newValue) {
                            console.log('new vlaue of setting: ', newValue);
                            openWarningDialog(t('settings.warning'), t('settings.lobbysettings.meetings_only_warning'), function () { return updateLocalLobbySettingsBuffer({ meetingGhostOnly: newValue, deadOnly: false }); }, newValue);
                        }, value: canChangeLobbySettings ? localLobbySettingsBuffer.meetingGhostOnly : hostLobbySettings.meetingGhostOnly, checked: canChangeLobbySettings ? localLobbySettingsBuffer.meetingGhostOnly : hostLobbySettings.meetingGhostOnly, control: react_1["default"].createElement(material_1.Checkbox, null) }))),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.audio.title')),
            react_1["default"].createElement(material_3.TextField, { select: true, label: t('settings.audio.microphone'), variant: "outlined", color: "secondary", value: settings.microphone, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: function (ev) { return setSettings('microphone', ev.target.value); }, onClick: updateDevices }, microphones.map(function (d) { return (react_1["default"].createElement("option", { key: d.id, value: d.id }, d.label)); })),
            open && react_1["default"].createElement(MicrophoneSoundBar_1["default"], { microphone: settings.microphone }),
            react_1["default"].createElement(material_3.TextField, { select: true, label: t('settings.audio.speaker'), variant: "outlined", color: "secondary", value: settings.speaker, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: function (ev) { return setSettings('speaker', ev.target.value); }, onClick: updateDevices }, speakers.map(function (d) { return (react_1["default"].createElement("option", { key: d.id, value: d.id }, d.label)); })),
            open && react_1["default"].createElement(TestSpeakersButton_1["default"], { t: t, speaker: settings.speaker }),
            react_1["default"].createElement(material_1.RadioGroup, { value: settings.pushToTalkMode, onChange: function (ev) {
                    setSettings('pushToTalkMode', Number(ev.target.value));
                } },
                react_1["default"].createElement(material_1.FormControlLabel, { label: t('settings.audio.voice_activity'), value: SettingsStore_1.pushToTalkOptions.VOICE, control: react_1["default"].createElement(material_1.Radio, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { label: t('settings.audio.push_to_talk'), value: SettingsStore_1.pushToTalkOptions.PUSH_TO_TALK, control: react_1["default"].createElement(material_1.Radio, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { label: t('settings.audio.push_to_mute'), value: SettingsStore_1.pushToTalkOptions.PUSH_TO_MUTE, control: react_1["default"].createElement(material_1.Radio, null) })),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_1.Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.microphone_volume')),
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 2 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 3 },
                        react_1["default"].createElement(material_1.Checkbox, { checked: settings.microphoneGainEnabled, onChange: function (_, checked) { return setSettings('microphoneGainEnabled', checked); } })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 8, style: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        } },
                        react_1["default"].createElement(material_2.Slider, { size: "small", disabled: !settings.microphoneGainEnabled, value: settings.microphoneGain, valueLabelDisplay: "auto", min: 0, max: 300, step: 2, onChange: function (_, newValue) { return setSettings('microphoneGain', newValue); }, "aria-labelledby": "input-slider" }))),
                react_1["default"].createElement(material_1.Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.microphone_sens')),
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 2 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 3 },
                        react_1["default"].createElement(material_1.Checkbox, { checked: settings.micSensitivityEnabled, onChange: function (_, checked) { return setSettings('micSensitivityEnabled', checked); } })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 8, style: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        } },
                        react_1["default"].createElement(material_2.Slider, { size: "small", disabled: !settings.micSensitivityEnabled, value: +(1 - settings.micSensitivity).toFixed(2), valueLabelDisplay: "auto", min: 0, max: 1, color: settings.micSensitivity < 0.3 ? 'primary' : 'secondary', step: 0.05, onChange: function (_, newValue) {
                                openWarningDialog(t('settings.warning'), t('settings.audio.microphone_sens_warning'), function () { return setSettings('micSensitivity', 1 - newValue); }, newValue == 0.7 && settings.micSensitivity < 0.3);
                            }, "aria-labelledby": "input-slider" }))),
                react_1["default"].createElement(Divider, null),
                react_1["default"].createElement(material_1.Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.mastervolume')),
                react_1["default"].createElement(material_1.Grid, { container: true, direction: "row", justifyContent: "center", alignItems: "center" },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 11 },
                        react_1["default"].createElement(material_2.Slider, { size: "small", value: settings.masterVolume, valueLabelDisplay: "auto", max: 200, onChange: function (_, newValue) { return setSettings('masterVolume', newValue); }, "aria-labelledby": "input-slider" }))),
                react_1["default"].createElement(material_1.Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.crewvolume')),
                react_1["default"].createElement(material_1.Grid, { container: true, direction: "row", justifyContent: "center", alignItems: "center" },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 11 },
                        react_1["default"].createElement(material_2.Slider, { size: "small", value: settings.crewVolumeAsGhost, valueLabelDisplay: "auto", onChange: function (_, newValue) { return setSettings('crewVolumeAsGhost', newValue); }, "aria-labelledby": "input-slider" }))),
                react_1["default"].createElement(material_1.Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.ghostvolumeasimpostor')),
                react_1["default"].createElement(material_1.Grid, { container: true, direction: "row", justifyContent: "center", alignItems: "center" },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 11 },
                        react_1["default"].createElement(material_2.Slider, { size: "small", value: settings.ghostVolumeAsImpostor, valueLabelDisplay: "auto", onChange: function (_, newValue) { return setSettings('ghostVolumeAsImpostor', newValue); }, "aria-labelledby": "input-slider" })))),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.keyboard.title')),
            react_1["default"].createElement(material_1.Grid, { container: true, spacing: 1 },
                react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                    react_1["default"].createElement(material_3.TextField, { fullWidth: true, spellCheck: false, color: "secondary", label: t('settings.keyboard.push_to_talk'), value: settings.pushToTalkShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: function (ev) {
                            setShortcut(ev, 'pushToTalkShortcut');
                        }, onMouseDown: function (ev) {
                            setMouseShortcut(ev, 'pushToTalkShortcut');
                        } })),
                react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                    react_1["default"].createElement(material_3.TextField, { spellCheck: false, color: "secondary", label: t('settings.keyboard.impostor_radio'), value: settings.impostorRadioShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: function (ev) {
                            setShortcut(ev, 'impostorRadioShortcut');
                        }, onMouseDown: function (ev) {
                            setMouseShortcut(ev, 'impostorRadioShortcut');
                        } })),
                react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                    react_1["default"].createElement(material_3.TextField, { spellCheck: false, color: "secondary", label: t('settings.keyboard.mute'), value: settings.muteShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: function (ev) {
                            setShortcut(ev, 'muteShortcut');
                        }, onMouseDown: function (ev) {
                            setMouseShortcut(ev, 'muteShortcut');
                        } })),
                react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                    react_1["default"].createElement(material_3.TextField, { spellCheck: false, color: "secondary", label: t('settings.keyboard.deafen'), value: settings.deafenShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: function (ev) {
                            setShortcut(ev, 'deafenShortcut');
                        }, onMouseDown: function (ev) {
                            setMouseShortcut(ev, 'deafenShortcut');
                        } }))),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.overlay.title')),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.always_on_top'), checked: settings.alwaysOnTop, onChange: function (_, checked) { return setSettings('alwaysOnTop', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.enabled'), checked: settings.enableOverlay, onChange: function (_, checked) { return setSettings('enableOverlay', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                settings.enableOverlay && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.compact'), checked: settings.compactOverlay, onChange: function (_, checked) { return setSettings('compactOverlay', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                    react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.meeting'), checked: settings.meetingOverlay, onChange: function (_, checked) { return setSettings('meetingOverlay', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                    react_1["default"].createElement(material_3.TextField, { fullWidth: true, select: true, label: t('settings.overlay.pos'), variant: "outlined", color: "secondary", value: settings.overlayPosition, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: function (ev) { return setSettings('overlayPosition', ev.target.value); }, onClick: updateDevices },
                        react_1["default"].createElement("option", { value: "hidden" }, t('settings.overlay.locations.hidden')),
                        react_1["default"].createElement("option", { value: "top" }, t('settings.overlay.locations.top')),
                        react_1["default"].createElement("option", { value: "bottom_left" }, t('settings.overlay.locations.bottom')),
                        react_1["default"].createElement("option", { value: "right" }, t('settings.overlay.locations.right')),
                        react_1["default"].createElement("option", { value: "right1" }, t('settings.overlay.locations.right1')),
                        react_1["default"].createElement("option", { value: "left" }, t('settings.overlay.locations.left')),
                        react_1["default"].createElement("option", { value: "left1" }, t('settings.overlay.locations.left1')))))),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.advanced.title')),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_1.FormControlLabel, { label: t('settings.advanced.nat_fix'), checked: settings.natFix, onChange: function (_, checked) {
                        openWarningDialog(t('settings.warning'), t('settings.advanced.nat_fix_warning'), function () { return setSettings('natFix', checked); }, checked);
                    }, control: react_1["default"].createElement(material_1.Checkbox, null) })),
            react_1["default"].createElement(ServerURLInput_1["default"], { t: t, initialURL: settings.serverURL, onValidURL: URLInputCallback, className: classes.dialog }),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.beta.title')),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.beta.mobilehost'), checked: settings.mobileHost, onChange: function (_, checked) { return setSettings('mobileHost', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.beta.vad_enabled'), checked: settings.vadEnabled, onChange: function (_, checked) {
                        openWarningDialog(t('settings.warning'), t('settings.beta.vad_enabled_warning'), function () { return setSettings('vadEnabled', checked); }, !checked);
                    }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.beta.hardware_acceleration'), checked: settings.hardware_acceleration, onChange: function (_, checked) {
                        openWarningDialog(t('settings.warning'), t('settings.beta.hardware_acceleration_warning'), function () {
                            setSettings('hardware_acceleration', checked);
                            electron_1.ipcRenderer.send("relaunch");
                        }, !checked);
                    }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.beta.echocancellation'), checked: settings.echoCancellation, onChange: function (_, checked) { return setSettings('echoCancellation', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.beta.spatial_audio'), checked: settings.enableSpatialAudio, onChange: function (_, checked) { return setSettings('enableSpatialAudio', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.beta.noiseSuppression'), checked: settings.noiseSuppression, onChange: function (_, checked) { return setSettings('noiseSuppression', checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.beta.oldsampledebug'), checked: settings.oldSampleDebug, onChange: function (_, checked) {
                        openWarningDialog(t('settings.warning'), t('settings.beta.oldsampledebug_warning'), function () {
                            setSettings('oldSampleDebug', checked);
                        }, checked);
                    }, control: react_1["default"].createElement(material_1.Checkbox, null) })),
            react_1["default"].createElement(material_3.TextField, { fullWidth: true, select: true, label: t('settings.language'), variant: "outlined", color: "secondary", value: settings.language, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: function (ev) { return setSettings('language', ev.target.value); } }, Object.entries(languages_1["default"]).map(function (_a) {
                var key = _a[0], value = _a[1];
                return (react_1["default"].createElement("option", { key: key, value: key }, value.name));
            })),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.streaming.title')),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.streaming.hidecode'), checked: !settings.hideCode, onChange: function (_, checked) { return setSettings('hideCode', !checked); }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                react_1["default"].createElement(material_1.FormControlLabel, { className: classes.formLabel, label: t('settings.streaming.obs_overlay'), checked: settings.obsOverlay, onChange: function (_, checked) {
                        setSettings('obsOverlay', checked);
                        if (!settings.obsSecret) {
                            setSettings('obsSecret', Math.random().toString(36).substr(2, 9).toUpperCase());
                        }
                    }, control: react_1["default"].createElement(material_1.Checkbox, null) }),
                settings.obsOverlay && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(material_3.TextField, { fullWidth: true, spellCheck: false, label: t('settings.streaming.obs_url'), value: "".concat(settings.serverURL.includes('https') ? 'https' : 'http', "://obs.bettercrewlink.app/?compact=").concat(settings.compactOverlay ? '1' : '0', "&position=").concat(settings.overlayPosition, "&meeting=").concat(settings.meetingOverlay ? '1' : '0', "&secret=").concat(settings.obsSecret, "&server=").concat(settings.serverURL), variant: "outlined", color: "primary", InputProps: {
                            readOnly: true
                        } })))),
            react_1["default"].createElement(Divider, null),
            react_1["default"].createElement(material_1.Typography, { variant: "h6" }, t('settings.troubleshooting.title')),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(DisabledTooltip, { disabled: !canResetSettings, title: t('settings.troubleshooting.warning') },
                    react_1["default"].createElement(material_1.Button, { disabled: !canResetSettings, variant: "contained", color: "secondary", onClick: function () {
                            return openWarningDialog(t('settings.warning'), t('settings.troubleshooting.restore_warning'), function () { return resetDefaults(); }, true);
                        } }, t('settings.troubleshooting.restore')))),
            react_1["default"].createElement(Alert_1["default"], { className: classes.alert, severity: "info", style: { display: unsaved ? undefined : 'none' } }, t('buttons.exit')))));
};
exports["default"] = Settings;
