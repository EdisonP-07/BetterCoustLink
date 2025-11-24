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
var memoryjs_1 = require("memoryjs");
var structron_1 = require("structron");
var ipc_messages_1 = require("../common/ipc-messages");
var AmongUsState_1 = require("../common/AmongUsState");
var offsetStore_1 = require("./offsetStore");
var Errors_1 = require("../common/Errors");
var AmongusMap_1 = require("../common/AmongusMap");
var avatarGenerator_1 = require("./avatarGenerator");
var cosmetics_1 = require("../renderer/cosmetics");
var os_1 = require("os");
var fs_1 = require("fs");
var path_1 = require("path");
var Mods_1 = require("../common/Mods");
var electron_1 = require("electron");
var appVersion = '';
if (process.env.NODE_ENV !== 'production') {
    appVersion = 'DEV';
}
else {
    appVersion = electron_1.app.getVersion();
}
var GameReader = /** @class */ (function () {
    function GameReader(sendIPC) {
        this.initializedWrite = false;
        this.writtenPingMessage = true;
        this.menuUpdateTimer = 20;
        this.lastPlayerPtr = 0;
        this.shouldReadLobby = false;
        this.is_64bit = false;
        this.is_linux = false;
        this.oldGameState = AmongUsState_1.GameState.UNKNOWN;
        this.lastState = {};
        this.amongUs = null;
        this.gameAssembly = null;
        this.colorsInitialized = false;
        this.rainbowColor = -9999;
        this.gameCode = 'MENU';
        this.shellcodeAddr = -1;
        this.currentServer = '';
        this.disableWriting = false;
        this.pid = -1;
        this.loadedMod = Mods_1.modList[0];
        this.gamePath = '';
        this.oldMeetingHud = false;
        this.playercolors = [];
        this.checkProcessDelay = 0;
        this.isLocalGame = false;
        this.skipPingMessage = 25;
        this.is_linux = (0, os_1.platform)() === 'linux';
        this.sendIPC = sendIPC;
    }
    GameReader.prototype.checkProcessOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var processesOpen, error, reset, _i, processesOpen_1, processOpen, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        processesOpen = (0, memoryjs_1.getProcesses)().filter(function (p) { return p.szExeFile === 'Among Us.exe'; });
                        error = '';
                        reset = this.amongUs && processesOpen.filter(function (o) { return o.th32ProcessID === _this.pid; }).length === 0;
                        if (!((!this.amongUs || reset) && processesOpen.length > 0)) return [3 /*break*/, 7];
                        _i = 0, processesOpen_1 = processesOpen;
                        _a.label = 1;
                    case 1:
                        if (!(_i < processesOpen_1.length)) return [3 /*break*/, 6];
                        processOpen = processesOpen_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.pid = processOpen.th32ProcessID;
                        this.amongUs = (0, memoryjs_1.openProcess)(processOpen.th32ProcessID);
                        this.gameAssembly = (0, memoryjs_1.findModule)('GameAssembly.dll', this.amongUs.th32ProcessID);
                        this.gamePath = (0, memoryjs_1.getProcessPath)(this.amongUs.handle);
                        this.loadedMod = this.getInstalledMods(this.gamePath);
                        return [4 /*yield*/, this.initializeoffsets()];
                    case 3:
                        _a.sent();
                        this.sendIPC(ipc_messages_1.IpcRendererMessages.NOTIFY_GAME_OPENED, true);
                        return [3 /*break*/, 6];
                    case 4:
                        e_1 = _a.sent();
                        console.log('ERROR:', e_1);
                        if (processOpen && String(e_1) === 'Error: unable to find process') {
                            error = Errors_1["default"].OPEN_AS_ADMINISTRATOR;
                        }
                        else {
                            error = String(e_1);
                        }
                        this.amongUs = null;
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        if (!this.amongUs && error) {
                            throw error;
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        if (this.amongUs && (processesOpen.length === 0 || reset)) {
                            this.amongUs = null;
                            try {
                                this.sendIPC(ipc_messages_1.IpcRendererMessages.NOTIFY_GAME_OPENED, false);
                            }
                            catch (e) {
                                /*empty*/
                            }
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    GameReader.prototype.getInstalledMods = function (filePath) {
        var pathLower = filePath.toLowerCase();
        if (pathLower.includes('?\\volume')) {
            return Mods_1.modList[0];
        }
        else {
            var dir = path_1["default"].dirname(filePath);
            if (!fs_1["default"].existsSync(path_1["default"].join(dir, 'winhttp.dll')) || !fs_1["default"].existsSync(path_1["default"].join(dir, 'BepInEx', 'plugins'))) {
                return Mods_1.modList[0];
            }
            var _loop_1 = function (file) {
                console.log("MOD! ".concat(file));
                var mod = Mods_1.modList.find(function (o) { return o.dllStartsWith && file.includes(o.dllStartsWith); });
                if (mod)
                    return { value: mod };
            };
            for (var _i = 0, _a = fs_1["default"].readdirSync(path_1["default"].join(dir, 'BepInEx', 'plugins')); _i < _a.length; _i++) {
                var file = _a[_i];
                var state_1 = _loop_1(file);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return Mods_1.modList[0];
        }
    };
    GameReader.prototype.loop = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var e_2, state, meetingHud, meetingHud_cachePtr, meetingHudState, innerNetClient, gameState, lobbyCodeInt, allPlayersPtr, allPlayers, playerCount, playerAddrPtr, players, hostId, clientId, lightRadius, comsSabotaged_1, currentCamera, map_1, maxPlayers, closedDoors_1, localPlayer, i, _b, address, last, playerData, player, gameOptionsPtr, shipPtr, systemsPtr, minigamePtr, minigameCachePtr, currentCameraId, camarasCount, roomCount, dist, allDoors, doorCount, doorNr, door, doorOpen, lobbyCode, newState;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.checkProcessDelay-- <= 0)) return [3 /*break*/, 4];
                        this.checkProcessDelay = 30;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.checkProcessOpen()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _c.sent();
                        this.checkProcessDelay = 0;
                        return [2 /*return*/, String(e_2)];
                    case 4:
                        if (this.PlayerStruct &&
                            this.offsets &&
                            this.amongUs !== null &&
                            this.gameAssembly !== null &&
                            this.offsets !== undefined) {
                            this.loadColors();
                            state = AmongUsState_1.GameState.UNKNOWN;
                            meetingHud = this.readMemory('pointer', this.gameAssembly.modBaseAddr, this.offsets.meetingHud);
                            meetingHud_cachePtr = meetingHud === 0 ? 0 : this.readMemory('pointer', meetingHud, this.offsets.objectCachePtr);
                            meetingHudState = meetingHud_cachePtr === 0 ? 4 : this.readMemory('int', meetingHud, this.offsets.meetingHudState, 4);
                            innerNetClient = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.innerNetClient.base);
                            gameState = this.readMemory('int', innerNetClient, this.offsets.innerNetClient.gameState);
                            switch (gameState) {
                                case 0:
                                    state = AmongUsState_1.GameState.MENU;
                                    break;
                                case 1:
                                case 3:
                                    state = AmongUsState_1.GameState.LOBBY;
                                    break;
                                default:
                                    if (meetingHudState < 4)
                                        state = AmongUsState_1.GameState.DISCUSSION;
                                    else
                                        state = AmongUsState_1.GameState.TASKS;
                                    break;
                            }
                            lobbyCodeInt = state === AmongUsState_1.GameState.MENU
                                ? -1
                                : this.readMemory('int32', innerNetClient, this.offsets.innerNetClient.gameId);
                            this.gameCode =
                                state === AmongUsState_1.GameState.MENU
                                    ? ''
                                    : lobbyCodeInt === this.lastState.lobbyCodeInt
                                        ? this.gameCode
                                        : this.IntToGameCode(lobbyCodeInt);
                            allPlayersPtr = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.allPlayersPtr);
                            allPlayers = this.readMemory('ptr', allPlayersPtr, this.offsets.allPlayers);
                            playerCount = this.readMemory('int', allPlayersPtr, this.offsets.playerCount);
                            playerAddrPtr = allPlayers + this.offsets.playerAddrPtr;
                            players = [];
                            hostId = this.readMemory('uint32', innerNetClient, this.offsets.innerNetClient.hostId);
                            clientId = this.readMemory('uint32', innerNetClient, this.offsets.innerNetClient.clientId);
                            this.isLocalGame = lobbyCodeInt === 32; // is local game
                            lightRadius = 1;
                            comsSabotaged_1 = false;
                            currentCamera = AmongusMap_1.CameraLocation.NONE;
                            map_1 = AmongusMap_1.MapType.UNKNOWN;
                            maxPlayers = 10;
                            closedDoors_1 = [];
                            localPlayer = undefined;
                            if (this.currentServer === '' ||
                                (this.oldGameState != state &&
                                    (this.oldGameState === AmongUsState_1.GameState.MENU || this.oldGameState === AmongUsState_1.GameState.UNKNOWN))) {
                                this.readCurrentServer();
                            }
                            if ((this.gameCode || this.isLocalGame) && playerCount) {
                                for (i = 0; i < Math.min(playerCount, 40); i++) {
                                    _b = this.offsetAddress(playerAddrPtr, this.offsets.player.offsets), address = _b.address, last = _b.last;
                                    if (address === 0)
                                        continue;
                                    playerData = (0, memoryjs_1.readBuffer)(this.amongUs.handle, address + last, this.offsets.player.bufferLength);
                                    player = this.parsePlayer(address + last, playerData, clientId);
                                    playerAddrPtr += this.is_64bit ? 8 : 4;
                                    if (!player || state === AmongUsState_1.GameState.MENU) {
                                        continue;
                                    }
                                    if (this.isLocalGame && player.clientId == hostId) {
                                        this.gameCode = ((player.nameHash % 99999)).toString();
                                    }
                                    if (player.isLocal) {
                                        localPlayer = player;
                                    }
                                    players.push(player);
                                }
                                if (localPlayer) {
                                    this.fixPingMessage();
                                    lightRadius = this.readMemory('float', localPlayer.objectPtr, this.offsets.lightRadius, -1);
                                }
                                gameOptionsPtr = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.gameoptionsData);
                                maxPlayers = this.readMemory('byte', gameOptionsPtr, this.offsets.gameOptions_MaxPLayers);
                                map_1 = this.readMemory('byte', gameOptionsPtr, this.offsets.gameOptions_MapId);
                                if (state === AmongUsState_1.GameState.TASKS) {
                                    shipPtr = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.shipStatus);
                                    systemsPtr = this.readMemory('ptr', shipPtr, this.offsets.shipStatus_systems);
                                    if (systemsPtr !== 0 && state === AmongUsState_1.GameState.TASKS) {
                                        this.readDictionary(systemsPtr, 47, function (k, v) {
                                            var key = _this.readMemory('int32', k);
                                            if (key === 14) {
                                                var value = _this.readMemory('ptr', v);
                                                switch (map_1) {
                                                    case AmongusMap_1.MapType.AIRSHIP:
                                                    case AmongusMap_1.MapType.POLUS:
                                                    case AmongusMap_1.MapType.FUNGLE:
                                                    case AmongusMap_1.MapType.THE_SKELD:
                                                    case AmongusMap_1.MapType.SUBMERGED: {
                                                        comsSabotaged_1 =
                                                            _this.readMemory('uint32', value, _this.offsets.HudOverrideSystemType_isActive) === 1;
                                                        break;
                                                    }
                                                    case AmongusMap_1.MapType.MIRA_HQ: {
                                                        comsSabotaged_1 =
                                                            _this.readMemory('uint32', value, _this.offsets.hqHudSystemType_CompletedConsoles) < 2;
                                                    }
                                                }
                                            }
                                            else if (key === 18 && map_1 === AmongusMap_1.MapType.MIRA_HQ) {
                                                //SystemTypes Decontamination
                                                var value = _this.readMemory('ptr', v);
                                                var lowerDoorOpen = _this.readMemory('int', value, _this.offsets.deconDoorLowerOpen);
                                                var upperDoorOpen = _this.readMemory('int', value, _this.offsets.deconDoorUpperOpen);
                                                if (!lowerDoorOpen) {
                                                    closedDoors_1.push(0);
                                                }
                                                if (!upperDoorOpen) {
                                                    closedDoors_1.push(1);
                                                }
                                            }
                                        });
                                    }
                                    minigamePtr = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.miniGame);
                                    minigameCachePtr = this.readMemory('ptr', minigamePtr, this.offsets.objectCachePtr);
                                    if (minigameCachePtr && minigameCachePtr !== 0 && localPlayer) {
                                        if (map_1 === AmongusMap_1.MapType.POLUS || map_1 === AmongusMap_1.MapType.AIRSHIP) {
                                            currentCameraId = this.readMemory('uint32', minigamePtr, this.offsets.planetSurveillanceMinigame_currentCamera);
                                            camarasCount = this.readMemory('uint32', minigamePtr, this.offsets.planetSurveillanceMinigame_camarasCount);
                                            if (currentCameraId >= 0 && currentCameraId <= 5 && camarasCount === 6) {
                                                currentCamera = currentCameraId;
                                            }
                                        }
                                        else if (map_1 === AmongusMap_1.MapType.THE_SKELD) {
                                            roomCount = this.readMemory('uint32', minigamePtr, this.offsets.surveillanceMinigame_FilteredRoomsCount);
                                            if (roomCount === 4) {
                                                dist = Math.sqrt(Math.pow(localPlayer.x - -12.9364, 2) + Math.pow(localPlayer.y - -2.7928, 2));
                                                if (dist < 0.6) {
                                                    currentCamera = AmongusMap_1.CameraLocation.Skeld;
                                                }
                                            }
                                        }
                                    }
                                    if (map_1 !== AmongusMap_1.MapType.MIRA_HQ) {
                                        allDoors = this.readMemory('ptr', shipPtr, this.offsets.shipstatus_allDoors);
                                        doorCount = Math.min(this.readMemory('int', allDoors, this.offsets.playerCount), 16);
                                        for (doorNr = 0; doorNr < doorCount; doorNr++) {
                                            door = this.readMemory('ptr', allDoors + this.offsets.playerAddrPtr + doorNr * (this.is_64bit ? 0x8 : 0x4));
                                            doorOpen = this.readMemory('int', door + this.offsets.door_isOpen) === 1;
                                            //	const doorId = this.readMemory<number>('int', door + this.offsets.door_doorId);
                                            //console.log(doorId);
                                            if (!doorOpen) {
                                                closedDoors_1.push(doorNr);
                                            }
                                        }
                                    }
                                }
                                //	console.log('doorcount: ', doorCount, doorsOpen);
                            }
                            // if (this.oldGameState === GameState.DISCUSSION && state === GameState.TASKS) {
                            // 	if (impostors === 0 || impostors >= crewmates) {
                            // 		this.exileCausesEnd = true;
                            // 		state = GameState.LOBBY;
                            // 	}
                            // }
                            if (this.oldGameState === AmongUsState_1.GameState.MENU &&
                                state === AmongUsState_1.GameState.LOBBY &&
                                this.menuUpdateTimer > 0 &&
                                (this.lastPlayerPtr === allPlayers || !players.find(function (p) { return p.isLocal; }))) {
                                state = AmongUsState_1.GameState.MENU;
                                this.menuUpdateTimer--;
                            }
                            else {
                                this.menuUpdateTimer = 20;
                                this.lastPlayerPtr = allPlayers;
                            }
                            lobbyCode = state !== AmongUsState_1.GameState.MENU ? this.gameCode || 'MENU' : 'MENU';
                            newState = {
                                lobbyCode: lobbyCode,
                                lobbyCodeInt: lobbyCodeInt,
                                players: players,
                                gameState: lobbyCode === 'MENU' ? AmongUsState_1.GameState.MENU : state,
                                oldGameState: this.oldGameState,
                                isHost: (hostId && clientId && hostId === clientId),
                                hostId: hostId,
                                clientId: clientId,
                                comsSabotaged: comsSabotaged_1,
                                currentCamera: currentCamera,
                                lightRadius: lightRadius,
                                lightRadiusChanged: lightRadius != ((_a = this.lastState) === null || _a === void 0 ? void 0 : _a.lightRadius),
                                map: map_1,
                                mod: this.loadedMod.id,
                                closedDoors: closedDoors_1,
                                currentServer: this.currentServer,
                                maxPlayers: maxPlayers,
                                oldMeetingHud: this.oldMeetingHud
                            };
                            //	const stateHasChanged = !equal(this.lastState, newState);
                            if (state !== AmongUsState_1.GameState.MENU || this.oldGameState !== AmongUsState_1.GameState.MENU) {
                                try {
                                    this.sendIPC(ipc_messages_1.IpcRendererMessages.NOTIFY_GAME_STATE_CHANGED, newState);
                                }
                                catch (e) {
                                    process.exit(0);
                                }
                            }
                            this.lastState = newState;
                            this.oldGameState = state;
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    GameReader.prototype.initializeoffsets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var offsetLookups, broadcastVersionAddr, broadcastVersion, _a, _b, innerNetClient, meetingHud, gameData, shipStatus, miniGame, palette, playerControl, gameOptionsManager, _i, _c, member;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('INITIALIZEOFFSETS???');
                        this.is_64bit = this.isX64Version();
                        this.shellcodeAddr = -1;
                        this.initializedWrite = false;
                        this.disableWriting = false;
                        return [4 /*yield*/, (0, offsetStore_1.fetchOffsetLookup)()];
                    case 1:
                        offsetLookups = _d.sent();
                        broadcastVersionAddr = undefined;
                        if (this.is_64bit) {
                            broadcastVersionAddr = this.findPattern(offsetLookups.patterns.x64.broadcastVersion.sig, offsetLookups.patterns.x64.broadcastVersion.patternOffset, offsetLookups.patterns.x64.broadcastVersion.addressOffset, false, true);
                        }
                        else {
                            broadcastVersionAddr = this.findPattern(offsetLookups.patterns.x86.broadcastVersion.sig, offsetLookups.patterns.x86.broadcastVersion.patternOffset, offsetLookups.patterns.x86.broadcastVersion.addressOffset, false, true);
                        }
                        broadcastVersion = this.readMemory('int', this.gameAssembly.modBaseAddr, broadcastVersionAddr);
                        console.log("broadcastVersion: ", broadcastVersion);
                        if (!offsetLookups.versions[broadcastVersion]) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, (0, offsetStore_1.fetchOffsets)(this.is_64bit, offsetLookups.versions[broadcastVersion].file, offsetLookups.versions[broadcastVersion].offsetsVersion)];
                    case 2:
                        _a.offsets = _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = this;
                        return [4 /*yield*/, (0, offsetStore_1.fetchOffsets)(this.is_64bit, offsetLookups.versions["default"].file, offsetLookups.versions["default"].offsetsVersion)];
                    case 4:
                        _b.offsets = _d.sent(); // can't find file for this client, return default
                        _d.label = 5;
                    case 5:
                        this.disableWriting = this.offsets.disableWriting;
                        this.oldMeetingHud = this.offsets.oldMeetingHud;
                        innerNetClient = this.findPattern(this.offsets.signatures.innerNetClient.sig, this.offsets.signatures.innerNetClient.patternOffset, this.offsets.signatures.innerNetClient.addressOffset);
                        meetingHud = this.findPattern(this.offsets.signatures.meetingHud.sig, this.offsets.signatures.meetingHud.patternOffset, this.offsets.signatures.meetingHud.addressOffset);
                        gameData = this.findPattern(this.offsets.signatures.gameData.sig, this.offsets.signatures.gameData.patternOffset, this.offsets.signatures.gameData.addressOffset);
                        shipStatus = this.findPattern(this.offsets.signatures.shipStatus.sig, this.offsets.signatures.shipStatus.patternOffset, this.offsets.signatures.shipStatus.addressOffset);
                        miniGame = this.findPattern(this.offsets.signatures.miniGame.sig, this.offsets.signatures.miniGame.patternOffset, this.offsets.signatures.miniGame.addressOffset);
                        palette = this.findPattern(this.offsets.signatures.palette.sig, this.offsets.signatures.palette.patternOffset, this.offsets.signatures.palette.addressOffset);
                        playerControl = this.findPattern(this.offsets.signatures.playerControl.sig, this.offsets.signatures.playerControl.patternOffset, this.offsets.signatures.playerControl.addressOffset);
                        if (this.offsets.newGameOptions) {
                            gameOptionsManager = this.findPattern(this.offsets.signatures.gameOptionsManager.sig, this.offsets.signatures.gameOptionsManager.patternOffset, this.offsets.signatures.gameOptionsManager.addressOffset);
                            this.offsets.gameoptionsData[0] = gameOptionsManager;
                        }
                        else {
                            this.offsets.gameoptionsData[0] = playerControl;
                        }
                        this.offsets.palette[0] = palette;
                        this.offsets.meetingHud[0] = meetingHud;
                        this.offsets.allPlayersPtr[0] = gameData;
                        this.offsets.innerNetClient.base[0] = innerNetClient;
                        this.offsets.shipStatus[0] = shipStatus;
                        this.offsets.miniGame[0] = miniGame;
                        if (!this.is_64bit) {
                            this.offsets.connectFunc = this.findPattern(this.offsets.signatures.connectFunc.sig, this.offsets.signatures.connectFunc.patternOffset, this.offsets.signatures.connectFunc.addressOffset, true);
                            this.offsets.fixedUpdateFunc = this.findPattern(this.offsets.signatures.fixedUpdateFunc.sig, this.offsets.signatures.fixedUpdateFunc.patternOffset, this.offsets.signatures.fixedUpdateFunc.addressOffset, false, true);
                            this.offsets.showModStampFunc = this.findPattern(this.offsets.signatures.showModStamp.sig, this.offsets.signatures.showModStamp.patternOffset, this.offsets.signatures.showModStamp.addressOffset, false, true);
                            this.offsets.modLateUpdateFunc = this.findPattern(this.offsets.signatures.modLateUpdate.sig, this.offsets.signatures.modLateUpdate.patternOffset, this.offsets.signatures.modLateUpdate.addressOffset, false, true);
                        }
                        this.offsets.serverManager_currentServer[0] = this.findPattern(this.offsets.signatures.serverManager.sig, this.offsets.signatures.serverManager.patternOffset, this.offsets.signatures.serverManager.addressOffset);
                        this.colorsInitialized = false;
                        console.log('serverManager_currentServer', this.offsets.serverManager_currentServer[0].toString(16));
                        this.PlayerStruct = new structron_1["default"]();
                        for (_i = 0, _c = this.offsets.player.struct; _i < _c.length; _i++) {
                            member = _c[_i];
                            if (member.type === 'SKIP' && member.skip) {
                                this.PlayerStruct = this.PlayerStruct.addMember(structron_1["default"].TYPES.SKIP(member.skip), member.name);
                            }
                            else {
                                this.PlayerStruct = this.PlayerStruct.addMember(structron_1["default"].TYPES[member.type], member.name);
                            }
                        }
                        console.log(JSON.stringify(this.offsets, function (k, v) {
                            if (v instanceof Array && k != "struct")
                                return JSON.stringify(v);
                            return v;
                        }, 2).replace(/\\/g, '')
                            .replace(/\"\[/g, '[')
                            .replace(/\]\"/g, ']')
                            .replace(/\"\{/g, '{')
                            .replace(/\}\"/g, '}'));
                        this.initializeWrites();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameReader.prototype.initializeWrites = function () {
        if (this.is_64bit || !this.offsets || !this.amongUs || !this.gameAssembly || this.disableWriting || this.is_linux) {
            //not supported atm
            return;
        }
        // Shellcode to join games when u press join..
        var shellCodeAddr = (0, memoryjs_1.virtualAllocEx)(this.amongUs.handle, null, 0x60, 0x00001000 | 0x00002000, 0x40);
        var compareAddr = shellCodeAddr + 0x30;
        var compareAddr1 = (compareAddr & 0xff000000) >> 24;
        var compareAddr2 = (compareAddr & 0x00ff0000) >> 16;
        var compareAddr3 = (compareAddr & 0x0000ff00) >> 8;
        var compareAddr4 = compareAddr & 0x000000ff;
        //(DESTINATION_RVA - CURRENT_RVA (E9) - 5)
        var connectFunc = this.gameAssembly.modBaseAddr + this.offsets.connectFunc;
        var relativeConnectJMP = connectFunc - (shellCodeAddr + 0x18) - 0x4;
        var fixedUpdateFunc = this.gameAssembly.modBaseAddr + this.offsets.fixedUpdateFunc;
        var relativefixedJMP = fixedUpdateFunc + 0x5 - (shellCodeAddr + 0x24) - 0x4;
        var relativeShellJMP = shellCodeAddr - (fixedUpdateFunc + 0x1) - 0x4;
        var shellcode = [
            0x80,
            0x3d,
            compareAddr4,
            compareAddr3,
            compareAddr2,
            compareAddr1,
            0x00,
            0x74,
            0x13,
            0xc6,
            0x05,
            compareAddr4,
            compareAddr3,
            compareAddr2,
            compareAddr1,
            0x00,
            0xc7,
            0x45,
            0xfc,
            0x01,
            0x00,
            0x00,
            0x00,
            0xe9,
            relativeConnectJMP & 0x000000ff,
            (relativeConnectJMP & 0x0000ff00) >> 8,
            (relativeConnectJMP & 0x00ff0000) >> 16,
            (relativeConnectJMP & 0xff000000) >> 24,
            0x55,
            0x8b,
            0xec,
            0x56,
            0x8b,
            0x75,
            0x08,
            0xe9,
            relativefixedJMP & 0x000000ff,
            (relativefixedJMP & 0x0000ff00) >> 8,
            (relativefixedJMP & 0x00ff0000) >> 16,
            (relativefixedJMP & 0xff000000) >> 24,
        ];
        var shellcodeJMP = [
            // jmp ShellcodeRelativeAddress
            0xe9,
            relativeShellJMP & 0x000000ff,
            (relativeShellJMP & 0x0000ff00) >> 8,
            (relativeShellJMP & 0x00ff0000) >> 16,
            (relativeShellJMP & 0xff000000) >> 24,
        ];
        var modManagerLateUpdate = this.gameAssembly.modBaseAddr + this.offsets.modLateUpdateFunc;
        var shellCodeAddr_1 = shellCodeAddr + 0x300;
        var relativeShellJMP_1 = shellCodeAddr_1 - (modManagerLateUpdate + 0x1) - 0x4;
        var relativefixedJMP_1 = modManagerLateUpdate + 0x5 - (shellCodeAddr_1 + 0x1c) - 0x4;
        var showModStampFunc = this.gameAssembly.modBaseAddr + this.offsets.showModStampFunc;
        var relativeShowModStamp = showModStampFunc + 0x6 - (shellCodeAddr_1 + 0x12) - 0x4;
        var _compareAddr = shellCodeAddr + 0x44;
        var _compareAddr1 = (_compareAddr & 0xff000000) >> 24;
        var _compareAddr2 = (_compareAddr & 0x00ff0000) >> 16;
        var _compareAddr3 = (_compareAddr & 0x0000ff00) >> 8;
        var _compareAddr4 = _compareAddr & 0x000000ff;
        var shellcode_modIcon = [
            0x80,
            0x3d,
            _compareAddr4,
            _compareAddr3,
            _compareAddr2,
            _compareAddr1,
            0x00,
            0x74,
            0x0c,
            0xc6,
            0x05,
            _compareAddr4,
            _compareAddr3,
            _compareAddr2,
            _compareAddr1,
            0x00,
            0xe9,
            relativeShowModStamp & 0x000000ff,
            (relativeShowModStamp & 0x0000ff00) >> 8,
            (relativeShowModStamp & 0x00ff0000) >> 16,
            (relativeShowModStamp & 0xff000000) >> 24,
            0x53,
            0x8b,
            0xdc,
            0x83,
            0xec,
            0x08,
            0xe9,
            relativefixedJMP_1 & 0x000000ff,
            (relativefixedJMP_1 & 0x0000ff00) >> 8,
            (relativefixedJMP_1 & 0x00ff0000) >> 16,
            (relativefixedJMP_1 & 0xff000000) >> 24,
        ];
        var shellcodeJMP_1 = [
            // jmp ShellcodeRelativeAddress
            0xe9,
            relativeShellJMP_1 & 0x000000ff,
            (relativeShellJMP_1 & 0x0000ff00) >> 8,
            (relativeShellJMP_1 & 0x00ff0000) >> 16,
            (relativeShellJMP_1 & 0xff000000) >> 24,
            0x90,
        ];
        //MMOnline
        this.writeString(shellCodeAddr + 0x70, 'OnlineGame');
        this.writeString(shellCodeAddr + 0x95, 'MMOnline');
        this.writeString(shellCodeAddr + 0xd5, "<size=85%><color=#BA68C8>BetterCrewLink v".concat(appVersion, "</color></size>\n<size=60%><color=#BA68C8>https://bettercrewlink.app</color></size><size=85%>\nPing: {0}ms</size>"));
        (0, memoryjs_1.writeBuffer)(this.amongUs.handle, shellCodeAddr, Buffer.from(shellcode));
        (0, memoryjs_1.writeBuffer)(this.amongUs.handle, fixedUpdateFunc, Buffer.from(shellcodeJMP));
        (0, memoryjs_1.writeBuffer)(this.amongUs.handle, shellCodeAddr_1, Buffer.from(shellcode_modIcon));
        (0, memoryjs_1.writeBuffer)(this.amongUs.handle, modManagerLateUpdate, Buffer.from(shellcodeJMP_1));
        this.shellcodeAddr = shellCodeAddr;
        this.writtenPingMessage = false;
        this.initializedWrite = true;
    };
    GameReader.prototype.writeString = function (address, text) {
        var innerNetClient = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.innerNetClient.base);
        var stringBase = this.readMemory('int', innerNetClient, [0x80, 0x0]); // mainMenuScene just a random string where we can base our string off
        var connectionString = [
            stringBase & 0x000000ff,
            (stringBase & 0x0000ff00) >> 8,
            (stringBase & 0x00ff0000) >> 16,
            (stringBase & 0xff000000) >> 24,
            0x00,
            0x00,
            0x00,
            0x00,
            text.length,
            0x00,
            0x00,
            0x00,
        ];
        for (var index = 0; index < text.length; index++) {
            connectionString.push(text.charCodeAt(index));
            connectionString.push(0x0);
        }
        (0, memoryjs_1.writeBuffer)(this.amongUs.handle, address, Buffer.from(connectionString));
    };
    GameReader.prototype.fixPingMessage = function () {
        if (!this.offsets ||
            !this.gameAssembly ||
            !this.initializedWrite ||
            this.writtenPingMessage ||
            this.skipPingMessage-- > 0) {
            return;
        }
        (0, memoryjs_1.writeMemory)(this.amongUs.handle, this.shellcodeAddr + 0x44, 1, 'int32'); // enable ModIcon
        this.skipPingMessage = 25;
        this.writtenPingMessage = true;
        for (var index = 0; index < 3; index++) {
            var stringOffset = this.findPattern(this.offsets.signatures.pingMessageString.sig, this.offsets.signatures.pingMessageString.patternOffset, this.offsets.signatures.pingMessageString.addressOffset, false, false, index);
            var stringPtr = this.readMemory('int', this.gameAssembly.modBaseAddr, stringOffset);
            var pingstring = this.readString(stringPtr);
            if (pingstring.includes('Ping') || pingstring.includes('<color=#BA68C8')) {
                (0, memoryjs_1.writeMemory)(this.amongUs.handle, this.gameAssembly.modBaseAddr + stringOffset, this.shellcodeAddr + 0xd5, 'int32');
                break;
            }
        }
    };
    GameReader.prototype.joinGame = function (code, server) {
        return false;
        // if (
        // 	!this.amongUs ||
        // 	!this.initializedWrite ||
        // 	server.length > 15 ||
        // 	!this.offsets ||
        // 	this.is_64bit
        // 	// || this.loadedMod.id === 'POLUS_GG'
        // ) {
        // 	return false;
        // }
        // const innerNetClient = this.readMemory<number>(
        // 	'ptr',
        // 	this.gameAssembly!.modBaseAddr,
        // 	this.offsets!.innerNetClient.base
        // );
        // this.writeString(this.shellcodeAddr + 0x40, server);
        // writeMemory(
        // 	this.amongUs.handle,
        // 	innerNetClient + this.offsets.innerNetClient.networkAddress,
        // 	this.shellcodeAddr + 0x40,
        // 	'int32'
        // );
        // writeMemory(
        // 	this.amongUs.handle,
        // 	innerNetClient + this.offsets.innerNetClient.onlineScene,
        // 	this.shellcodeAddr + 0x70,
        // 	'int32'
        // );
        // writeMemory(
        // 	this.amongUs.handle,
        // 	innerNetClient + this.offsets.innerNetClient.mainMenuScene,
        // 	this.shellcodeAddr + 0x95,
        // 	'int32'
        // );
        // writeMemory(this.amongUs.handle, innerNetClient + this.offsets.innerNetClient.networkPort, 22023, 'int32');
        // writeMemory(this.amongUs.handle, innerNetClient + this.offsets.innerNetClient.gameMode, 1, 'int32');
        // writeMemory(
        // 	this.amongUs.handle,
        // 	innerNetClient + this.offsets.innerNetClient.gameId,
        // 	this.gameCodeToInt(code),
        // 	'int32'
        // );
        // writeMemory(this.amongUs.handle, this.shellcodeAddr + 0x30, 1, 'int32'); // call connect function
        // return true;
    };
    GameReader.prototype.loadColors = function () {
        if (this.colorsInitialized) {
            return;
        }
        var palletePtr = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.palette);
        var PlayerColorsPtr = this.readMemory('ptr', palletePtr, this.offsets.palette_playercolor);
        var ShadowColorsPtr = this.readMemory('ptr', palletePtr, this.offsets.palette_shadowColor);
        var colorLength = this.readMemory('int', ShadowColorsPtr, this.offsets.playerCount);
        console.log('Initializecolors', colorLength, this.loadedMod.id);
        if (!colorLength || colorLength <= 0 || colorLength > 300 || ((this.loadedMod.id == "THE_OTHER_ROLES") && colorLength <= 18)) {
            return;
        }
        this.rainbowColor = -9999;
        var playercolors = [];
        for (var i = 0; i < colorLength; i++) {
            var playerColor = this.readMemory('uint32', PlayerColorsPtr, [this.offsets.playerAddrPtr + i * 0x4]);
            var shadowColor = this.readMemory('uint32', ShadowColorsPtr, [this.offsets.playerAddrPtr + i * 0x4]);
            if (i == 0 && playerColor != 4279308742) {
                return;
            }
            if (playerColor === 4278190080) {
                this.rainbowColor = i;
            }
            //4278190080
            playercolors[i] = [(0, avatarGenerator_1.numberToColorHex)(playerColor), (0, avatarGenerator_1.numberToColorHex)(shadowColor)];
        }
        this.colorsInitialized = colorLength > 0;
        this.playercolors = playercolors;
        try {
            this.sendIPC(ipc_messages_1.IpcOverlayMessages.NOTIFY_PLAYERCOLORS_CHANGED, playercolors);
            (0, avatarGenerator_1.GenerateAvatars)(playercolors)
                .then(function () { return console.log('done generate'); })["catch"](function (e) { return console.error(e); });
        }
        catch (e) {
            /* Empty block */
        }
    };
    GameReader.prototype.isX64Version = function () {
        if (!this.amongUs || !this.gameAssembly)
            return false;
        var optionalHeader_offset = (0, memoryjs_1.readMemory)(this.amongUs.handle, this.gameAssembly.modBaseAddr + 0x3c, 'uint32');
        var optionalHeader_magic = (0, memoryjs_1.readMemory)(this.amongUs.handle, this.gameAssembly.modBaseAddr + optionalHeader_offset + 0x18, 'short');
        //	console.log(optionalHeader_magic, 'optionalHeader_magic');
        return optionalHeader_magic === 0x20b;
    };
    GameReader.prototype.readCurrentServer = function () {
        var currentServer = this.readMemory('ptr', this.gameAssembly.modBaseAddr, this.offsets.serverManager_currentServer);
        this.currentServer = this.readString(currentServer);
    };
    GameReader.prototype.readMemory = function (dataType, address, offsets, defaultParam) {
        if (!this.amongUs)
            return defaultParam;
        if (address === 0)
            return defaultParam;
        dataType = dataType == 'pointer' || dataType == 'ptr' ? (this.is_64bit ? 'uint64' : 'uint32') : dataType;
        if (typeof offsets === 'number') {
            offsets = [offsets];
        }
        var _a = this.offsetAddress(address, offsets || []), addr = _a.address, last = _a.last;
        if (addr === 0)
            return defaultParam;
        return (0, memoryjs_1.readMemory)(this.amongUs.handle, addr + last, dataType);
    };
    GameReader.prototype.offsetAddress = function (address, offsets) {
        if (!this.amongUs)
            throw 'Among Us not open? Weird error';
        address = this.is_64bit ? address : address;
        for (var i = 0; i < offsets.length - 1; i++) {
            address = (0, memoryjs_1.readMemory)(this.amongUs.handle, address + offsets[i], this.is_64bit ? 'uint64' : 'uint32');
            if (address == 0)
                break;
        }
        var last = offsets.length > 0 ? offsets[offsets.length - 1] : 0;
        return { address: address, last: last };
    };
    GameReader.prototype.readString = function (address, maxLength) {
        if (maxLength === void 0) { maxLength = 50; }
        try {
            if (address === 0 || !this.amongUs) {
                return '';
            }
            var length_1 = Math.max(0, Math.min((0, memoryjs_1.readMemory)(this.amongUs.handle, address + (this.is_64bit ? 0x10 : 0x8), 'int'), maxLength));
            // readMemoryRaw<number>(this.amongUs.handle, address + (this.is_64bit ? 0x10 : 0x8), 'int')
            var buffer = (0, memoryjs_1.readBuffer)(this.amongUs.handle, address + (this.is_64bit ? 0x14 : 0xc), length_1 << 1);
            if (buffer) {
                return buffer.toString('utf16le').replace(/\0/g, '');
            }
            else {
                return '';
            }
        }
        catch (e) {
            return '';
        }
    };
    GameReader.prototype.readDictionary = function (address, maxLen, callback) {
        var entries = this.readMemory('ptr', address + (this.is_64bit ? 0x18 : 0xc));
        var len = this.readMemory('uint32', address + (this.is_64bit ? 0x20 : 0x10));
        len = len > maxLen ? maxLen : len;
        for (var i = 0; i < len; i++) {
            var offset = entries + ((this.is_64bit ? 0x20 : 0x10) + i * (this.is_64bit ? 0x18 : 0x10));
            callback(offset, offset + (this.is_64bit ? 0x10 : 0xc), i);
        }
    };
    GameReader.prototype.findPattern = function (signature, patternOffset, addressOffset, relative, getLocation, skip) {
        if (patternOffset === void 0) { patternOffset = 0x1; }
        if (addressOffset === void 0) { addressOffset = 0x0; }
        if (relative === void 0) { relative = false; }
        if (getLocation === void 0) { getLocation = false; }
        if (skip === void 0) { skip = 0; }
        if (!this.amongUs || !this.gameAssembly)
            return 0x0;
        var signatureTypes = 0x0 | 0x2;
        var instruction_location = (0, memoryjs_1.findPattern)(this.amongUs.handle, 'GameAssembly.dll', signature, signatureTypes, patternOffset, 0x0, skip);
        if (getLocation) {
            return instruction_location + addressOffset;
        }
        var offsetAddr = this.readMemory('int', this.gameAssembly.modBaseAddr, [instruction_location]);
        return this.is_64bit || relative
            ? offsetAddr + instruction_location + addressOffset
            : offsetAddr - this.gameAssembly.modBaseAddr;
    };
    GameReader.prototype.IntToGameCode = function (input) {
        if (!input || input === 0)
            return '';
        else if (input <= -1000)
            return this.IntToGameCodeV2Impl(input);
        else if (input > 0)
            return this.IntToGameCodeV1Impl(input);
        else
            return '';
    };
    GameReader.prototype.IntToGameCodeV1Impl = function (input) {
        var buf = Buffer.alloc(4);
        buf.writeInt32LE(input, 0);
        return buf.toString();
    };
    GameReader.prototype.IntToGameCodeV2Impl = function (input) {
        var V2 = 'QWXRTYLPESDFGHUJKZOCVBINMA';
        var a = input & 0x3ff;
        var b = (input >> 10) & 0xfffff;
        return [
            V2[Math.floor(a % 26)],
            V2[Math.floor(a / 26)],
            V2[Math.floor(b % 26)],
            V2[Math.floor((b / 26) % 26)],
            V2[Math.floor((b / 676) % 26)],
            V2[Math.floor((b / 17576) % 26)],
        ].join('');
    };
    GameReader.prototype.gameCodeToInt = function (code) {
        return code.length === 4
            ? this.gameCodeToIntV1Impl(code)
            : this.gameCodeToIntV2Impl(code);
    };
    GameReader.prototype.gameCodeToIntV1Impl = function (code) {
        var buf = Buffer.alloc(4);
        buf.write(code);
        return buf.readInt32LE(0);
    };
    GameReader.prototype.gameCodeToIntV2Impl = function (code) {
        var V2Map = [25, 21, 19, 10, 8, 11, 12, 13, 22, 15, 16, 6, 24, 23, 18, 7, 0, 3, 9, 4, 14, 20, 1, 2, 5, 17];
        var a = V2Map[code.charCodeAt(0) - 65];
        var b = V2Map[code.charCodeAt(1) - 65];
        var c = V2Map[code.charCodeAt(2) - 65];
        var d = V2Map[code.charCodeAt(3) - 65];
        var e = V2Map[code.charCodeAt(4) - 65];
        var f = V2Map[code.charCodeAt(5) - 65];
        var one = (a + 26 * b) & 0x3ff;
        var two = c + 26 * (d + 26 * (e + 26 * f));
        return one | ((two << 10) & 0x3ffffc00) | 0x80000000;
    };
    GameReader.prototype.hashCode = function (s) {
        var h = 0;
        for (var i = 0; i < s.length; i++)
            h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return h;
    };
    GameReader.prototype.parsePlayer = function (ptr, buffer, LocalclientId) {
        var _this = this;
        var _a, _b, _c, _d;
        if (LocalclientId === void 0) { LocalclientId = -1; }
        if (!this.PlayerStruct || !this.offsets)
            return undefined;
        var data = this.PlayerStruct.report(buffer, 0, {}).data;
        if (this.is_64bit) {
            data.objectPtr = this.readMemory('pointer', ptr, [this.PlayerStruct.getOffsetByName('objectPtr')]);
            data.outfitsPtr = this.readMemory('pointer', ptr, [this.PlayerStruct.getOffsetByName('outfitsPtr')]);
            data.taskPtr = this.readMemory('pointer', ptr, [this.PlayerStruct.getOffsetByName('taskPtr')]);
            data.rolePtr = this.readMemory('pointer', ptr, [this.PlayerStruct.getOffsetByName('rolePtr')]);
            // data.name = this.readMemory('pointer', ptr, [this.PlayerStruct.getOffsetByName('name')]);
        }
        var clientId = this.readMemory('uint32', data.objectPtr, this.offsets.player.clientId);
        var isLocal = clientId === LocalclientId && data.disconnected === 0;
        var positionOffsets = isLocal
            ? [this.offsets.player.localX, this.offsets.player.localY]
            : [this.offsets.player.remoteX, this.offsets.player.remoteY];
        var x = this.readMemory('float', data.objectPtr, positionOffsets[0]);
        var y = this.readMemory('float', data.objectPtr, positionOffsets[1]);
        var currentOutfit = this.readMemory('uint32', data.objectPtr, this.offsets.player.currentOutfit);
        var isDummy = this.readMemory('boolean', data.objectPtr, this.offsets.player.isDummy);
        var name = 'error';
        var shiftedColor = -1;
        if (data.hasOwnProperty('name')) {
            name = this.readString(data.name, 1000).split(/<.*?>/).join('');
        }
        else {
            this.readDictionary(data.outfitsPtr, 6, function (k, v, i) {
                var key = _this.readMemory('int32', k);
                var val = _this.readMemory('ptr', v);
                if (key === 0 && i == 0) {
                    var namePtr = _this.readMemory('pointer', val, _this.offsets.player.outfit.playerName); // 0x40
                    data.color = _this.readMemory('uint32', val, _this.offsets.player.outfit.colorId); // 0x14
                    name = _this.readString(namePtr, 1000).split(/<.*?>/).join('');
                    data.hat = _this.readString(_this.readMemory('ptr', val, _this.offsets.player.outfit.hatId));
                    data.skin = _this.readString(_this.readMemory('ptr', val, _this.offsets.player.outfit.skinId));
                    data.visor = _this.readString(_this.readMemory('ptr', val, _this.offsets.player.outfit.visorId));
                    if (currentOutfit == 0 || currentOutfit > 10)
                        return;
                }
                else if (key === currentOutfit) {
                    shiftedColor = _this.readMemory('uint32', val, _this.offsets.player.outfit.colorId); // 0x14
                }
            });
            var roleTeam = this.readMemory('uint32', data.rolePtr, this.offsets.player.roleTeam);
            data.impostor = roleTeam;
            //	if (this.offsets!.player.nameText && shiftedColor == -1 && (this.loadedMod.id == "THE_OTHER_ROLES")) {
            //		let nameText = this.readMemory<number>('ptr', data.objectPtr, this.offsets!.player.nameText);
            //		var nameText_name = this.readString(nameText);
            //		if (nameText_name != name) {
            //			shiftedColor = data.color;
            //		}
            //	}
        }
        name = name.split(/<.*?>/).join('');
        var bugged = false;
        if (x === undefined || y === undefined || data.disconnected != 0 || data.color < 0 || data.color > this.playercolors.length) {
            x = 9999;
            y = 9999;
            bugged = true;
        }
        var x_round = parseFloat(x === null || x === void 0 ? void 0 : x.toFixed(4));
        var y_round = parseFloat(y === null || y === void 0 ? void 0 : y.toFixed(4));
        var nameHash = this.hashCode(name);
        var colorId = data.color === this.rainbowColor ? cosmetics_1.RainbowColorId : data.color;
        return {
            ptr: ptr,
            id: data.id,
            clientId: clientId,
            name: name,
            nameHash: nameHash,
            colorId: colorId,
            hatId: (_a = data.hat) !== null && _a !== void 0 ? _a : '',
            petId: (_b = data.pet) !== null && _b !== void 0 ? _b : '',
            skinId: (_c = data.skin) !== null && _c !== void 0 ? _c : '',
            visorId: (_d = data.visor) !== null && _d !== void 0 ? _d : '',
            disconnected: data.disconnected != 0,
            isImpostor: data.impostor == 1,
            isDead: data.dead == 1,
            taskPtr: data.taskPtr,
            objectPtr: data.objectPtr,
            shiftedColor: shiftedColor,
            bugged: bugged,
            inVent: this.readMemory('byte', data.objectPtr, this.offsets.player.inVent) > 0,
            isLocal: isLocal,
            isDummy: isDummy,
            x: x_round || x || 999,
            y: y_round || y || 999
        };
    };
    return GameReader;
}());
exports["default"] = GameReader;
