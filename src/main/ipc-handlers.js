"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.initializeIpcHandlers = exports.initializeIpcListeners = void 0;
var electron_1 = require("electron");
var os_1 = require("os");
var registry_js_1 = require("registry-js");
var GamePlatform_1 = require("../common/GamePlatform");
var vdf_parser_1 = require("vdf-parser");
var cross_spawn_1 = require("cross-spawn");
var path_1 = require("path");
var fs_1 = require("fs");
var ipc_messages_1 = require("../common/ipc-messages");
// Listeners are fire and forget, they do not have "responses" or return values
var initializeIpcListeners = function () {
    electron_1.ipcMain.on(ipc_messages_1.IpcMessages.SHOW_ERROR_DIALOG, function (e, opts) {
        if (typeof opts === 'object' && opts && typeof opts.title === 'string' && typeof opts.content === 'string') {
            electron_1.dialog.showErrorBox(opts.title, opts.content);
        }
    });
    electron_1.ipcMain.on(ipc_messages_1.IpcMessages.OPEN_AMONG_US_GAME, function (_, platform) {
        var error = function () { return electron_1.dialog.showErrorBox('Error', 'Could not start the game.'); };
        if (platform.launchType === GamePlatform_1.PlatformRunType.URI) {
            // Just open the URI if we can to launch the game
            // TODO: Try to add error checking here
            electron_1.shell.openExternal(platform.runPath);
        }
        else if (platform.launchType === GamePlatform_1.PlatformRunType.EXE) {
            try {
                var process_1 = (0, cross_spawn_1["default"])(path_1["default"].join(platform.runPath, platform.execute[0]), platform.execute.slice(1), { detached: true, stdio: 'ignore' });
                process_1.on('error', error);
                process_1.unref();
            }
            catch (e) {
                error();
            }
        }
    });
    electron_1.ipcMain.on(ipc_messages_1.IpcMessages.RESTART_CREWLINK, function () {
        electron_1.app.relaunch();
        electron_1.app.quit();
    });
    electron_1.ipcMain.on(ipc_messages_1.IpcMessages.SEND_TO_OVERLAY, function (_, event) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        try {
            if (global.overlay)
                (_a = global.overlay.webContents).send.apply(_a, __spreadArray([event], args, false));
        }
        catch (e) {
            /*empty*/
        }
    });
    electron_1.ipcMain.on(ipc_messages_1.IpcMessages.SEND_TO_MAINWINDOW, function (_, event) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        console.log('SEND TO MAINWINDOW CALLLED');
        try {
            if (global.mainWindow)
                (_a = global.mainWindow.webContents).send.apply(_a, __spreadArray([event], args, false));
        }
        catch (e) {
            /*empty*/
        }
    });
    electron_1.ipcMain.on(ipc_messages_1.IpcMessages.QUIT_CREWLINK, function () {
        try {
            var mainWindow = global.mainWindow;
            var overlay = global.overlay;
            global.mainWindow = null;
            global.overlay = null;
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.close();
            overlay === null || overlay === void 0 ? void 0 : overlay.close();
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.destroy();
            overlay === null || overlay === void 0 ? void 0 : overlay.destroy();
        }
        catch (_a) {
            /* empty */
        }
        electron_1.app.quit();
    });
};
exports.initializeIpcListeners = initializeIpcListeners;
// Handlers are async cross-process instructions, they should have a return value
// or the caller should be "await"'ing them.  If neither of these are the case
// consider making it a "listener" instead for performance and readability
var initializeIpcHandlers = function () {
    electron_1.ipcMain.handle(ipc_messages_1.IpcMessages.REQUEST_PLATFORMS_AVAILABLE, function (_, customPlatforms) {
        var desktop_platform = (0, os_1.platform)();
        // Assume all game platforms are unavailable unless proven otherwise
        var availableGamePlatforms = {};
        // Deal with default platforms first
        if (desktop_platform === 'win32') {
            // Steam
            if ((0, registry_js_1.enumerateValues)(registry_js_1.HKEY.HKEY_CLASSES_ROOT, 'steam').find(function (value) {
                return value ? value.name === 'URL Protocol' : false;
            })) {
                availableGamePlatforms[GamePlatform_1.GamePlatform.STEAM] = GamePlatform_1.DefaultGamePlatforms[GamePlatform_1.GamePlatform.STEAM];
            }
            // Epic Games
            if ((0, registry_js_1.enumerateValues)(registry_js_1.HKEY.HKEY_CLASSES_ROOT, 'com.epicgames.launcher').find(function (value) {
                return value ? value.name === 'URL Protocol' : false;
            })) {
                availableGamePlatforms[GamePlatform_1.GamePlatform.EPIC] = GamePlatform_1.DefaultGamePlatforms[GamePlatform_1.GamePlatform.EPIC];
            }
            // Microsoft Store
            // Search for 'Innersloth.Among Us....' key and grab it
            var microsoft_regkey = (0, registry_js_1.enumerateKeys)(registry_js_1.HKEY.HKEY_CURRENT_USER, 'SOFTWARE\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\CurrentVersion\\AppModel\\Repository\\Packages').find(function (reg_key) { return reg_key.startsWith('Innersloth.AmongUs'); });
            if (microsoft_regkey) {
                // Grab the game path from the above key
                var value_found = (0, registry_js_1.enumerateValues)(registry_js_1.HKEY.HKEY_CURRENT_USER, 'SOFTWARE\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\CurrentVersion\\AppModel\\Repository\\Packages' +
                    '\\' +
                    microsoft_regkey).find(function (value) { return (value ? value.name === 'PackageRootFolder' : false); });
                if (value_found) {
                    availableGamePlatforms[GamePlatform_1.GamePlatform.MICROSOFT] = GamePlatform_1.DefaultGamePlatforms[GamePlatform_1.GamePlatform.MICROSOFT];
                    availableGamePlatforms[GamePlatform_1.GamePlatform.MICROSOFT].runPath = value_found.data;
                }
            }
        }
        else if (desktop_platform === 'linux') {
            // Add platform to availableGamePlatforms and setup data if platform is available, do nothing otherwise
            try {
                var vdfString = fs_1["default"].readFileSync((0, os_1.homedir)() + '/.steam/registry.vdf').toString();
                var vdfObject = (0, vdf_parser_1.parse)(vdfString);
                //checks if Among Us's listed as installed in the .vdf-file
                if (vdfObject['Registry']['HKCU']['Software']['Valve']['Steam']['Apps']['945360']['installed'] == 1) {
                    availableGamePlatforms[GamePlatform_1.GamePlatform.STEAM] = GamePlatform_1.DefaultGamePlatforms[GamePlatform_1.GamePlatform.STEAM];
                }
            }
            catch (e) {
                /* empty */
            }
        }
        // Deal with custom client-added platforms
        for (var key in customPlatforms) {
            var game_platform = customPlatforms[key];
            if (game_platform.launchType === GamePlatform_1.PlatformRunType.URI) {
                // I really have no clue how to check this, so we're trusting they exist
                availableGamePlatforms[key] = game_platform;
            }
            else if (game_platform.launchType === GamePlatform_1.PlatformRunType.EXE) {
                try {
                    fs_1["default"].accessSync(path_1["default"].join(game_platform.runPath, game_platform.execute[0]), fs_1["default"].constants.X_OK);
                    availableGamePlatforms[key] = game_platform;
                }
                catch (_a) {
                    continue;
                }
            }
        }
        return availableGamePlatforms;
    });
};
exports.initializeIpcHandlers = initializeIpcHandlers;
