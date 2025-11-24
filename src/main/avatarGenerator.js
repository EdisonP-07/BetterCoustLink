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
exports.GenerateHat = exports.GenerateAvatars = exports.numberToColorHex = exports.DEFAULT_PLAYERCOLORS = void 0;
var color_1 = require("color");
var jimp_1 = require("jimp");
var fs_1 = require("fs");
// @ts-ignore
var player_png_1 = require("../../static/images/generate/player.png"); // @ts-ignore
var ghost_png_1 = require("../../static/images/generate/ghost.png"); // @ts-ignore
var electron_1 = require("electron");
exports.DEFAULT_PLAYERCOLORS = [
    ['#C51111', '#7A0838'],
    ['#132ED1', '#09158E'],
    ['#117F2D', '#0A4D2E'],
    ['#ED54BA', '#AB2BAD'],
    ['#EF7D0D', '#B33E15'],
    ['#F5F557', '#C38823'],
    ['#3F474E', '#1E1F26'],
    ['#FFFFFF', '#8394BF'],
    ['#6B2FBB', '#3B177C'],
    ['#71491E', '#5E2615'],
    ['#38FEDC', '#24A8BE'],
    ['#50EF39', '#15A742'],
];
function pathToHash(input) {
    var hash = 0;
    for (var i = 0; i < input.length; i++) {
        var char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
function numberToColorHex(colour) {
    var _a;
    return ('#' +
        ((_a = (colour & 0x00ffffff)
            .toString(16)
            .padStart(6, '0')
            .match(/.{1,2}/g)) === null || _a === void 0 ? void 0 : _a.reverse().join('')));
}
exports.numberToColorHex = numberToColorHex;
function colorImages(playerColors, image, imagename) {
    return __awaiter(this, void 0, void 0, function () {
        var img, originalData, colorId, color, shadow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jimp_1["default"].read(Buffer.from(image.replace(/^data:image\/png;base64,/, ''), 'base64'))];
                case 1:
                    img = _a.sent();
                    originalData = new Uint8Array(img.bitmap.data);
                    colorId = 0;
                    _a.label = 2;
                case 2:
                    if (!(colorId < playerColors.length)) return [3 /*break*/, 5];
                    color = playerColors[colorId][0];
                    shadow = playerColors[colorId][1];
                    return [4 /*yield*/, colorImage(img, originalData, color, shadow, "".concat(electron_1.app.getPath('userData'), "/static/generated/").concat(imagename, "/").concat(colorId, ".png"))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    colorId++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function rgb2hsv(r, g, b) {
    var v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    var h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}
function isBetween(h, h1, maxdiffrence) {
    return 180 - Math.abs(Math.abs(h - h1) - 180) < maxdiffrence;
}
function colorImage(img, originalData, color, shadow, savepath, returnImg) {
    if (returnImg === void 0) { returnImg = false; }
    return __awaiter(this, void 0, void 0, function () {
        var i, l, data, r, g, b, h, pixelColor, savepathTemp, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    img.bitmap.data = new Uint8Array(originalData);
                    for (i = 0, l = img.bitmap.data.length; i < l; i += 4) {
                        data = img.bitmap.data;
                        r = data[i];
                        g = data[i + 1];
                        b = data[i + 2];
                        h = rgb2hsv(r, g, b);
                        if ((h[1] > 0.4) && (isBetween(h[0], 240, 30) || isBetween(h[0], 0, 100) || isBetween(h[0], 120, 40))) { //  )
                            pixelColor = (0, color_1["default"])('#000000')
                                .mix((0, color_1["default"])(shadow), b / 255)
                                .mix((0, color_1["default"])(color), r / 255)
                                .mix((0, color_1["default"])('#9acad5'), g / 255);
                            data[i] = pixelColor.red();
                            data[i + 1] = pixelColor.green();
                            data[i + 2] = pixelColor.blue();
                        }
                    }
                    savepathTemp = "".concat(savepath, ".").concat(Math.floor(Math.random() * 101));
                    return [4 /*yield*/, img.writeAsync(savepathTemp)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, fs_1["default"].promises.rename(savepathTemp, savepath)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    ex_1 = _a.sent();
                    return [4 /*yield*/, fs_1["default"].promises.unlink(savepathTemp)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function GenerateAvatars(colors) {
    return __awaiter(this, void 0, void 0, function () {
        var exception_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Generating avatars..', "".concat(electron_1.app.getPath('userData'), "/static/generated/"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, colorImages(colors, ghost_png_1["default"], 'ghost')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, colorImages(colors, player_png_1["default"], 'player')];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    exception_1 = _a.sent();
                    console.log('error while generating the avatars..', exception_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GenerateAvatars = GenerateAvatars;
function GenerateHat(imagePath, colors, colorId, path) {
    return __awaiter(this, void 0, void 0, function () {
        var img, originalData, color, shadow, temp, _a, _b, exception_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, jimp_1["default"].read(imagePath.href)];
                case 1:
                    img = _c.sent();
                    originalData = new Uint8Array(img.bitmap.data);
                    color = colors[colorId][0];
                    shadow = colors[colorId][1];
                    temp = "".concat(electron_1.app.getPath('userData'), "/static/generated/hats/").concat(pathToHash(imagePath + '/' + color + '/' + shadow), ".png");
                    _a = !fs_1["default"].existsSync(temp);
                    if (_a) return [3 /*break*/, 3];
                    _b = Date.now();
                    return [4 /*yield*/, fs_1["default"].promises.stat(temp)];
                case 2:
                    _a = _b - (_c.sent()).mtimeMs > 300000;
                    _c.label = 3;
                case 3:
                    if (!_a) return [3 /*break*/, 5];
                    return [4 /*yield*/, colorImage(img, originalData, color, shadow, temp)];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [2 /*return*/, temp];
                case 6:
                    exception_2 = _c.sent();
                    console.log('error while generating the avatars..', exception_2);
                    return [2 /*return*/, ''];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.GenerateHat = GenerateHat;
