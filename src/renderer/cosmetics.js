"use strict";
exports.__esModule = true;
exports.getCosmetic = exports.RainbowColorId = exports.getHatDementions = exports.initializeHats = exports.initializedHats = exports.cosmeticType = exports.redAlive = void 0;
// @ts-ignore
var placeholder_png_1 = require("../../static/images/avatar/placeholder.png"); // @ts-ignore
var rainbow_alive_png_1 = require("../../static/images/avatar/rainbow-alive.png"); // @ts-ignore
var rainbow_dead_png_1 = require("../../static/images/avatar/rainbow-dead.png");
exports.redAlive = placeholder_png_1["default"];
var cosmeticType;
(function (cosmeticType) {
    cosmeticType[cosmeticType["base"] = 0] = "base";
    cosmeticType[cosmeticType["hat"] = 1] = "hat";
    cosmeticType[cosmeticType["hat_back"] = 2] = "hat_back";
})(cosmeticType = exports.cosmeticType || (exports.cosmeticType = {}));
var hatCollection = {};
var requestingHats = false;
exports.initializedHats = false;
function initializeHats() {
    if (exports.initializedHats || requestingHats) {
        return;
    }
    requestingHats = true;
    fetch("".concat(HAT_COLLECTION_URL, "/hats.json"))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        hatCollection = data;
        exports.initializedHats = true;
    });
    return undefined;
}
exports.initializeHats = initializeHats;
var HAT_COLLECTION_URL = 'https://cdn.jsdelivr.net/gh/OhMyGuus/BetterCrewLink-Hats@master/'; //'https://raw.githubusercontent.com/OhMyGuus/BetterCrewlink-Hats/master';
function getModHat(color, id, mod, back) {
    if (id === void 0) { id = ''; }
    if (back === void 0) { back = false; }
    if (!exports.initializedHats) {
        return '';
    }
    var hatBase = getHat(id, mod);
    var hat = back ? hatBase === null || hatBase === void 0 ? void 0 : hatBase.back_image : hatBase === null || hatBase === void 0 ? void 0 : hatBase.image;
    var multiColor = hatBase === null || hatBase === void 0 ? void 0 : hatBase.multi_color;
    if (hat && hatBase) {
        if (!multiColor)
            return "".concat(HAT_COLLECTION_URL).concat(hatBase.mod, "/").concat(hat);
        else
            return "generate:///".concat(HAT_COLLECTION_URL).concat(hatBase.mod, "/").concat(hat, "?color=").concat(color);
    }
    return undefined;
}
function getHat(id, modType) {
    var _a, _b, _c;
    if (!exports.initializedHats) {
        return undefined;
    }
    for (var _i = 0, _d = ['NONE', modType]; _i < _d.length; _i++) {
        var mod = _d[_i];
        var modHatList = hatCollection[mod];
        var hat = modHatList === null || modHatList === void 0 ? void 0 : modHatList.hats[id];
        if (hat) {
            hat.top = (_a = hat === null || hat === void 0 ? void 0 : hat.top) !== null && _a !== void 0 ? _a : modHatList === null || modHatList === void 0 ? void 0 : modHatList.defaultTop;
            hat.width = (_b = hat === null || hat === void 0 ? void 0 : hat.width) !== null && _b !== void 0 ? _b : modHatList === null || modHatList === void 0 ? void 0 : modHatList.defaultWidth;
            hat.left = (_c = hat === null || hat === void 0 ? void 0 : hat.left) !== null && _c !== void 0 ? _c : modHatList === null || modHatList === void 0 ? void 0 : modHatList.defaultLeft;
            hat.mod = mod;
            return hat;
        }
    }
    return undefined;
}
function getHatDementions(id, mod) {
    var _a, _b, _c;
    var hat = getHat(id, mod);
    return {
        top: (_a = hat === null || hat === void 0 ? void 0 : hat.top) !== null && _a !== void 0 ? _a : '0',
        width: (_b = hat === null || hat === void 0 ? void 0 : hat.width) !== null && _b !== void 0 ? _b : '0',
        left: (_c = hat === null || hat === void 0 ? void 0 : hat.left) !== null && _c !== void 0 ? _c : '0'
    };
}
exports.getHatDementions = getHatDementions;
exports.RainbowColorId = -99234;
function getCosmetic(color, isAlive, type, id, mod) {
    if (id === void 0) { id = ''; }
    if (mod === void 0) { mod = 'NONE'; }
    if (type === cosmeticType.base) {
        if (color == exports.RainbowColorId) {
            return isAlive ? rainbow_alive_png_1["default"] : rainbow_dead_png_1["default"];
        }
        return "static:///generated/".concat(isAlive ? "player" : "ghost", "/").concat(color, ".png");
    }
    else {
        var modHat = getModHat(color, id, mod, type === cosmeticType.hat_back);
        if (modHat)
            return modHat;
    }
    return '';
}
exports.getCosmetic = getCosmetic;
