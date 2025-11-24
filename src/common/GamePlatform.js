"use strict";
var _a;
exports.__esModule = true;
exports.DefaultGamePlatforms = exports.PlatformRunType = exports.GamePlatform = void 0;
var GamePlatform;
(function (GamePlatform) {
    GamePlatform["EPIC"] = "EPIC";
    GamePlatform["STEAM"] = "STEAM";
    GamePlatform["MICROSOFT"] = "MICROSOFT";
})(GamePlatform = exports.GamePlatform || (exports.GamePlatform = {}));
var PlatformRunType;
(function (PlatformRunType) {
    PlatformRunType["URI"] = "URI";
    PlatformRunType["EXE"] = "EXE";
})(PlatformRunType = exports.PlatformRunType || (exports.PlatformRunType = {}));
exports.DefaultGamePlatforms = (_a = {},
    _a[GamePlatform.STEAM] = {
        "default": true,
        key: GamePlatform.STEAM,
        launchType: PlatformRunType.URI,
        runPath: 'steam://rungameid/945360',
        execute: [''],
        translateKey: 'platform.steam'
    },
    _a[GamePlatform.EPIC] = {
        "default": true,
        key: GamePlatform.EPIC,
        launchType: PlatformRunType.URI,
        runPath: 'com.epicgames.launcher://apps/963137e4c29d4c79a81323b8fab03a40?action=launch&silent=true',
        execute: [''],
        translateKey: 'platform.epicgames'
    },
    _a[GamePlatform.MICROSOFT] = {
        "default": true,
        key: GamePlatform.MICROSOFT,
        launchType: PlatformRunType.EXE,
        runPath: 'none',
        execute: ['Among Us.exe'],
        translateKey: 'platform.microsoft'
    },
    _a);
