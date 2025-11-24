import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { SettingsContext, GameStateContext, HostSettingsContext } from '../contexts';
import MicrophoneSoundBar from './MicrophoneSoundBar';
import TestSpeakersButton from './TestSpeakersButton';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { Grid, RadioGroup, Checkbox, FormControlLabel, Box, Typography, IconButton, Button, Radio, } from '@mui/material';
import { DialogContent, DialogContentText, DialogActions, DialogTitle, Slider, Tooltip } from '@mui/material';
import { Dialog, TextField } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import { GameState } from '../../common/AmongUsState';
import { ipcRenderer } from 'electron';
import { IpcHandlerMessages } from '../../common/ipc-messages';
import i18next from 'i18next';
import languages from '../language/languages';
import ServerURLInput from './ServerURLInput';
import MuiDivider from '@mui/material/Divider';
import PublicLobbySettings from './PublicLobbySettings';
import SettingsStore, { pushToTalkOptions } from './SettingsStore';
const Divider = withStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}))(MuiDivider);
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(3)})`,
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
        transform: ({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)'),
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
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
        height: `calc(100vh - 40px - ${theme.spacing(7 + 3 + 3)})`,
    },
    shortcutField: {
        marginTop: theme.spacing(1),
    },
    back: {
        cursor: 'pointer',
        position: 'absolute',
        right: theme.spacing(1),
        WebkitAppRegion: 'no-drag',
    },
    alert: {
        position: 'absolute',
        bottom: theme.spacing(1),
        zIndex: 10,
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        '&>*': {
            marginBottom: theme.spacing(1),
        },
    },
    formLabel: {
        width: '100%',
        borderTop: '1px solid #313135',
        marginRight: '0px',
        // paddingBottom:'5px'
    },
}));
const keys = new Set([
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
const DisabledTooltip = function ({ disabled, children, title }) {
    if (disabled)
        return (React.createElement(Tooltip, { placement: "top", arrow: true, title: title },
            React.createElement("span", null, children)));
    else
        return React.createElement(React.Fragment, null, children);
};
const Settings = function ({ t, open, onClose }) {
    const classes = useStyles({ open });
    const [settings, setSettings, setLobbySettings] = useContext(SettingsContext);
    const gameState = useContext(GameStateContext);
    const [hostLobbySettings] = useContext(HostSettingsContext);
    const [unsavedCount, setUnsavedCount] = useState(0);
    const unsaved = unsavedCount > 1;
    // Used to buffer changes that are only sent out on settings close
    const [localLobbySettingsBuffer, setLocalLobbySettingsBuffer] = useState(settings.localLobbySettings);
    const updateLocalLobbySettingsBuffer = (newValues) => setLocalLobbySettingsBuffer((oldState) => { return Object.assign(Object.assign({}, oldState), newValues); });
    useEffect(() => {
        setUnsavedCount((s) => s + 1);
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
    useEffect(() => {
        ipcRenderer.send('setAlwaysOnTop', settings.alwaysOnTop);
    }, [settings.alwaysOnTop]);
    useEffect(() => {
        ipcRenderer.send('enableOverlay', settings.enableOverlay);
    }, [settings.enableOverlay]);
    const [devices, setDevices] = useState([]);
    const [_, updateDevices] = useReducer((state) => state + 1, 0);
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => setDevices(devices.map((d) => {
            let label = d.label;
            if (d.deviceId === 'default') {
                label = t('buttons.default');
            }
            else {
                const match = /.+?\([^(]+\)/.exec(d.label);
                if (match && match[0])
                    label = match[0];
            }
            return {
                id: d.deviceId,
                kind: d.kind,
                label,
            };
        })));
    }, [_]);
    const setShortcut = (ev, shortcut) => {
        let k = ev.key;
        if (k.length === 1)
            k = k.toUpperCase();
        else if (k.startsWith('Arrow'))
            k = k.substring(5);
        if (k === ' ')
            k = 'Space';
        /* @ts-ignore */
        const c = ev.code;
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
            ipcRenderer.send(IpcHandlerMessages.RESET_KEYHOOKS);
        }
    };
    const setMouseShortcut = (ev, shortcut) => {
        if (ev.button > 2) {
            // this makes our button start at 1 instead of 0
            // React Mouse event starts at 0, but IOHooks starts at 1
            const k = `MouseButton${ev.button + 1}`;
            setSettings(shortcut, k);
            ipcRenderer.send(IpcHandlerMessages.RESET_KEYHOOKS);
        }
    };
    const resetDefaults = () => {
        SettingsStore.clear();
        // This is necessary for resetting hotkeys properly, the main thread needs to be notified to reset the hooks
        ipcRenderer.send(IpcHandlerMessages.RESET_KEYHOOKS);
        location.reload();
    };
    const microphones = devices.filter((d) => d.kind === 'audioinput');
    const speakers = devices.filter((d) => d.kind === 'audiooutput');
    useEffect(() => {
        (async () => {
            console.log(settings.language);
            if (settings.language === 'unkown') {
                const locale = await ipcRenderer.invoke("getlocale");
                const lang = Object.keys(languages).includes(locale)
                    ? locale
                    : Object.keys(languages).includes(locale.split('-')[0])
                        ? locale.split('-')[0]
                        : undefined;
                if (lang) {
                    settings.language = lang;
                    setSettings('language', settings.language);
                }
            }
            i18next.changeLanguage(settings.language);
        })();
    }, [settings.language]);
    const isInMenuOrLobby = (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === GameState.LOBBY || (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === GameState.MENU;
    const canChangeLobbySettings = (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === GameState.MENU || ((gameState === null || gameState === void 0 ? void 0 : gameState.isHost) && (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === GameState.LOBBY);
    const canResetSettings = (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) === undefined ||
        !(gameState === null || gameState === void 0 ? void 0 : gameState.isHost) ||
        gameState.gameState === GameState.MENU ||
        gameState.gameState === GameState.LOBBY;
    const [warningDialog, setWarningDialog] = React.useState({ open: false });
    const handleWarningDialogClose = (confirm) => {
        if (confirm && warningDialog.confirmCallback) {
            warningDialog.confirmCallback();
        }
        setWarningDialog({ open: false });
    };
    const openWarningDialog = (dialogTitle, dialogDescription, confirmCallback, showDialog) => {
        if (!showDialog) {
            if (confirmCallback)
                confirmCallback();
        }
        else {
            setWarningDialog({ title: dialogTitle, description: dialogDescription, open: true, confirmCallback });
        }
    };
    const URLInputCallback = useCallback((url) => {
        setSettings('serverURL', url);
    }, []);
    const SavePublicLobbyCallback = useCallback((setting, newValue) => {
        // We want lobby browser related settings to save on Submit button click
        setLobbySettings(setting, newValue);
        const newSetting = {};
        newSetting[setting] = newValue;
        updateLocalLobbySettingsBuffer(newSetting);
    }, []);
    if (!open) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(Box, { className: classes.root },
        React.createElement("div", { className: classes.header },
            React.createElement(IconButton, { className: classes.back, size: "small", onClick: () => {
                    setSettings('localLobbySettings', localLobbySettingsBuffer);
                    if (unsaved) {
                        onClose();
                        location.reload();
                    }
                    else
                        onClose();
                } },
                React.createElement(ChevronLeft, { htmlColor: "#777" })),
            React.createElement(Typography, { variant: "h6" }, t('settings.title'))),
        React.createElement("div", { className: classes.scroll },
            React.createElement("div", null,
                React.createElement(Dialog, { open: warningDialog.open, onClose: handleWarningDialogClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                    React.createElement(DialogTitle, { id: "alert-dialog-title" }, warningDialog.title),
                    React.createElement(DialogContent, null,
                        React.createElement(DialogContentText, { id: "alert-dialog-description" }, warningDialog.description)),
                    React.createElement(DialogActions, null,
                        React.createElement(Button, { onClick: () => handleWarningDialogClose(true), color: "primary" }, t('buttons.confirm')),
                        React.createElement(Button, { onClick: () => handleWarningDialogClose(false), color: "primary", autoFocus: true }, t('buttons.cancel'))))),
            React.createElement(Typography, { variant: "h6" }, t('settings.lobbysettings.title')),
            React.createElement("div", null,
                React.createElement(Typography, { id: "input-slider", gutterBottom: true },
                    (canChangeLobbySettings ? localLobbySettingsBuffer.visionHearing : hostLobbySettings.visionHearing)
                        ? t('settings.lobbysettings.voicedistance_impostor')
                        : t('settings.lobbysettings.voicedistance'),
                    ": ",
                    canChangeLobbySettings ? localLobbySettingsBuffer.maxDistance.toFixed(1) : hostLobbySettings.maxDistance.toFixed(1)),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(Slider, { size: "small", disabled: !canChangeLobbySettings, value: canChangeLobbySettings ? localLobbySettingsBuffer.maxDistance : hostLobbySettings.maxDistance, min: 1, max: 10, step: 0.1, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ maxDistance: newValue }) }))),
            React.createElement("div", null,
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.public_lobby.enabled'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => {
                            openWarningDialog(t('settings.warning'), t('settings.lobbysettings.public_lobby.enable_warning'), () => { updateLocalLobbySettingsBuffer({ publicLobby_on: newValue }); }, !localLobbySettingsBuffer.publicLobby_on);
                        }, value: canChangeLobbySettings ? localLobbySettingsBuffer.publicLobby_on : hostLobbySettings.publicLobby_on, checked: canChangeLobbySettings ? localLobbySettingsBuffer.publicLobby_on : hostLobbySettings.publicLobby_on, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(PublicLobbySettings, { t: t, updateSetting: SavePublicLobbyCallback, lobbySettings: canChangeLobbySettings ? localLobbySettingsBuffer : hostLobbySettings, canChange: canChangeLobbySettings, className: classes.dialog })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.wallsblockaudio'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ wallsBlockAudio: newValue }), value: canChangeLobbySettings ? localLobbySettingsBuffer.wallsBlockAudio : hostLobbySettings.wallsBlockAudio, checked: canChangeLobbySettings ? localLobbySettingsBuffer.wallsBlockAudio : hostLobbySettings.wallsBlockAudio, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.visiononly'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ visionHearing: newValue }), value: canChangeLobbySettings ? localLobbySettingsBuffer.visionHearing : hostLobbySettings.visionHearing, checked: canChangeLobbySettings ? localLobbySettingsBuffer.visionHearing : hostLobbySettings.visionHearing, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.impostorshearsghost'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ haunting: newValue }), value: canChangeLobbySettings ? localLobbySettingsBuffer.haunting : hostLobbySettings.haunting, checked: canChangeLobbySettings ? localLobbySettingsBuffer.haunting : hostLobbySettings.haunting, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.hear_imposters_invents'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ hearImpostorsInVents: newValue }), value: canChangeLobbySettings ? localLobbySettingsBuffer.hearImpostorsInVents : hostLobbySettings.hearImpostorsInVents, checked: canChangeLobbySettings ? localLobbySettingsBuffer.hearImpostorsInVents : hostLobbySettings.hearImpostorsInVents, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.private_talk_invents'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ impostersHearImpostersInvent: newValue }), value: canChangeLobbySettings
                            ? localLobbySettingsBuffer.impostersHearImpostersInvent
                            : hostLobbySettings.impostersHearImpostersInvent, checked: canChangeLobbySettings
                            ? localLobbySettingsBuffer.impostersHearImpostersInvent
                            : hostLobbySettings.impostersHearImpostersInvent, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.comms_sabotage_audio'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ commsSabotage: newValue }), value: canChangeLobbySettings ? localLobbySettingsBuffer.commsSabotage : hostLobbySettings.commsSabotage, checked: canChangeLobbySettings ? localLobbySettingsBuffer.commsSabotage : hostLobbySettings.commsSabotage, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.hear_through_cameras'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ hearThroughCameras: newValue }), value: canChangeLobbySettings ? localLobbySettingsBuffer.hearThroughCameras : hostLobbySettings.hearThroughCameras, checked: canChangeLobbySettings ? localLobbySettingsBuffer.hearThroughCameras : hostLobbySettings.hearThroughCameras, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.impostor_radio'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => updateLocalLobbySettingsBuffer({ impostorRadioEnabled: newValue }), value: canChangeLobbySettings ? localLobbySettingsBuffer.impostorRadioEnabled : hostLobbySettings.impostorRadioEnabled, checked: canChangeLobbySettings ? localLobbySettingsBuffer.impostorRadioEnabled : hostLobbySettings.impostorRadioEnabled, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.ghost_only'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => {
                            console.log('new vlaue of setting: ', newValue);
                            openWarningDialog(t('settings.warning'), t('settings.lobbysettings.ghost_only_warning'), () => updateLocalLobbySettingsBuffer({ meetingGhostOnly: false, deadOnly: newValue }), newValue);
                        }, value: canChangeLobbySettings ? localLobbySettingsBuffer.deadOnly : hostLobbySettings.deadOnly, checked: canChangeLobbySettings ? localLobbySettingsBuffer.deadOnly : hostLobbySettings.deadOnly, control: React.createElement(Checkbox, null) })),
                React.createElement(DisabledTooltip, { disabled: !canChangeLobbySettings, title: isInMenuOrLobby ? t('settings.lobbysettings.gamehostonly') : t('settings.lobbysettings.inlobbyonly') },
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.lobbysettings.meetings_only'), disabled: !canChangeLobbySettings, onChange: (_, newValue) => {
                            console.log('new vlaue of setting: ', newValue);
                            openWarningDialog(t('settings.warning'), t('settings.lobbysettings.meetings_only_warning'), () => updateLocalLobbySettingsBuffer({ meetingGhostOnly: newValue, deadOnly: false }), newValue);
                        }, value: canChangeLobbySettings ? localLobbySettingsBuffer.meetingGhostOnly : hostLobbySettings.meetingGhostOnly, checked: canChangeLobbySettings ? localLobbySettingsBuffer.meetingGhostOnly : hostLobbySettings.meetingGhostOnly, control: React.createElement(Checkbox, null) }))),
            React.createElement(Divider, null),
            React.createElement(Typography, { variant: "h6" }, t('settings.audio.title')),
            React.createElement(TextField, { select: true, label: t('settings.audio.microphone'), variant: "outlined", color: "secondary", value: settings.microphone, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: (ev) => setSettings('microphone', ev.target.value), onClick: updateDevices }, microphones.map((d) => (React.createElement("option", { key: d.id, value: d.id }, d.label)))),
            open && React.createElement(MicrophoneSoundBar, { microphone: settings.microphone }),
            React.createElement(TextField, { select: true, label: t('settings.audio.speaker'), variant: "outlined", color: "secondary", value: settings.speaker, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: (ev) => setSettings('speaker', ev.target.value), onClick: updateDevices }, speakers.map((d) => (React.createElement("option", { key: d.id, value: d.id }, d.label)))),
            open && React.createElement(TestSpeakersButton, { t: t, speaker: settings.speaker }),
            React.createElement(RadioGroup, { value: settings.pushToTalkMode, onChange: (ev) => {
                    setSettings('pushToTalkMode', Number(ev.target.value));
                } },
                React.createElement(FormControlLabel, { label: t('settings.audio.voice_activity'), value: pushToTalkOptions.VOICE, control: React.createElement(Radio, null) }),
                React.createElement(FormControlLabel, { label: t('settings.audio.push_to_talk'), value: pushToTalkOptions.PUSH_TO_TALK, control: React.createElement(Radio, null) }),
                React.createElement(FormControlLabel, { label: t('settings.audio.push_to_mute'), value: pushToTalkOptions.PUSH_TO_MUTE, control: React.createElement(Radio, null) })),
            React.createElement(Divider, null),
            React.createElement("div", null,
                React.createElement(Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.microphone_volume')),
                React.createElement(Grid, { container: true, spacing: 2 },
                    React.createElement(Grid, { item: true, xs: 3 },
                        React.createElement(Checkbox, { checked: settings.microphoneGainEnabled, onChange: (_, checked) => setSettings('microphoneGainEnabled', checked) })),
                    React.createElement(Grid, { item: true, xs: 8, style: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        } },
                        React.createElement(Slider, { size: "small", disabled: !settings.microphoneGainEnabled, value: settings.microphoneGain, valueLabelDisplay: "auto", min: 0, max: 300, step: 2, onChange: (_, newValue) => setSettings('microphoneGain', newValue), "aria-labelledby": "input-slider" }))),
                React.createElement(Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.microphone_sens')),
                React.createElement(Grid, { container: true, spacing: 2 },
                    React.createElement(Grid, { item: true, xs: 3 },
                        React.createElement(Checkbox, { checked: settings.micSensitivityEnabled, onChange: (_, checked) => setSettings('micSensitivityEnabled', checked) })),
                    React.createElement(Grid, { item: true, xs: 8, style: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        } },
                        React.createElement(Slider, { size: "small", disabled: !settings.micSensitivityEnabled, value: +(1 - settings.micSensitivity).toFixed(2), valueLabelDisplay: "auto", min: 0, max: 1, color: settings.micSensitivity < 0.3 ? 'primary' : 'secondary', step: 0.05, onChange: (_, newValue) => {
                                openWarningDialog(t('settings.warning'), t('settings.audio.microphone_sens_warning'), () => setSettings('micSensitivity', 1 - newValue), newValue == 0.7 && settings.micSensitivity < 0.3);
                            }, "aria-labelledby": "input-slider" }))),
                React.createElement(Divider, null),
                React.createElement(Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.mastervolume')),
                React.createElement(Grid, { container: true, direction: "row", justifyContent: "center", alignItems: "center" },
                    React.createElement(Grid, { item: true, xs: 11 },
                        React.createElement(Slider, { size: "small", value: settings.masterVolume, valueLabelDisplay: "auto", max: 200, onChange: (_, newValue) => setSettings('masterVolume', newValue), "aria-labelledby": "input-slider" }))),
                React.createElement(Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.crewvolume')),
                React.createElement(Grid, { container: true, direction: "row", justifyContent: "center", alignItems: "center" },
                    React.createElement(Grid, { item: true, xs: 11 },
                        React.createElement(Slider, { size: "small", value: settings.crewVolumeAsGhost, valueLabelDisplay: "auto", onChange: (_, newValue) => setSettings('crewVolumeAsGhost', newValue), "aria-labelledby": "input-slider" }))),
                React.createElement(Typography, { id: "input-slider", gutterBottom: true }, t('settings.audio.ghostvolumeasimpostor')),
                React.createElement(Grid, { container: true, direction: "row", justifyContent: "center", alignItems: "center" },
                    React.createElement(Grid, { item: true, xs: 11 },
                        React.createElement(Slider, { size: "small", value: settings.ghostVolumeAsImpostor, valueLabelDisplay: "auto", onChange: (_, newValue) => setSettings('ghostVolumeAsImpostor', newValue), "aria-labelledby": "input-slider" })))),
            React.createElement(Divider, null),
            React.createElement(Typography, { variant: "h6" }, t('settings.keyboard.title')),
            React.createElement(Grid, { container: true, spacing: 1 },
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement(TextField, { fullWidth: true, spellCheck: false, color: "secondary", label: t('settings.keyboard.push_to_talk'), value: settings.pushToTalkShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: (ev) => {
                            setShortcut(ev, 'pushToTalkShortcut');
                        }, onMouseDown: (ev) => {
                            setMouseShortcut(ev, 'pushToTalkShortcut');
                        } })),
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement(TextField, { spellCheck: false, color: "secondary", label: t('settings.keyboard.impostor_radio'), value: settings.impostorRadioShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: (ev) => {
                            setShortcut(ev, 'impostorRadioShortcut');
                        }, onMouseDown: (ev) => {
                            setMouseShortcut(ev, 'impostorRadioShortcut');
                        } })),
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement(TextField, { spellCheck: false, color: "secondary", label: t('settings.keyboard.mute'), value: settings.muteShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: (ev) => {
                            setShortcut(ev, 'muteShortcut');
                        }, onMouseDown: (ev) => {
                            setMouseShortcut(ev, 'muteShortcut');
                        } })),
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement(TextField, { spellCheck: false, color: "secondary", label: t('settings.keyboard.deafen'), value: settings.deafenShortcut, className: classes.shortcutField, variant: "outlined", onKeyDown: (ev) => {
                            setShortcut(ev, 'deafenShortcut');
                        }, onMouseDown: (ev) => {
                            setMouseShortcut(ev, 'deafenShortcut');
                        } }))),
            React.createElement(Divider, null),
            React.createElement(Typography, { variant: "h6" }, t('settings.overlay.title')),
            React.createElement("div", null,
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.always_on_top'), checked: settings.alwaysOnTop, onChange: (_, checked) => setSettings('alwaysOnTop', checked), control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.enabled'), checked: settings.enableOverlay, onChange: (_, checked) => setSettings('enableOverlay', checked), control: React.createElement(Checkbox, null) }),
                settings.enableOverlay && (React.createElement(React.Fragment, null,
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.compact'), checked: settings.compactOverlay, onChange: (_, checked) => setSettings('compactOverlay', checked), control: React.createElement(Checkbox, null) }),
                    React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.overlay.meeting'), checked: settings.meetingOverlay, onChange: (_, checked) => setSettings('meetingOverlay', checked), control: React.createElement(Checkbox, null) }),
                    React.createElement(TextField, { fullWidth: true, select: true, label: t('settings.overlay.pos'), variant: "outlined", color: "secondary", value: settings.overlayPosition, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: (ev) => setSettings('overlayPosition', ev.target.value), onClick: updateDevices },
                        React.createElement("option", { value: "hidden" }, t('settings.overlay.locations.hidden')),
                        React.createElement("option", { value: "top" }, t('settings.overlay.locations.top')),
                        React.createElement("option", { value: "bottom_left" }, t('settings.overlay.locations.bottom')),
                        React.createElement("option", { value: "right" }, t('settings.overlay.locations.right')),
                        React.createElement("option", { value: "right1" }, t('settings.overlay.locations.right1')),
                        React.createElement("option", { value: "left" }, t('settings.overlay.locations.left')),
                        React.createElement("option", { value: "left1" }, t('settings.overlay.locations.left1')))))),
            React.createElement(Divider, null),
            React.createElement(Typography, { variant: "h6" }, t('settings.advanced.title')),
            React.createElement("div", null,
                React.createElement(FormControlLabel, { label: t('settings.advanced.nat_fix'), checked: settings.natFix, onChange: (_, checked) => {
                        openWarningDialog(t('settings.warning'), t('settings.advanced.nat_fix_warning'), () => setSettings('natFix', checked), checked);
                    }, control: React.createElement(Checkbox, null) })),
            React.createElement(ServerURLInput, { t: t, initialURL: settings.serverURL, onValidURL: URLInputCallback, className: classes.dialog }),
            React.createElement(Divider, null),
            React.createElement(Typography, { variant: "h6" }, t('settings.beta.title')),
            React.createElement("div", null,
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.beta.mobilehost'), checked: settings.mobileHost, onChange: (_, checked) => setSettings('mobileHost', checked), control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.beta.vad_enabled'), checked: settings.vadEnabled, onChange: (_, checked) => {
                        openWarningDialog(t('settings.warning'), t('settings.beta.vad_enabled_warning'), () => setSettings('vadEnabled', checked), !checked);
                    }, control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.beta.hardware_acceleration'), checked: settings.hardware_acceleration, onChange: (_, checked) => {
                        openWarningDialog(t('settings.warning'), t('settings.beta.hardware_acceleration_warning'), () => {
                            setSettings('hardware_acceleration', checked);
                            ipcRenderer.send("relaunch");
                        }, !checked);
                    }, control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.beta.echocancellation'), checked: settings.echoCancellation, onChange: (_, checked) => setSettings('echoCancellation', checked), control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.beta.spatial_audio'), checked: settings.enableSpatialAudio, onChange: (_, checked) => setSettings('enableSpatialAudio', checked), control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.beta.noiseSuppression'), checked: settings.noiseSuppression, onChange: (_, checked) => setSettings('noiseSuppression', checked), control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.beta.oldsampledebug'), checked: settings.oldSampleDebug, onChange: (_, checked) => {
                        openWarningDialog(t('settings.warning'), t('settings.beta.oldsampledebug_warning'), () => {
                            setSettings('oldSampleDebug', checked);
                        }, checked);
                    }, control: React.createElement(Checkbox, null) })),
            React.createElement(TextField, { fullWidth: true, select: true, label: t('settings.language'), variant: "outlined", color: "secondary", value: settings.language, className: classes.shortcutField, SelectProps: { native: true }, InputLabelProps: { shrink: true }, onChange: (ev) => setSettings('language', ev.target.value) }, Object.entries(languages).map(([key, value]) => (React.createElement("option", { key: key, value: key }, value.name)))),
            React.createElement(Divider, null),
            React.createElement(Typography, { variant: "h6" }, t('settings.streaming.title')),
            React.createElement("div", null,
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.streaming.hidecode'), checked: !settings.hideCode, onChange: (_, checked) => setSettings('hideCode', !checked), control: React.createElement(Checkbox, null) }),
                React.createElement(FormControlLabel, { className: classes.formLabel, label: t('settings.streaming.obs_overlay'), checked: settings.obsOverlay, onChange: (_, checked) => {
                        setSettings('obsOverlay', checked);
                        if (!settings.obsSecret) {
                            setSettings('obsSecret', Math.random().toString(36).substr(2, 9).toUpperCase());
                        }
                    }, control: React.createElement(Checkbox, null) }),
                settings.obsOverlay && (React.createElement(React.Fragment, null,
                    React.createElement(TextField, { fullWidth: true, spellCheck: false, label: t('settings.streaming.obs_url'), value: `${settings.serverURL.includes('https') ? 'https' : 'http'}://obs.bettercrewlink.app/?compact=${settings.compactOverlay ? '1' : '0'}&position=${settings.overlayPosition}&meeting=${settings.meetingOverlay ? '1' : '0'}&secret=${settings.obsSecret}&server=${settings.serverURL}`, variant: "outlined", color: "primary", InputProps: {
                            readOnly: true,
                        } })))),
            React.createElement(Divider, null),
            React.createElement(Typography, { variant: "h6" }, t('settings.troubleshooting.title')),
            React.createElement("div", null,
                React.createElement(DisabledTooltip, { disabled: !canResetSettings, title: t('settings.troubleshooting.warning') },
                    React.createElement(Button, { disabled: !canResetSettings, variant: "contained", color: "secondary", onClick: () => openWarningDialog(t('settings.warning'), t('settings.troubleshooting.restore_warning'), () => resetDefaults(), true) }, t('settings.troubleshooting.restore')))),
            React.createElement(Alert, { className: classes.alert, severity: "info", style: { display: unsaved ? undefined : 'none' } }, t('buttons.exit')))));
};
export default Settings;
//# sourceMappingURL=Settings.js.map