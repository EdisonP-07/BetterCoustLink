import React, { useEffect, useState, useRef } from 'react';
import Voice from './Voice';
import Menu from './Menu';
import { ipcRenderer, shell } from 'electron';
import Settings from './settings/Settings';
import SettingsStore, { setSetting, setLobbySetting } from './settings/SettingsStore';
import { GameStateContext, SettingsContext, PlayerColorContext, HostSettingsContext } from './contexts';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { IpcHandlerMessages, IpcMessages, IpcRendererMessages, IpcSyncMessages, } from '../common/ipc-messages';
import theme from './theme';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import LinearProgress from '@mui/material/LinearProgress';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import prettyBytes from 'pretty-bytes';
import { IpcOverlayMessages } from '../common/ipc-messages';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'source-code-pro/source-code-pro.css';
import 'typeface-varela/index.css';
import { DEFAULT_PLAYERCOLORS } from '../main/avatarGenerator';
import './language/i18n';
import { withNamespaces } from 'react-i18next';
let appVersion = '';
if (typeof window !== 'undefined' && window.location) {
    const query = new URLSearchParams(window.location.search.substring(1));
    appVersion = ' v' + query.get('version') || '';
}
const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        width: '100vw',
        height: theme.spacing(3),
        backgroundColor: '#1d1a23',
        top: 0,
        WebkitAppRegion: 'drag',
        zIndex: 100,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        display: 'block',
        height: theme.spacing(3),
        lineHeight: theme.spacing(3),
        color: theme.palette.primary.main,
    },
    button: {
        WebkitAppRegion: 'no-drag',
        marginLeft: 'auto',
        padding: 0,
        position: 'absolute',
        top: 0,
    },
}));
const RawTitleBar = function ({ settingsOpen, setSettingsOpen }) {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement("span", { className: classes.title, style: { marginLeft: 10 } },
            "BetterCrewLink",
            appVersion),
        React.createElement(IconButton, { className: classes.button, style: { left: 0 }, size: "small", onClick: () => setSettingsOpen(!settingsOpen) },
            React.createElement(SettingsIcon, { htmlColor: "#777" })),
        React.createElement(IconButton, { className: classes.button, style: { left: 22 }, size: "small", onClick: () => ipcRenderer.send('reload') },
            React.createElement(RefreshSharpIcon, { htmlColor: "#777" })),
        React.createElement(IconButton, { className: classes.button, style: { right: 0 }, size: "small", onClick: () => ipcRenderer.send(IpcMessages.QUIT_CREWLINK) },
            React.createElement(CloseIcon, { htmlColor: "#777" }))));
};
const TitleBar = React.memo(RawTitleBar);
var AppState;
(function (AppState) {
    AppState[AppState["MENU"] = 0] = "MENU";
    AppState[AppState["VOICE"] = 1] = "VOICE";
})(AppState || (AppState = {}));
// @ts-ignore
export default function App({ t }) {
    const [state, setState] = useState(AppState.MENU);
    const [gameState, setGameState] = useState({});
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [diaOpen, setDiaOpen] = useState(true);
    const [error, setError] = useState('');
    const [updaterState, setUpdaterState] = useState({
        state: 'unavailable',
    });
    const playerColors = useRef(DEFAULT_PLAYERCOLORS);
    const overlayInitCount = useRef(0);
    const [settings, setSettings] = useState(SettingsStore.store);
    const [hostLobbySettings, setHostLobbySettings] = useState(settings.localLobbySettings);
    useEffect(() => {
        SettingsStore.onDidAnyChange((newValue, _) => { setSettings(newValue); });
    }, []);
    useEffect(() => {
        ipcRenderer.send(IpcMessages.SEND_TO_OVERLAY, IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, playerColors.current);
        ipcRenderer.send(IpcMessages.SEND_TO_OVERLAY, IpcOverlayMessages.NOTIFY_SETTINGS_CHANGED, SettingsStore.store);
        ipcRenderer.send(IpcMessages.SEND_TO_OVERLAY, IpcOverlayMessages.NOTIFY_GAME_STATE_CHANGED, gameState);
    }, [overlayInitCount.current]);
    useEffect(() => {
        const onOpen = (_, isOpen) => {
            setState(isOpen ? AppState.VOICE : AppState.MENU);
        };
        const onState = (_, newState) => {
            setGameState(newState);
        };
        const onError = (_, error) => {
            shouldInit = false;
            setError(error);
        };
        const onAutoUpdaterStateChange = (_, state) => {
            setUpdaterState((old) => (Object.assign(Object.assign({}, old), state)));
        };
        const onColorsChange = (_, colors) => {
            console.log('RECIEVED COLORS');
            playerColors.current = colors;
            ipcRenderer.send(IpcMessages.SEND_TO_OVERLAY, IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, colors);
        };
        const onOverlayInit = () => {
            overlayInitCount.current++;
        };
        let shouldInit = true;
        ipcRenderer
            .invoke(IpcHandlerMessages.START_HOOK)
            .then(() => {
            if (shouldInit) {
                setGameState(ipcRenderer.sendSync(IpcSyncMessages.GET_INITIAL_STATE));
            }
        })
            .catch((error) => {
            if (shouldInit) {
                shouldInit = false;
                setError(error.message);
            }
        });
        ipcRenderer.on(IpcRendererMessages.AUTO_UPDATER_STATE, onAutoUpdaterStateChange);
        ipcRenderer.on(IpcRendererMessages.NOTIFY_GAME_OPENED, onOpen);
        ipcRenderer.on(IpcRendererMessages.NOTIFY_GAME_STATE_CHANGED, onState);
        ipcRenderer.on(IpcRendererMessages.ERROR, onError);
        ipcRenderer.on(IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, onColorsChange);
        ipcRenderer.on(IpcOverlayMessages.REQUEST_INITVALUES, onOverlayInit);
        return () => {
            ipcRenderer.off(IpcRendererMessages.AUTO_UPDATER_STATE, onAutoUpdaterStateChange);
            ipcRenderer.off(IpcRendererMessages.NOTIFY_GAME_OPENED, onOpen);
            ipcRenderer.off(IpcRendererMessages.NOTIFY_GAME_STATE_CHANGED, onState);
            ipcRenderer.off(IpcRendererMessages.ERROR, onError);
            ipcRenderer.off(IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, onColorsChange);
            shouldInit = false;
        };
    }, []);
    useEffect(() => {
        ipcRenderer.send(IpcMessages.SEND_TO_OVERLAY, IpcOverlayMessages.NOTIFY_GAME_STATE_CHANGED, gameState);
    }, [gameState]);
    useEffect(() => {
        ipcRenderer.send(IpcMessages.SEND_TO_OVERLAY, IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, playerColors.current);
        ipcRenderer.send(IpcMessages.SEND_TO_OVERLAY, IpcOverlayMessages.NOTIFY_SETTINGS_CHANGED, SettingsStore.store);
    }, [settings]);
    let page;
    switch (state) {
        case AppState.MENU:
            page = React.createElement(Menu, { t: t, error: error });
            break;
        case AppState.VOICE:
            page = React.createElement(Voice, { t: t, error: error });
            break;
    }
    return (React.createElement(PlayerColorContext.Provider, { value: playerColors.current },
        React.createElement(GameStateContext.Provider, { value: gameState },
            React.createElement(HostSettingsContext.Provider, { value: [hostLobbySettings, setHostLobbySettings] },
                React.createElement(SettingsContext.Provider, { value: [settings, setSetting, setLobbySetting] },
                    React.createElement(StyledEngineProvider, { injectFirst: true },
                        React.createElement(ThemeProvider, { theme: theme },
                            React.createElement(TitleBar, { settingsOpen: settingsOpen, setSettingsOpen: setSettingsOpen }),
                            React.createElement(Settings, { t: t, open: settingsOpen, onClose: () => setSettingsOpen(false) }),
                            React.createElement(Dialog, { fullWidth: true, open: updaterState.state !== 'unavailable' && diaOpen },
                                updaterState.state === 'available' && updaterState.info && (React.createElement(DialogTitle, null,
                                    "Update v",
                                    updaterState.info.version)),
                                updaterState.state === 'error' && (React.createElement(DialogTitle, null, "Updater Error")),
                                updaterState.state === 'downloading' && React.createElement(DialogTitle, null, "Updating..."),
                                React.createElement(DialogContent, null,
                                    updaterState.state === 'downloading' && updaterState.progress && (React.createElement(React.Fragment, null,
                                        React.createElement(LinearProgress, { variant: 'determinate', value: updaterState.progress.percent }),
                                        React.createElement(DialogContentText, null,
                                            prettyBytes(updaterState.progress.transferred),
                                            " / ",
                                            prettyBytes(updaterState.progress.total)))),
                                    updaterState.state === 'available' && (React.createElement(React.Fragment, null,
                                        React.createElement(LinearProgress, { variant: 'indeterminate' }),
                                        React.createElement(DialogContentText, null, "Update now or later?"))),
                                    updaterState.state === 'error' && (React.createElement(DialogContentText, { color: "error" }, String(updaterState.error)))),
                                updaterState.state === 'error' && (React.createElement(DialogActions, null,
                                    React.createElement(Button, { color: "grey", onClick: () => {
                                            shell.openExternal("https://github.com/OhMyGuus/BetterCrewLink/releases/latest");
                                        } }, "Download Manually"),
                                    React.createElement(Button, { color: "grey", onClick: () => {
                                            setDiaOpen(false);
                                        } }, "Skip"))),
                                updaterState.state === 'available' && (React.createElement(DialogActions, null,
                                    React.createElement(Button, { onClick: () => {
                                            ipcRenderer.send('update-app');
                                        } }, "Now"),
                                    React.createElement(Button, { onClick: () => {
                                            setDiaOpen(false);
                                        } }, "Later")))),
                            page)))))));
}
// @ts-ignore
const App2 = withNamespaces()(App);
// @ts-ignore
ReactDOM.render(React.createElement(App2, null), document.getElementById('app'));
//# sourceMappingURL=App.js.map