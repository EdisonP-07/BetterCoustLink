"use strict";
exports.__esModule = true;
var react_1 = require("react");
var electron_1 = require("electron");
var AmongUsState_1 = require("../common/AmongUsState");
var ipc_messages_1 = require("../common/ipc-messages");
var react_dom_1 = require("react-dom");
var makeStyles_1 = require("@mui/styles/makeStyles");
require("./css/overlay.css");
var Avatar_1 = require("./Avatar");
var avatarGenerator_1 = require("../main/avatarGenerator");
var useStyles = (0, makeStyles_1["default"])(function () { return ({
    meetingHud: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: function (_a) {
            var width = _a.width;
            return width;
        },
        height: function (_a) {
            var height = _a.height;
            return height;
        },
        transform: 'translate(-50%, -50%)'
    },
    tabletContainer: {
        width: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '88.45%' : '100%');
        },
        height: '10.5%',
        left: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '4.7%' : '0.4%');
        },
        top: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '18.4703%' : '15%');
        },
        position: 'absolute',
        display: 'flex',
        flexWrap: 'wrap'
    },
    playerContainer: {
        width: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '46.41%' : '30%');
        },
        height: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '100%' : '109%');
        },
        borderRadius: function (_a) {
            var height = _a.height;
            return height / 100;
        },
        transition: 'opacity .1s linear',
        marginBottom: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '2%' : '1.9%');
        },
        marginRight: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '2.34%' : '0.23%');
        },
        marginLeft: function (_a) {
            var oldHud = _a.oldHud;
            return (oldHud ? '0%' : '2.4%');
        },
        boxSizing: 'border-box'
    }
}); });
function useWindowSize() {
    var _a = (0, react_1.useState)([0, 0]), windowSize = _a[0], setWindowSize = _a[1];
    (0, react_1.useEffect)(function () {
        var onResize = function () {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', onResize);
        onResize();
        return function () { return window.removeEventListener('resize', onResize); };
    }, []);
    return windowSize;
}
var iPadRatio = 854 / 579;
var Overlay = function () {
    var _a = (0, react_1.useState)(undefined), gameState = _a[0], setGameState = _a[1];
    var _b = (0, react_1.useState)(undefined), voiceState = _b[0], setVoiceState = _b[1];
    var _c = (0, react_1.useState)(undefined), settings = _c[0], setSettings = _c[1];
    var _d = (0, react_1.useState)(avatarGenerator_1.DEFAULT_PLAYERCOLORS), playerColors = _d[0], setColors = _d[1];
    (0, react_1.useEffect)(function () {
        var onState = function (_, newState) {
            setGameState(newState);
        };
        var onVoiceState = function (_, newState) {
            setVoiceState(newState);
        };
        var onSettings = function (_, newState) {
            console.log('Recieved settings..');
            setSettings(newState);
        };
        var onColorChange = function (_, colors) {
            console.log('Recieved colors..');
            setColors(colors);
            console.log('new colors: ', playerColors);
        };
        electron_1.ipcRenderer.on(ipc_messages_1.IpcOverlayMessages.NOTIFY_GAME_STATE_CHANGED, onState);
        electron_1.ipcRenderer.on(ipc_messages_1.IpcOverlayMessages.NOTIFY_VOICE_STATE_CHANGED, onVoiceState);
        electron_1.ipcRenderer.on(ipc_messages_1.IpcOverlayMessages.NOTIFY_SETTINGS_CHANGED, onSettings);
        electron_1.ipcRenderer.on(ipc_messages_1.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, onColorChange);
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_MAINWINDOW, ipc_messages_1.IpcOverlayMessages.REQUEST_INITVALUES);
        console.log('REQUEST_INITVALUES');
        return function () {
            electron_1.ipcRenderer.off(ipc_messages_1.IpcOverlayMessages.NOTIFY_GAME_STATE_CHANGED, onState);
            electron_1.ipcRenderer.off(ipc_messages_1.IpcOverlayMessages.NOTIFY_VOICE_STATE_CHANGED, onVoiceState);
            electron_1.ipcRenderer.off(ipc_messages_1.IpcOverlayMessages.NOTIFY_SETTINGS_CHANGED, onSettings);
            electron_1.ipcRenderer.on(ipc_messages_1.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, onColorChange);
        };
    }, []);
    if (!settings || !voiceState || !gameState || !settings.enableOverlay || gameState.gameState == AmongUsState_1.GameState.MENU)
        return null;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        settings.meetingOverlay && gameState.gameState === AmongUsState_1.GameState.DISCUSSION && (react_1["default"].createElement(MeetingHud, { gameState: gameState, voiceState: voiceState, playerColors: playerColors })),
        settings.overlayPosition !== 'hidden' && (react_1["default"].createElement(AvatarOverlay, { voiceState: voiceState, gameState: gameState, position: settings.overlayPosition, compactOverlay: settings.compactOverlay }))));
};
var AvatarOverlay = function (_a) {
    var voiceState = _a.voiceState, gameState = _a.gameState, position = _a.position, compactOverlay = _a.compactOverlay;
    if (!gameState.players)
        return null;
    var positionParse = position.replace('1', '');
    var avatars = [];
    var isOnSide = positionParse == 'right' || positionParse == 'left';
    var showName = isOnSide && (!compactOverlay || position === 'right1' || position === 'left1');
    var classnames = ['overlay-wrapper'];
    if (gameState.gameState == AmongUsState_1.GameState.UNKNOWN || gameState.gameState == AmongUsState_1.GameState.MENU) {
        classnames.push('gamestate_menu');
    }
    else {
        classnames.push('gamestate_game');
        classnames.push('overlay_postion_' + positionParse);
        if (compactOverlay || position === 'right1' || position === 'left1') {
            classnames.push('compactoverlay');
        }
        if (position === 'left1' || position === 'right1') {
            classnames.push('overlay_postion_' + position);
        }
    }
    var players = (0, react_1.useMemo)(function () {
        if (!gameState.players)
            return null;
        var playerss = gameState.players
            .filter(function (o) { return !voiceState.localIsAlive || !(voiceState.otherDead[o.clientId] && !o.isLocal); })
            .slice()
            .sort(function (a, b) {
            if ((a.disconnected || voiceState.otherDead[a.clientId]) &&
                (b.disconnected || voiceState.otherDead[b.clientId])) {
                return a.id - b.id;
            }
            else if (a.disconnected || voiceState.otherDead[a.clientId]) {
                return 1000;
            }
            else if (b.disconnected || voiceState.otherDead[b.clientId]) {
                return -1000;
            }
            return a.id - b.id;
        });
        return playerss;
    }, [gameState.players]);
    // const myPLayer = useMemo(() => {
    // 	if (!gameState.players) return null;
    // 	return gameState.players.find(o => o.isLocal && (!o.disconnected || !o.bugged))
    // }, [gameState.players]);
    players === null || players === void 0 ? void 0 : players.forEach(function (player) {
        var _a;
        if (!voiceState.otherTalking[player.clientId] && !(player.isLocal && voiceState.localTalking) && compactOverlay) {
            return;
        }
        var peer = voiceState.playerSocketIds[player.clientId];
        var connected = ((_a = voiceState.socketClients[peer]) === null || _a === void 0 ? void 0 : _a.clientId) === player.clientId;
        if (!connected && !player.isLocal) {
            return;
        }
        var talking = !player.inVent && (voiceState.otherTalking[player.clientId] || (player.isLocal && voiceState.localTalking));
        // const audio = voiceState.audioConnected[peer];
        avatars.push(react_1["default"].createElement("div", { key: player.id, className: "player_wrapper" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Avatar_1["default"], { key: player.id, 
                    // connectionState={!connected ? 'disconnected' : audio ? 'connected' : 'novoice'}
                    player: player, showborder: isOnSide && !compactOverlay, muted: voiceState.muted && player.isLocal, deafened: voiceState.deafened && player.isLocal, connectionState: 'connected', talking: talking, borderColor: !player.isLocal || player.shiftedColor == -1 ? '#2ecc71' : 'gray', isUsingRadio: voiceState.impostorRadioClientId == player.clientId, isAlive: !voiceState.otherDead[player.clientId] || (player.isLocal && !player.isDead), size: 100, lookLeft: !(positionParse === 'left' || positionParse === 'bottom_left'), overflow: isOnSide && !showName, showHat: true, mod: voiceState.mod })),
            showName && (react_1["default"].createElement("span", { className: "playername", style: {
                    opacity: (position === 'right1' || position === 'left1') && !talking ? 0 : 1
                } },
                react_1["default"].createElement("small", null, player.name)))));
    });
    if (avatars.length === 0)
        return null;
    var playerContainerStyle = { '--size': 7.5 * (10 / avatars.length) + 'vh' };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: classnames.join(' '), style: playerContainerStyle },
            react_1["default"].createElement("div", { className: "otherplayers" },
                react_1["default"].createElement("div", { className: "players_container playerContainerBack" }, avatars)))));
};
var MeetingHud = function (_a) {
    var voiceState = _a.voiceState, gameState = _a.gameState, playerColors = _a.playerColors;
    var _b = useWindowSize(), windowWidth = _b[0], windowheight = _b[1];
    var _c = (0, react_1.useMemo)(function () {
        if (gameState.oldMeetingHud) {
            var hudWidth = 0, hudHeight = 0;
            if (windowWidth / (windowheight * 0.96) > iPadRatio) {
                hudHeight = windowWidth * 0.96;
                hudWidth = hudHeight * iPadRatio;
            }
            else {
                hudWidth = windowWidth;
                hudHeight = windowWidth * (1 / iPadRatio);
            }
            return [hudWidth, hudWidth];
        }
        var resultW;
        var ratio_diff = Math.abs(windowWidth / windowheight - 1.7);
        if (ratio_diff < 0.25) {
            resultW = windowWidth / 1.192;
        }
        else if (ratio_diff < 0.5) {
            resultW = windowWidth / 1.146;
        }
        else {
            resultW = windowWidth / 1.591;
        }
        var resultH = resultW / 1.72;
        return [resultW, resultH];
    }, [windowWidth, windowheight, gameState.oldMeetingHud]), width = _c[0], height = _c[1];
    var classes = useStyles({
        width: width,
        height: height,
        oldHud: gameState.oldMeetingHud
    });
    var players = (0, react_1.useMemo)(function () {
        if (!gameState.players)
            return null;
        return gameState.players.slice().sort(function (a, b) {
            if ((a.disconnected || a.isDead) && (b.disconnected || b.isDead)) {
                return a.id - b.id;
            }
            else if (a.disconnected || a.isDead) {
                return 1000;
            }
            else if (b.disconnected || b.isDead) {
                return -1000;
            }
            return a.id - b.id;
        });
    }, [gameState.gameState]);
    if (!players || gameState.gameState !== AmongUsState_1.GameState.DISCUSSION)
        return null;
    var overlays = players.map(function (player) {
        var color = playerColors[player.colorId] ? playerColors[player.colorId][0] : '#C51111';
        return (react_1["default"].createElement("div", { key: player.id, className: classes.playerContainer, style: {
                opacity: voiceState.otherTalking[player.clientId] || (player.isLocal && voiceState.localTalking) ? 1 : 0,
                border: 'solid',
                borderWidth: '2px',
                borderColor: '#00000037',
                boxShadow: "0 0 ".concat(height / 100, "px ").concat(height / 100, "px ").concat(color),
                transition: 'opacity 400ms'
            } }));
    });
    return (react_1["default"].createElement("div", { className: classes.meetingHud },
        react_1["default"].createElement("div", { className: classes.tabletContainer }, overlays)));
};
react_dom_1["default"].render(react_1["default"].createElement(Overlay, null), document.getElementById('app'));
exports["default"] = Overlay;
