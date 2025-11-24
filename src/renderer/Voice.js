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
var socket_io_client_1 = require("socket.io-client");
var Avatar_1 = require("./Avatar");
var contexts_1 = require("./contexts");
var AmongUsState_1 = require("../common/AmongUsState");
var simple_peer_1 = require("simple-peer");
var electron_1 = require("electron");
var vad_1 = require("./vad");
var ipc_messages_1 = require("../common/ipc-messages");
var Typography_1 = require("@mui/material/Typography");
var Grid_1 = require("@mui/material/Grid");
var makeStyles_1 = require("@mui/styles/makeStyles");
var SupportLink_1 = require("./SupportLink");
var Divider_1 = require("@mui/material/Divider");
var validateClientPeerConfig_1 = require("./validateClientPeerConfig");
// @ts-ignore
var reverb_ogx_1 = require("arraybuffer-loader!../../static/sounds/reverb.ogx"); // @ts-ignore
var radio_on_wav_1 = require("../../static/sounds/radio_on.wav"); // @ts-ignore
var AmongusMap_1 = require("../common/AmongusMap");
var Footer_1 = require("./Footer");
var Button_1 = require("@mui/material/Button");
var IconButton_1 = require("@mui/material/IconButton");
var VolumeOff_1 = require("@mui/icons-material/VolumeOff");
var VolumeUp_1 = require("@mui/icons-material/VolumeUp");
var Mic_1 = require("@mui/icons-material/Mic");
var MicOff_1 = require("@mui/icons-material/MicOff");
var webrtc_adapter_1 = require("webrtc-adapter");
var SettingsStore_1 = require("./settings/SettingsStore");
var ColliderMap_1 = require("../common/ColliderMap");
console.log(webrtc_adapter_1["default"].browserDetails.browser);
var DEFAULT_ICE_CONFIG = {
    iceTransportPolicy: 'all',
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302'
        },
    ]
};
var DEFAULT_ICE_CONFIG_TURN = {
    iceTransportPolicy: 'relay',
    iceServers: [
        {
            urls: 'turn:turn.bettercrewl.ink:3478',
            username: 'M9DRVaByiujoXeuYAAAG',
            credential: 'TpHR9HQNZ8taxjb3'
        },
    ]
};
var useStyles = (0, makeStyles_1["default"])(function (theme) { return ({
    error: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    root: {
        paddingTop: theme.spacing(3)
    },
    top: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    username: {
        display: 'block',
        textAlign: 'center',
        fontSize: 20,
        whiteSpace: 'nowrap',
        maxWidth: '115px'
    },
    code: {
        fontFamily: "'Source Code Pro', monospace",
        display: 'block',
        width: 'fit-content',
        margin: '5px auto',
        padding: 5,
        borderRadius: 5,
        fontSize: 28
    },
    otherplayers: {
        width: 225,
        height: 225,
        margin: '4px auto',
        '& .MuiGrid-grid-xs-1': {
            maxHeight: '8.3333333%'
        },
        '& .MuiGrid-grid-xs-2': {
            maxHeight: '16.666667%'
        },
        '& .MuiGrid-grid-xs-3': {
            maxHeight: '25%'
        },
        '& .MuiGrid-grid-xs-4': {
            maxHeight: '33.333333%'
        }
    },
    avatarWrapper: {
        width: 80,
        padding: theme.spacing(1)
    },
    muteButtons: {
        paddingLeft: '5px',
        paddingTop: '26px',
        float: 'right',
        display: 'grid'
    },
    left: { float: 'left' }
}); });
var defaultlocalLobbySettings = {
    maxDistance: 5.32,
    haunting: false,
    hearImpostorsInVents: false,
    impostersHearImpostersInvent: false,
    impostorRadioEnabled: false,
    commsSabotage: false,
    deadOnly: false,
    hearThroughCameras: false,
    wallsBlockAudio: false,
    meetingGhostOnly: false,
    visionHearing: false,
    publicLobby_on: false,
    publicLobby_title: '',
    publicLobby_language: 'en'
};
var radioOnAudio = new Audio();
radioOnAudio.src = radio_on_wav_1["default"];
radioOnAudio.volume = 0.02;
// const radiobeepAudio2 = new Audio();
// radiobeepAudio2.src = radioBeep2;
// radiobeepAudio2.volume = 0.2;
var Voice = function (_a) {
    var _this = this;
    var _b;
    var t = _a.t, initialError = _a.error;
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useContext)(contexts_1.SettingsContext), settings = _d[0], setSetting = _d[1];
    var settingsRef = (0, react_1.useRef)(settings);
    var _e = (0, react_1.useContext)(contexts_1.HostSettingsContext), lobbySettings = _e[0], setHostLobbySettings = _e[1];
    var lobbySettingsRef = (0, react_1.useRef)(lobbySettings);
    var maxDistanceRef = (0, react_1.useRef)(2);
    var gameState = (0, react_1.useContext)(contexts_1.GameStateContext);
    var playerColors = (0, react_1.useContext)(contexts_1.PlayerColorContext);
    var hostRef = (0, react_1.useRef)({
        map: AmongusMap_1.MapType.UNKNOWN,
        mobileRunning: false,
        gamestate: gameState.gameState,
        code: gameState.lobbyCode,
        hostId: gameState.hostId,
        parsedHostId: gameState.hostId,
        isHost: gameState.isHost,
        serverHostId: 0
    });
    var displayedLobbyCode = gameState.lobbyCode;
    if (displayedLobbyCode !== 'MENU' && settings.hideCode)
        displayedLobbyCode = 'LOBBY';
    var _f = (0, react_1.useState)(false), talking = _f[0], setTalking = _f[1];
    var _g = (0, react_1.useState)({}), socketClients = _g[0], setSocketClients = _g[1];
    var playerConfigs = (0, react_1.useState)(settingsRef.current.playerConfigMap)[0];
    var socketClientsRef = (0, react_1.useRef)(socketClients);
    var _h = (0, react_1.useState)({}), peerConnections = _h[0], setPeerConnections = _h[1];
    var convolverBuffer = (0, react_1.useRef)(null);
    var playerSocketIdsRef = (0, react_1.useRef)({});
    var classes = useStyles();
    var _j = (0, react_1.useState)(null), connect = _j[0], setConnect = _j[1];
    var _k = (0, react_1.useState)({}), otherTalking = _k[0], setOtherTalking = _k[1];
    var _l = (0, react_1.useState)({}), otherVAD = _l[0], setOtherVAD = _l[1];
    var _m = (0, react_1.useState)({}), otherDead = _m[0], setOtherDead = _m[1];
    var impostorRadioClientId = (0, react_1.useRef)(-1);
    var audioElements = (0, react_1.useRef)({});
    var _o = (0, react_1.useState)({}), audioConnected = _o[0], setAudioConnected = _o[1];
    var _p = (0, react_1.useState)(false), deafenedState = _p[0], setDeafened = _p[1];
    var _q = (0, react_1.useState)(false), mutedState = _q[0], setMuted = _q[1];
    var _r = (0, react_1.useState)(false), connected = _r[0], setConnected = _r[1];
    function applyEffect(gain, effectNode, destination, player) {
        console.log('Apply effect->', effectNode);
        try {
            gain.disconnect(destination);
            gain.connect(effectNode);
            effectNode.connect(destination);
        }
        catch (_a) {
            console.log('error with applying effect: ', player.name, effectNode);
        }
    }
    function restoreEffect(gain, effectNode, destination, player) {
        console.log('restore effect->', effectNode);
        try {
            effectNode.disconnect(destination);
            gain.disconnect(effectNode);
            gain.connect(destination);
        }
        catch (_a) {
            console.log('error with applying effect: ', player.name, effectNode);
        }
    }
    function calculateVoiceAudio(state, settings, me, other, audio) {
        var pan = audio.pan, gain = audio.gain, muffle = audio.muffle, reverb = audio.reverb, destination = audio.destination;
        var audioContext = pan.context;
        var useLightSource = true;
        var maxdistance = maxDistanceRef.current;
        var panPos = [other.x - me.x, other.y - me.y];
        var endGain = 0;
        var collided = false;
        var skipDistanceCheck = false;
        var muffleEnabled = false;
        if (other.disconnected || other.isDummy) {
            return 0;
        }
        switch (state.gameState) {
            case AmongUsState_1.GameState.MENU:
                return 0;
            case AmongUsState_1.GameState.LOBBY:
                endGain = 1;
                break;
            case AmongUsState_1.GameState.TASKS:
                endGain = 1;
                if (lobbySettings.meetingGhostOnly) {
                    endGain = 0;
                }
                if (!me.isDead && lobbySettings.commsSabotage && state.comsSabotaged && !me.isImpostor) {
                    endGain = 0;
                }
                // Mute other players which are in a vent
                if (other.inVent &&
                    !(lobbySettings.hearImpostorsInVents || (lobbySettings.impostersHearImpostersInvent && me.inVent))) {
                    endGain = 0;
                }
                if (lobbySettings.wallsBlockAudio &&
                    !me.isDead &&
                    (0, ColliderMap_1.poseCollide)({ x: me.x, y: me.y }, { x: other.x, y: other.y }, gameState.map, gameState.closedDoors)) {
                    collided = true;
                }
                if (me.isImpostor &&
                    other.isImpostor &&
                    lobbySettings.impostorRadioEnabled &&
                    other.clientId === impostorRadioClientId.current) {
                    skipDistanceCheck = true;
                    muffle.type = 'highpass';
                    muffle.frequency.value = 1000;
                    muffle.Q.value = 10;
                    muffleEnabled = true;
                    if (!audio.muffleConnected) {
                        audio.muffleConnected = true;
                        applyEffect(gain, muffle, destination, other);
                    }
                }
                if (!me.isDead && other.isDead && me.isImpostor && lobbySettings.haunting) {
                    if (!audio.reverbConnected) {
                        audio.reverbConnected = true;
                        applyEffect(gain, reverb, destination, other);
                    }
                    collided = false;
                    endGain = settings.ghostVolumeAsImpostor / 100;
                }
                else {
                    if (other.isDead && !me.isDead) {
                        endGain = 0;
                    }
                }
                break;
            case AmongUsState_1.GameState.DISCUSSION:
                panPos = [0, 0];
                endGain = 1;
                if (!me.isDead && other.isDead) {
                    endGain = 0;
                }
                break;
            case AmongUsState_1.GameState.UNKNOWN:
            default:
                endGain = 0;
                break;
        }
        if (useLightSource && state.lightRadiusChanged) {
            pan.maxDistance = maxDistanceRef.current;
        }
        if (!other.isDead || state.gameState !== AmongUsState_1.GameState.TASKS || !me.isImpostor || me.isDead) {
            if (audio.reverbConnected && reverb) {
                audio.reverbConnected = false;
                restoreEffect(gain, reverb, destination, other);
            }
        }
        if (lobbySettings.deadOnly) {
            panPos = [0, 0];
            if (!me.isDead || !other.isDead) {
                endGain = 0;
            }
        }
        var isOnCamera = state.currentCamera !== AmongusMap_1.CameraLocation.NONE;
        if (!skipDistanceCheck && Math.sqrt(panPos[0] * panPos[0] + panPos[1] * panPos[1]) > maxdistance) {
            if (lobbySettings.hearThroughCameras && state.gameState === AmongUsState_1.GameState.TASKS) {
                if (state.currentCamera !== AmongusMap_1.CameraLocation.NONE && state.currentCamera !== AmongusMap_1.CameraLocation.Skeld) {
                    var camerapos = AmongusMap_1.AmongUsMaps[state.map].cameras[state.currentCamera];
                    panPos = [other.x - camerapos.x, other.y - camerapos.y];
                    console.log('camerapos: ', camerapos);
                }
                else if (state.currentCamera === AmongusMap_1.CameraLocation.Skeld) {
                    var distance = 999;
                    var camerapos = { x: 999, y: 999 };
                    for (var _i = 0, _a = Object.values(AmongusMap_1.AmongUsMaps[state.map].cameras); _i < _a.length; _i++) {
                        var camera = _a[_i];
                        var cameraDist = Math.sqrt(Math.pow(other.x - camera.x, 2) + Math.pow(other.y - camera.y, 2));
                        if (distance > cameraDist) {
                            distance = cameraDist;
                            camerapos = camera;
                        }
                    }
                    if (distance != 999) {
                        panPos = [other.x - camerapos.x, other.y - camerapos.y];
                    }
                }
                if (Math.sqrt(panPos[0] * panPos[0] + panPos[1] * panPos[1]) > maxdistance) {
                    return 0;
                }
            }
            else {
                return 0;
            }
        }
        else {
            if (collided && !skipDistanceCheck) {
                return 0;
            }
            isOnCamera = false;
        }
        // Muffling in vents
        if (((me.inVent && !me.isDead) || (other.inVent && !other.isDead) || isOnCamera) &&
            state.gameState === AmongUsState_1.GameState.TASKS) {
            if (!audio.muffleConnected) {
                audio.muffleConnected = true;
                applyEffect(gain, muffle, destination, other);
            }
            maxdistance = isOnCamera ? 3 : 0.8;
            muffle.frequency.value = isOnCamera ? 2300 : 2000;
            muffle.Q.value = isOnCamera ? -15 : 20;
            if (endGain === 1)
                endGain = isOnCamera ? 0.8 : 0.5; // Too loud at 1
        }
        else {
            if (audio.muffleConnected && !muffleEnabled) {
                audio.muffleConnected = false;
                restoreEffect(gain, muffle, destination, other);
            }
        }
        if (!settings.enableSpatialAudio || skipDistanceCheck) {
            panPos = [0, 0];
        }
        pan.positionX.setValueAtTime(panPos[0], audioContext.currentTime);
        pan.positionY.setValueAtTime(panPos[1], audioContext.currentTime);
        pan.positionZ.setValueAtTime(-0.5, audioContext.currentTime);
        return endGain;
    }
    function notifyMobilePlayers() {
        var _a;
        if (settingsRef.current.mobileHost &&
            hostRef.current.gamestate !== AmongUsState_1.GameState.MENU &&
            hostRef.current.gamestate !== AmongUsState_1.GameState.UNKNOWN) {
            (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.emit('signal', {
                to: hostRef.current.code + '_mobile',
                data: { mobileHostInfo: { isHostingMobile: true, isGameHost: hostRef.current.isHost } }
            });
        }
        setTimeout(function () { return notifyMobilePlayers(); }, 5000);
    }
    function disconnectAudioHtmlElement(element) {
        console.log('disableing element?', element);
        element.pause();
        if (element.srcObject) {
            var mediaStream = element.srcObject;
            mediaStream.getTracks().forEach(function (track) { return track.stop(); });
        }
        element.removeAttribute('srcObject');
        element.removeAttribute('src');
        element.srcObject = null;
        element.load();
        element.remove();
    }
    function disconnectAudioElement(peer) {
        var _a;
        if (audioElements.current[peer]) {
            console.log('removing element..');
            disconnectAudioHtmlElement(audioElements.current[peer].audioElement);
            disconnectAudioHtmlElement(audioElements.current[peer].dummyAudioElement);
            audioElements.current[peer].pan.disconnect();
            audioElements.current[peer].gain.disconnect();
            // if (audioElements.current[peer].reverbGain != null) audioElements.current[peer].reverbGain?.disconnect();
            if (audioElements.current[peer].reverb != null)
                (_a = audioElements.current[peer].reverb) === null || _a === void 0 ? void 0 : _a.disconnect();
            delete audioElements.current[peer];
        }
    }
    function disconnectClient(client) {
        if (!client || !client.clientId)
            return;
        var oldSocketId = playerSocketIdsRef.current[client.clientId];
        console.log("Checking for  old connection ....", client.clientId, oldSocketId);
        if (oldSocketId && audioElements.current[oldSocketId]) {
            console.log("found old connection disconnecting....", client.clientId);
            disconnectAudioElement(oldSocketId);
        }
    }
    function disconnectPeer(peer) {
        console.log('Disconnect peer: ', peer);
        var connection = peerConnections[peer];
        if (!connection) {
            return;
        }
        connection.destroy();
        setPeerConnections(function (connections) {
            delete connections[peer];
            return connections;
        });
        disconnectAudioElement(peer);
    }
    // Handle pushToTalk, if set
    (0, react_1.useEffect)(function () {
        if (!connectionStuff.current.instream)
            return;
        connectionStuff.current.instream.getAudioTracks()[0].enabled =
            !connectionStuff.current.deafened &&
                !connectionStuff.current.muted &&
                settings.pushToTalkMode !== SettingsStore_1.pushToTalkOptions.PUSH_TO_TALK;
        connectionStuff.current.pushToTalkMode = settings.pushToTalkMode;
    }, [settings.pushToTalkMode]);
    // Emit lobby settings to connected peers
    (0, react_1.useEffect)(function () {
        if (hostRef.current.isHost !== true)
            return;
        Object.values(peerConnections).forEach(function (peer) {
            try {
                console.log('sendxx > ', JSON.stringify(settings.localLobbySettings));
                peer.send(JSON.stringify(settings.localLobbySettings));
            }
            catch (e) {
                console.warn('failed to update lobby settings: ', e);
            }
        });
        setHostLobbySettings(settings.localLobbySettings);
    }, [settings.localLobbySettings, hostRef.current.isHost]);
    (0, react_1.useEffect)(function () {
        for (var peer in audioElements.current) {
            audioElements.current[peer].pan.maxDistance = maxDistanceRef.current;
        }
    }, [lobbySettings.maxDistance, lobbySettings.visionHearing]);
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (!gameState ||
            !gameState.players ||
            !connectionStuff.current.socket ||
            (!hostRef.current.mobileRunning && !settings.obsOverlay)) {
            return;
        }
        if (hostRef.current.mobileRunning) {
            (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.emit('signal', {
                to: gameState.lobbyCode + '_mobile',
                data: { gameState: gameState, lobbySettings: lobbySettings }
            });
        }
        if (settings.obsOverlay &&
            settings.obsSecret &&
            settings.obsSecret.length === 9 &&
            ((gameState.gameState !== AmongUsState_1.GameState.UNKNOWN && gameState.gameState !== AmongUsState_1.GameState.MENU) ||
                gameState.oldGameState !== gameState.gameState)) {
            connectionStuff.current.overlaySocket = connectionStuff.current.socket;
            var obsvoiceState = {
                overlayState: {
                    gameState: gameState.gameState,
                    players: gameState.players.map(function (o) {
                        var _a;
                        return ({
                            id: o.id,
                            clientId: o.clientId,
                            inVent: o.inVent,
                            isDead: o.isDead,
                            name: o.name,
                            colorId: o.colorId,
                            hatId: o.hatId,
                            petId: o.petId,
                            skinId: o.skinId,
                            visorId: o.visorId,
                            disconnected: o.disconnected,
                            isLocal: o.isLocal,
                            shiftedColor: o.shiftedColor,
                            bugged: o.bugged,
                            realColor: playerColors[o.colorId],
                            usingRadio: o.clientId === impostorRadioClientId.current && (myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.isImpostor),
                            connected: (playerSocketIdsRef.current[o.clientId] &&
                                ((_a = socketClients[playerSocketIdsRef.current[o.clientId]]) === null || _a === void 0 ? void 0 : _a.clientId) === o.clientId) ||
                                false
                        });
                    })
                },
                otherTalking: otherTalking,
                otherDead: otherDead,
                localTalking: talking,
                localIsAlive: !(myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.isDead),
                mod: gameState.mod,
                oldMeetingHud: gameState.oldMeetingHud
            };
            (_b = connectionStuff.current.overlaySocket) === null || _b === void 0 ? void 0 : _b.emit('signal', {
                to: settings.obsSecret,
                data: obsvoiceState
            });
        }
    }, [gameState]);
    // Add settings to settingsRef
    (0, react_1.useEffect)(function () {
        settingsRef.current = settings;
    }, [settings]);
    // Add socketClients to socketClientsRef
    (0, react_1.useEffect)(function () {
        socketClientsRef.current = socketClients;
    }, [socketClients]);
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d;
        if (((_b = (_a = connectionStuff.current) === null || _a === void 0 ? void 0 : _a.microphoneGain) === null || _b === void 0 ? void 0 : _b.gain) &&
            (settingsRef.current.microphoneGainEnabled || settingsRef.current.micSensitivityEnabled)) {
            if (!settingsRef.current.micSensitivityEnabled)
                connectionStuff.current.microphoneGain.gain.value = settings.microphoneGainEnabled
                    ? settings.microphoneGain / 100
                    : 1;
            if ((_d = (_c = connectionStuff.current) === null || _c === void 0 ? void 0 : _c.audioListener) === null || _d === void 0 ? void 0 : _d.options) {
                connectionStuff.current.audioListener.options.minNoiseLevel = settings.micSensitivity;
                connectionStuff.current.audioListener.init();
            }
        }
    }, [settings.microphoneGain, settings.micSensitivity]);
    var updateLobby = function () {
        var _a;
        console.log(gameState);
        if (!gameState ||
            !hostRef.current.isHost ||
            !gameState.lobbyCode ||
            gameState.gameState === AmongUsState_1.GameState.MENU ||
            !gameState.players) {
            return;
        }
        (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.emit('lobby', gameState.lobbyCode, {
            id: -1,
            title: lobbySettings.publicLobby_title,
            host: myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.name,
            current_players: gameState.players.length,
            max_players: gameState.maxPlayers,
            server: gameState.currentServer,
            language: lobbySettings.publicLobby_language,
            mods: gameState.mod,
            isPublic: lobbySettings.publicLobby_on,
            gameState: gameState.gameState
        });
    };
    (0, react_1.useEffect)(function () {
        var _a;
        if (gameState.isHost && gameState.hostId > 0) {
            (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.emit('setHost', gameState.lobbyCode, gameState.clientId);
            hostRef.current.serverHostId = gameState.hostId;
        }
    }, [gameState.isHost]);
    (0, react_1.useEffect)(function () {
        updateLobby();
    }, [
        gameState.gameState,
        (_b = gameState === null || gameState === void 0 ? void 0 : gameState.players) === null || _b === void 0 ? void 0 : _b.length,
        lobbySettings.publicLobby_title,
        lobbySettings.publicLobby_language,
        lobbySettings.publicLobby_on,
    ]);
    // Add lobbySettings to lobbySettingsRef
    (0, react_1.useEffect)(function () {
        lobbySettingsRef.current = lobbySettings;
    }, [lobbySettings]);
    // Set dead player data
    (0, react_1.useEffect)(function () {
        if (gameState.gameState === AmongUsState_1.GameState.LOBBY) {
            setOtherDead({});
        }
        else if (gameState.gameState !== AmongUsState_1.GameState.TASKS) {
            if (!gameState.players)
                return;
            setOtherDead(function (old) {
                for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
                    var player = _a[_i];
                    old[player.clientId] = player.isDead || player.disconnected;
                }
                return __assign({}, old);
            });
        }
    }, [gameState.gameState]);
    // const [audioContext] = useState<AudioContext>(() => new AudioContext());
    var connectionStuff = (0, react_1.useRef)({
        pushToTalkMode: settings.pushToTalkMode,
        deafened: false,
        muted: false,
        impostorRadio: null,
        toggleMute: function () {
            /*empty*/
        },
        toggleDeafen: function () {
            /*empty*/
        }
    });
    (0, react_1.useEffect)(function () {
        var handler = function (_event, camoActive) {
            console.log('Camoflager signal received:', camoActive);
            Object.values(audioElements.current).forEach(function (nodes) {
                nodes.gain.gain.value = camoActive ? 0 : 1;
            });
        };
        electron_1.ipcRenderer.on('camoflager-signal', handler);
        return function () {
            electron_1.ipcRenderer.removeListener('camoflager-signal', handler);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var context, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context = new AudioContext();
                        _a = convolverBuffer;
                        return [4 /*yield*/, context.decodeAudioData(reverb_ogx_1["default"])];
                    case 1:
                        _a.current = _b.sent();
                        return [4 /*yield*/, context.close()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    (0, react_1.useEffect)(function () {
        var pressing = connectionStuff.current.impostorRadio;
        if (pressing == null ||
            !myPlayer ||
            !myPlayer.isImpostor ||
            myPlayer.isDead ||
            !(impostorRadioClientId.current === myPlayer.clientId || impostorRadioClientId.current === -1) ||
            !lobbySettingsRef.current.impostorRadioEnabled) {
            return;
        }
        radioOnAudio.play();
        connectionStuff.current.impostorRadio = pressing;
        impostorRadioClientId.current = pressing ? myPlayer.clientId : -1;
        for (var _i = 0, _a = otherPlayers.filter(function (o) { return o.isImpostor && !o.bugged && !o.isDead; }); _i < _a.length; _i++) {
            var player = _a[_i];
            var peer = playerSocketIdsRef.current[player.clientId];
            var connection = peerConnections[peer];
            if (connection !== undefined && connection.writable)
                connection === null || connection === void 0 ? void 0 : connection.send(JSON.stringify({ impostorRadio: connectionStuff.current.impostorRadio }));
        }
    }, [connectionStuff.current.impostorRadio]);
    (0, react_1.useEffect)(function () {
        // (async function anyNameFunction() {
        var currentLobby = '';
        // Connect to voice relay server
        connectionStuff.current.socket = (0, socket_io_client_1["default"])(settings.serverURL, {
            transports: ['websocket']
        });
        var socket = connectionStuff.current.socket;
        socket.on('error', function (error) {
            if (error.message) {
                setError(error.message);
            }
            console.error('socketIO error:', error);
            currentLobby = 'MENU';
        });
        socket.on('connect', function () {
            setConnected(true);
            console.log('CONNECTED??');
        });
        socket.on('setHost', function (hostId) {
            hostRef.current.serverHostId = hostId;
        });
        socket.on('disconnect', function () {
            setConnected(false);
            currentLobby = 'MENU';
            console.log('DISCONNECTED??');
        });
        notifyMobilePlayers();
        var iceConfig = DEFAULT_ICE_CONFIG;
        socket.on('clientPeerConfig', function (clientPeerConfig) {
            if (!(0, validateClientPeerConfig_1.validateClientPeerConfig)(clientPeerConfig)) {
                var errorsFormatted = '';
                if (validateClientPeerConfig_1.validateClientPeerConfig.errors) {
                    errorsFormatted = validateClientPeerConfig_1.validateClientPeerConfig.errors
                        .map(function (error) { return error.dataPath + ' ' + error.message; })
                        .join('\n');
                }
                alert("Server sent a malformed peer config. Default config will be used. See errors below:\n".concat(errorsFormatted));
                return;
            }
            if (clientPeerConfig.forceRelayOnly &&
                !clientPeerConfig.iceServers.some(function (server) { return server.urls.toString().includes('turn:'); })) {
                alert('Server has forced relay mode enabled but provides no relay servers. Default config will be used.');
                return;
            }
            iceConfig = {
                iceTransportPolicy: clientPeerConfig.forceRelayOnly ? 'relay' : 'all',
                iceServers: clientPeerConfig.iceServers
            };
        });
        socket.on('VAD', function (data) {
            setOtherVAD(function (old) {
                var _a;
                return (__assign(__assign({}, old), (_a = {}, _a[data.client.clientId] = data.activity, _a)));
            });
        });
        socket.on('setClient', function (socketId, client) {
            setSocketClients(function (old) {
                var _a;
                return (__assign(__assign({}, old), (_a = {}, _a[socketId] = client, _a)));
            });
        });
        socket.on('setClients', function (clients) {
            setSocketClients(clients);
        });
        // Initialize variables
        var audioListener;
        var audio = {
            deviceId: undefined,
            autoGainControl: false,
            channelCount: 2,
            echoCancellation: settings.echoCancellation,
            latency: 0,
            noiseSuppression: settings.noiseSuppression,
            googNoiseSuppression: settings.noiseSuppression,
            googEchoCancellation: settings.echoCancellation,
            googTypingNoiseDetection: settings.noiseSuppression,
            sampleRate: settings.oldSampleDebug ? 48000 : undefined,
            sampleSize: settings.oldSampleDebug ? 16 : undefined
        };
        // Get microphone settings
        if (settingsRef.current.microphone.toLowerCase() !== 'default')
            audio.deviceId = settingsRef.current.microphone;
        navigator.mediaDevices.getUserMedia({ video: false, audio: audio })
            .then(function (inStream) { return __awaiter(_this, void 0, void 0, function () {
            function createPeerConnection(peer, initiator, client) {
                var _this = this;
                console.log('CreatePeerConnection: ', peer, initiator);
                disconnectClient(client);
                var connection = new simple_peer_1["default"]({
                    stream: stream,
                    initiator: initiator,
                    iceRestartEnabled: true,
                    config: settingsRef.current.natFix ? DEFAULT_ICE_CONFIG_TURN : iceConfig
                });
                setPeerConnections(function (connections) {
                    connections[peer] = connection;
                    return connections;
                });
                connection.on('connect', function () {
                    setTimeout(function () {
                        if (hostRef.current.isHost && connection.writable) {
                            try {
                                console.log('sending settings..');
                                connection.send(JSON.stringify(lobbySettingsRef.current));
                            }
                            catch (e) {
                                console.warn('failed to update lobby settings: ', e);
                            }
                        }
                    }, 1000);
                });
                connection.on('stream', function (stream) { return __awaiter(_this, void 0, void 0, function () {
                    var dummyAudio, context, source, dest, gain, pan, muffle, reverb, destination, audio;
                    return __generator(this, function (_a) {
                        console.log('ONSTREAM');
                        setAudioConnected(function (old) {
                            var _a;
                            return (__assign(__assign({}, old), (_a = {}, _a[peer] = true, _a)));
                        });
                        dummyAudio = new Audio();
                        dummyAudio.srcObject = stream;
                        context = new AudioContext();
                        source = context.createMediaStreamSource(stream);
                        dest = context.createMediaStreamDestination();
                        gain = context.createGain();
                        pan = context.createPanner();
                        gain.gain.value = 0;
                        pan.refDistance = 0.1;
                        pan.panningModel = 'equalpower';
                        pan.distanceModel = 'linear';
                        pan.maxDistance = maxDistanceRef.current;
                        pan.rolloffFactor = 1;
                        muffle = context.createBiquadFilter();
                        muffle.type = 'lowpass';
                        source.connect(pan);
                        pan.connect(gain);
                        reverb = context.createConvolver();
                        reverb.buffer = convolverBuffer.current;
                        destination = dest;
                        // if (settingsRef.current.vadEnabled) {
                        // 	VAD(context, gain, undefined, {
                        // 		onVoiceStart: () => setTalking(true),
                        // 		onVoiceStop: () => setTalking(false),
                        // 		stereo: false,
                        // 	});
                        // }
                        gain.connect(destination);
                        audio = document.createElement('audio');
                        document.body.appendChild(audio);
                        audio.setAttribute('autoplay', '');
                        audio.srcObject = dest.stream;
                        if (settingsRef.current.speaker.toLowerCase() !== 'default') {
                            audio.setSinkId(settingsRef.current.speaker);
                        }
                        audioElements.current[peer] = {
                            dummyAudioElement: dummyAudio,
                            audioElement: audio,
                            gain: gain,
                            pan: pan,
                            reverb: reverb,
                            muffle: muffle,
                            muffleConnected: false,
                            reverbConnected: false,
                            destination: destination
                        };
                        return [2 /*return*/];
                    });
                }); });
                connection.on('signal', function (data) {
                    socket.emit('signal', {
                        data: data,
                        to: peer
                    });
                });
                connection.on('data', function (data) {
                    var _a, _b;
                    var parsedData = JSON.parse(data);
                    if (parsedData.hasOwnProperty('impostorRadio')) {
                        var clientId = (_a = socketClientsRef.current[peer]) === null || _a === void 0 ? void 0 : _a.clientId;
                        if (impostorRadioClientId.current === -1 && parsedData['impostorRadio']) {
                            impostorRadioClientId.current = clientId;
                        }
                        else if (impostorRadioClientId.current === clientId && !parsedData['impostorRadio']) {
                            impostorRadioClientId.current = -1;
                        }
                        console.log('Recieved impostor radio request', parsedData);
                    }
                    if (parsedData.hasOwnProperty('maxDistance')) {
                        if (!hostRef.current || hostRef.current.parsedHostId !== ((_b = socketClientsRef.current[peer]) === null || _b === void 0 ? void 0 : _b.clientId))
                            return;
                        var newSettings = __assign(__assign({}, defaultlocalLobbySettings), parsedData);
                        setHostLobbySettings(newSettings);
                    }
                });
                connection.on('close', function () {
                    console.log('Disconnected from', peer, 'Initiator:', initiator);
                    disconnectPeer(peer);
                });
                connection.on('error', function () {
                    console.log('ONERROR');
                    /*empty*/
                });
                return connection;
            }
            var stream, ac, microphoneGain, source, connect;
            var _this = this;
            return __generator(this, function (_a) {
                stream = inStream;
                ac = new AudioContext();
                source = ac.createMediaStreamSource(inStream);
                if (settings.microphoneGainEnabled || settings.micSensitivityEnabled) {
                    console.log('Microphone volume or sensitivityEnabled..');
                    stream = (function () {
                        microphoneGain = ac.createGain();
                        var destination = ac.createMediaStreamDestination();
                        source.connect(microphoneGain);
                        microphoneGain.gain.value = settings.microphoneGainEnabled ? settings.microphoneGain / 100 : 1;
                        microphoneGain.connect(destination);
                        connectionStuff.current.microphoneGain = microphoneGain;
                        return destination.stream;
                    })();
                }
                if (settingsRef.current.vadEnabled) {
                    audioListener = (0, vad_1["default"])(ac, source, undefined, {
                        onVoiceStart: function () {
                            if (microphoneGain && settingsRef.current.micSensitivityEnabled) {
                                microphoneGain.gain.value = settingsRef.current.microphoneGainEnabled
                                    ? settingsRef.current.microphoneGain / 100
                                    : 1;
                            }
                            setTalking(true);
                        },
                        onVoiceStop: function () {
                            if (microphoneGain && settingsRef.current.micSensitivityEnabled) {
                                microphoneGain.gain.value = 0;
                            }
                            setTalking(false);
                        },
                        noiseCaptureDuration: 0,
                        stereo: false
                    });
                    audioListener.options.minNoiseLevel = settingsRef.current.micSensitivityEnabled
                        ? settingsRef.current.micSensitivity
                        : 0.15;
                    audioListener.options.maxNoiseLevel = 1;
                    audioListener.init();
                    connectionStuff.current.audioListener = audioListener;
                    connectionStuff.current.microphoneGain = microphoneGain;
                }
                connectionStuff.current.stream = stream;
                connectionStuff.current.instream = inStream;
                inStream.getAudioTracks()[0].enabled = settings.pushToTalkMode !== SettingsStore_1.pushToTalkOptions.PUSH_TO_TALK;
                connectionStuff.current.toggleDeafen = function () {
                    connectionStuff.current.deafened = !connectionStuff.current.deafened;
                    inStream.getAudioTracks()[0].enabled =
                        !connectionStuff.current.deafened &&
                            !connectionStuff.current.muted &&
                            connectionStuff.current.pushToTalkMode !== SettingsStore_1.pushToTalkOptions.PUSH_TO_TALK;
                    setDeafened(connectionStuff.current.deafened);
                };
                connectionStuff.current.toggleMute = function () {
                    connectionStuff.current.muted = !connectionStuff.current.muted;
                    if (connectionStuff.current.deafened) {
                        connectionStuff.current.deafened = false;
                        connectionStuff.current.muted = false;
                    }
                    inStream.getAudioTracks()[0].enabled =
                        !connectionStuff.current.muted &&
                            !connectionStuff.current.deafened &&
                            connectionStuff.current.pushToTalkMode !== SettingsStore_1.pushToTalkOptions.PUSH_TO_TALK;
                    setMuted(connectionStuff.current.muted);
                    setDeafened(connectionStuff.current.deafened);
                };
                electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.TOGGLE_DEAFEN, connectionStuff.current.toggleDeafen);
                electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.IMPOSTOR_RADIO, function (_, pressing) {
                    connectionStuff.current.impostorRadio = pressing;
                });
                electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.TOGGLE_MUTE, connectionStuff.current.toggleMute);
                electron_1.ipcRenderer.on(ipc_messages_1.IpcRendererMessages.PUSH_TO_TALK, function (_, pressing) {
                    if (connectionStuff.current.pushToTalkMode === SettingsStore_1.pushToTalkOptions.VOICE)
                        return;
                    if (!connectionStuff.current.deafened && !connectionStuff.current.muted) {
                        inStream.getAudioTracks()[0].enabled =
                            connectionStuff.current.pushToTalkMode === SettingsStore_1.pushToTalkOptions.PUSH_TO_TALK ? pressing : !pressing;
                    }
                });
                audioElements.current = {};
                connect = function (lobbyCode, playerId, clientId, isHost) {
                    console.log('connect called..', lobbyCode);
                    setOtherVAD({});
                    setOtherTalking({});
                    if (lobbyCode === 'MENU') {
                        Object.keys(peerConnections).forEach(function (k) {
                            disconnectPeer(k);
                        });
                        setSocketClients({});
                        currentLobby = lobbyCode;
                    }
                    else if (currentLobby !== lobbyCode) {
                        console.log('Currentlobby', currentLobby, lobbyCode);
                        socket.emit('leave');
                        socket.emit('id', playerId, clientId);
                        socket.emit('join', lobbyCode, playerId, clientId, isHost);
                        currentLobby = lobbyCode;
                    }
                };
                setConnect({ connect: connect });
                socket.on('join', function (peer, client) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        createPeerConnection(peer, true, client);
                        setSocketClients(function (old) {
                            var _a;
                            return (__assign(__assign({}, old), (_a = {}, _a[peer] = client, _a)));
                        });
                        return [2 /*return*/];
                    });
                }); });
                socket.on('signal', function (_a) {
                    var data = _a.data, from = _a.from, client = _a.client;
                    if (data.hasOwnProperty('mobilePlayerInfo')) {
                        // eslint-disable-line
                        var mobiledata = data;
                        if (mobiledata.mobilePlayerInfo.code === hostRef.current.code &&
                            hostRef.current.gamestate !== AmongUsState_1.GameState.MENU) {
                            hostRef.current.mobileRunning = true;
                            console.log('setting mobileRunning to true..');
                        }
                        return;
                    }
                    var connection;
                    if (!socketClientsRef.current[from]) {
                        console.warn('SIGNAL FROM UNKOWN SOCKET..');
                        return;
                    }
                    if (data.hasOwnProperty('type')) {
                        if (peerConnections[from] && data.type !== 'offer') {
                            connection = peerConnections[from];
                        }
                        else {
                            connection = createPeerConnection(from, false, client);
                        }
                        connection.signal(data);
                    }
                });
                return [2 /*return*/];
            });
        }); }, function (error) {
            console.error(error);
            setError("Couldn't connect to your microphone:\n" + error);
            // ipcRenderer.send(IpcMessages.SHOW_ERROR_DIALOG, {
            // 	title: 'Error',
            // 	content: 'Couldn\'t connect to your microphone:\n' + error
            // });
        });
        return function () {
            var _a;
            hostRef.current.mobileRunning = false;
            socket.emit('leave');
            Object.keys(peerConnections).forEach(function (k) {
                disconnectPeer(k);
            });
            (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.close();
            audioListener === null || audioListener === void 0 ? void 0 : audioListener.destroy();
        };
        // })();
    }, []);
    //data: { mobilePlayerInfo: { code: this.gamecode, askingForHost: true }
    var myPlayer = (0, react_1.useMemo)(function () {
        if (!gameState || !gameState.players) {
            return undefined;
        }
        else {
            return gameState.players.find(function (p) { return p.isLocal; });
        }
    }, [gameState.players]);
    var otherPlayers = (0, react_1.useMemo)(function () {
        var _a, _b;
        var otherPlayers;
        if (!gameState || !gameState.players || !myPlayer)
            return [];
        else
            otherPlayers = gameState.players.filter(function (p) { return !p.isLocal; });
        maxDistanceRef.current = lobbySettings.visionHearing
            ? myPlayer.isImpostor
                ? lobbySettings.maxDistance
                : gameState.lightRadius + 0.5
            : lobbySettings.maxDistance;
        if (maxDistanceRef.current <= 0.6) {
            maxDistanceRef.current = 1;
        }
        hostRef.current = {
            map: gameState.map,
            mobileRunning: hostRef.current.mobileRunning,
            gamestate: gameState.gameState,
            code: gameState.lobbyCode,
            hostId: gameState.hostId,
            isHost: gameState.hostId > 0 ? gameState.isHost : hostRef.current.serverHostId === gameState.clientId,
            parsedHostId: gameState.hostId > 0 ? gameState.hostId : hostRef.current.serverHostId,
            serverHostId: hostRef.current.serverHostId
        };
        var playerSocketIds = {};
        for (var _i = 0, _c = Object.keys(socketClients); _i < _c.length; _i++) {
            var k = _c[_i];
            playerSocketIds[socketClients[k].clientId] = k;
        }
        playerSocketIdsRef.current = playerSocketIds;
        var handledPeerIds = [];
        var foundRadioUser = false;
        var tempTalking = __assign({}, otherTalking);
        var talkingUpdate = false;
        for (var _d = 0, otherPlayers_1 = otherPlayers; _d < otherPlayers_1.length; _d++) {
            var player = otherPlayers_1[_d];
            var peerId = playerSocketIds[player.clientId];
            var audio = player.clientId === myPlayer.clientId ? undefined : audioElements.current[peerId];
            if (player.clientId === impostorRadioClientId.current &&
                player.isImpostor &&
                !player.isDead &&
                !player.disconnected &&
                !player.bugged) {
                foundRadioUser = true;
            }
            if (audio) {
                handledPeerIds.push(peerId);
                var gain = calculateVoiceAudio(gameState, settingsRef.current, myPlayer, player, audio);
                if (connectionStuff.current.deafened || ((_a = playerConfigs[player.nameHash]) === null || _a === void 0 ? void 0 : _a.isMuted)) {
                    gain = 0;
                }
                if (gain > 0) {
                    var playerVolume = (_b = playerConfigs[player.nameHash]) === null || _b === void 0 ? void 0 : _b.volume;
                    gain = playerVolume === undefined ? gain : gain * playerVolume;
                    if (myPlayer.isDead && !player.isDead) {
                        gain = gain * (settings.crewVolumeAsGhost / 100);
                    }
                    gain = gain * (settings.masterVolume / 100);
                }
                audio.gain.gain.value = gain;
                tempTalking[player.clientId] = otherVAD[player.clientId] && gain > 0;
                if (tempTalking[player.clientId] != otherTalking[player.clientId]) {
                    talkingUpdate = true;
                }
            }
        }
        if (talkingUpdate) {
            setOtherTalking(tempTalking);
        }
        if (((!foundRadioUser && impostorRadioClientId.current !== myPlayer.clientId) || !myPlayer.isImpostor) &&
            impostorRadioClientId.current !== -1) {
            impostorRadioClientId.current = -1;
        }
        for (var peerId in Object.keys(audioElements.current).filter(function (e) { return !handledPeerIds.includes(e); })) {
            var audio = audioElements.current[peerId];
            if (audio && audio.gain) {
                audio.gain.gain.value = 0;
            }
            // maybe disconnect later
        }
        return otherPlayers;
    }, [gameState]);
    // Connect to P2P negotiator, when lobby and connect code change
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (connect === null || connect === void 0 ? void 0 : connect.connect) {
            connect.connect((_a = gameState === null || gameState === void 0 ? void 0 : gameState.lobbyCode) !== null && _a !== void 0 ? _a : 'MENU', (_b = myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.id) !== null && _b !== void 0 ? _b : 0, gameState.clientId, gameState.isHost);
            updateLobby();
        }
    }, [connect === null || connect === void 0 ? void 0 : connect.connect, gameState === null || gameState === void 0 ? void 0 : gameState.lobbyCode, connected]);
    (0, react_1.useEffect)(function () {
        var _a;
        if ((myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.shiftedColor) != -1) {
            (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.emit('VAD', false);
            setTalking(false);
        }
    }, [myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.shiftedColor]);
    (0, react_1.useEffect)(function () {
        var _a;
        if ((myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.shiftedColor) == -1 || !talking)
            (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.emit('VAD', talking);
    }, [talking]);
    // Connect to P2P negotiator, when game mode change
    (0, react_1.useEffect)(function () {
        var _a;
        if ((connect === null || connect === void 0 ? void 0 : connect.connect) &&
            gameState.lobbyCode &&
            (myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.clientId) !== undefined &&
            gameState.gameState === AmongUsState_1.GameState.LOBBY &&
            (gameState.oldGameState === AmongUsState_1.GameState.DISCUSSION || gameState.oldGameState === AmongUsState_1.GameState.TASKS)) {
            hostRef.current.mobileRunning = false;
            connect.connect(gameState.lobbyCode, myPlayer.clientId, gameState.clientId, gameState.isHost);
        }
        else if (gameState.oldGameState !== AmongUsState_1.GameState.UNKNOWN &&
            gameState.oldGameState !== AmongUsState_1.GameState.MENU &&
            gameState.gameState === AmongUsState_1.GameState.MENU) {
            console.log('DISCONNECT TO MENU!');
            // On change from a game to menu, exit from the current game properly
            hostRef.current.mobileRunning = false; // On change from a game to menu, exit from the current game properly
            (_a = connectionStuff.current.socket) === null || _a === void 0 ? void 0 : _a.emit('leave');
            Object.keys(peerConnections).forEach(function (k) {
                disconnectPeer(k);
            });
            setOtherDead({});
        }
    }, [gameState.gameState]);
    // Emit player id to socket
    (0, react_1.useEffect)(function () {
        if (connectionStuff.current.socket && myPlayer && myPlayer.clientId !== undefined) {
            connectionStuff.current.socket.emit('id', myPlayer.id, gameState.clientId);
        }
    }, [myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.id, myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.clientId]);
    // Pass voice state to overlay
    (0, react_1.useEffect)(function () {
        if (!settings.enableOverlay) {
            return;
        }
        electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, ipc_messages_1.IpcOverlayMessages.NOTIFY_VOICE_STATE_CHANGED, {
            otherTalking: otherTalking,
            playerSocketIds: playerSocketIdsRef.current,
            otherDead: otherDead,
            socketClients: socketClients,
            audioConnected: audioConnected,
            localTalking: talking,
            localIsAlive: !(myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.isDead),
            impostorRadioClientId: !(myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.isImpostor) ? -1 : impostorRadioClientId.current,
            muted: mutedState,
            deafened: deafenedState,
            mod: gameState.mod
        });
    }, [
        otherTalking,
        otherDead,
        socketClients,
        audioConnected,
        talking,
        mutedState,
        deafenedState,
        impostorRadioClientId.current,
    ]);
    return (react_1["default"].createElement("div", { className: classes.root },
        (error || initialError) && (react_1["default"].createElement("div", { className: classes.error },
            react_1["default"].createElement(Typography_1["default"], { align: "center", variant: "h6", color: "error" }, "ERROR"),
            react_1["default"].createElement(Typography_1["default"], { align: "center", style: { whiteSpace: 'pre-wrap' } },
                error,
                initialError),
            react_1["default"].createElement(SupportLink_1["default"], null))),
        (!error && !initialError) && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: classes.top },
                myPlayer && gameState.lobbyCode !== 'MENU' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", { className: classes.avatarWrapper },
                        react_1["default"].createElement(Avatar_1["default"], { deafened: deafenedState, muted: mutedState, player: myPlayer, borderColor: (myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.shiftedColor) == -1 ? '#2ecc71' : 'gray', connectionState: connected ? 'connected' : 'disconnected', isUsingRadio: (myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.isImpostor) && impostorRadioClientId.current === myPlayer.clientId, talking: talking, isAlive: !myPlayer.isDead, size: 100, mod: gameState.mod })))),
                react_1["default"].createElement("div", { className: classes.right },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("div", { className: classes.left },
                            myPlayer && (gameState === null || gameState === void 0 ? void 0 : gameState.gameState) !== AmongUsState_1.GameState.MENU && (react_1["default"].createElement("span", { className: classes.username }, myPlayer.name)),
                            react_1["default"].createElement("span", { className: classes.code, style: {
                                    background: gameState.lobbyCode === 'MENU' ? 'transparent' : '#3e4346'
                                } }, displayedLobbyCode === 'MENU' ? t('game.menu') : displayedLobbyCode)),
                        gameState.lobbyCode !== 'MENU' && (react_1["default"].createElement("div", { className: classes.muteButtons },
                            react_1["default"].createElement(IconButton_1["default"], { onClick: connectionStuff.current.toggleMute, size: "small" }, mutedState || deafenedState ? react_1["default"].createElement(MicOff_1["default"], null) : react_1["default"].createElement(Mic_1["default"], null)),
                            react_1["default"].createElement(IconButton_1["default"], { onClick: connectionStuff.current.toggleDeafen, size: "small" }, deafenedState ? react_1["default"].createElement(VolumeOff_1["default"], null) : react_1["default"].createElement(VolumeUp_1["default"], null))))))),
            lobbySettings.deadOnly && (react_1["default"].createElement("div", { className: classes.top },
                react_1["default"].createElement("small", { style: { padding: 0 } }, t('settings.lobbysettings.ghost_only_warning2')))),
            lobbySettings.meetingGhostOnly && (react_1["default"].createElement("div", { className: classes.top },
                react_1["default"].createElement("small", { style: { padding: 0 } }, t('settings.lobbysettings.meetings_only_warning2')))),
            gameState.lobbyCode && react_1["default"].createElement(Divider_1["default"], null),
            displayedLobbyCode === 'MENU' && (react_1["default"].createElement("div", { className: classes.top },
                react_1["default"].createElement(Button_1["default"], { style: { margin: '10px' }, onClick: function () {
                        electron_1.ipcRenderer.send(ipc_messages_1.IpcHandlerMessages.OPEN_LOBBYBROWSER);
                    }, color: "primary", variant: "outlined" }, t('buttons.public_lobby')))),
            myPlayer && gameState.lobbyCode !== 'MENU' && (react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 1, className: classes.otherplayers, alignItems: "flex-start", alignContent: "flex-start", justifyContent: "flex-start" }, otherPlayers.map(function (player) {
                var _a;
                var peer = playerSocketIdsRef.current[player.clientId];
                var connected = ((_a = socketClients[peer]) === null || _a === void 0 ? void 0 : _a.clientId) === player.clientId || false;
                var audio = audioConnected[peer];
                if (!playerConfigs[player.nameHash]) {
                    playerConfigs[player.nameHash] = { volume: 1, isMuted: false };
                }
                var socketConfig = playerConfigs[player.nameHash];
                return (react_1["default"].createElement(Grid_1["default"], { item: true, key: player.id, xs: getPlayersPerRow(otherPlayers.length) },
                    react_1["default"].createElement(Avatar_1["default"], { connectionState: !connected ? 'disconnected' : audio ? 'connected' : 'novoice', player: player, talking: !player.inVent && otherTalking[player.clientId], borderColor: "#2ecc71", isAlive: !otherDead[player.clientId], isUsingRadio: (myPlayer === null || myPlayer === void 0 ? void 0 : myPlayer.isImpostor) &&
                            !(player.disconnected || player.bugged) &&
                            impostorRadioClientId.current === player.clientId, size: 50, socketConfig: socketConfig, onConfigChange: function () { return setSetting("playerConfigMap.".concat(player.nameHash), playerConfigs[player.nameHash]); }, mod: gameState.mod })));
            }))))),
        otherPlayers.length <= 6 && react_1["default"].createElement(Footer_1["default"], null)));
};
function getPlayersPerRow(playerCount) {
    if (playerCount <= 9)
        return (12 / 3);
    else
        return Math.min(12, Math.floor(12 / Math.ceil(Math.sqrt(playerCount))));
}
return (react_1["default"].createElement("div", { className: classes.root }, (error || initialError) && (react_1["default"].createElement("div", { className: classes.error },
    react_1["default"].createElement(Typography_1["default"], { align: "center", variant: "h6", color: "error" }, "ERROR"),
    react_1["default"].createElement(Typography_1["default"], { align: "center", style: { whiteSpace: 'pre-wrap' } },
        error,
        initialError),
    react_1["default"].createElement(SupportLink_1["default"], null)))));
;
exports["default"] = Voice;
