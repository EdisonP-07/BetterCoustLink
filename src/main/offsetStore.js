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
exports.fetchOffsets = exports.fetchOffsetLookup = void 0;
var electron_store_1 = require("electron-store");
var node_fetch_1 = require("node-fetch");
var Errors_1 = require("../common/Errors");
//// "https://cdn.jsdelivr.net/gh/OhMyGuus/BetterCrewlink-Offsets@main/"; // "https://raw.githubusercontent.com/OhMyGuus/BetterCrewlink-Offsets/main"
var BASE_URL = "https://raw.githubusercontent.com/OhMyGuus/BetterCrewlink-Offsets/main";
var BASE_URL_error = "https://cdn.jsdelivr.net/gh/OhMyGuus/BetterCrewlink-Offsets@main";
var store = new electron_store_1["default"]({ name: "offsets" });
var lookupStore = new electron_store_1["default"]({ name: "lookup" });
function fetchOffsetLookupJson(error) {
    if (error === void 0) { error = false; }
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = error ? BASE_URL_error : BASE_URL;
            return [2 /*return*/, (0, node_fetch_1["default"])("".concat(url, "/lookup.json"))
                    .then(function (response) { return response.json(); })
                    .then(function (data) { return data; })["catch"](function (_) {
                    if (!error) {
                        return fetchOffsetLookupJson(true);
                    }
                    else {
                        throw Errors_1["default"].LOOKUP_FETCH_ERROR;
                    }
                })];
        });
    });
}
function fetchOffsetLookup() {
    return __awaiter(this, void 0, void 0, function () {
        var lookups, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchOffsetLookupJson()];
                case 1:
                    lookups = _b.sent();
                    lookupStore.set(lookups);
                    return [2 /*return*/, lookups];
                case 2:
                    _a = _b.sent();
                    // Check if cache file has never been generated
                    if (!lookupStore.get('patterns'))
                        throw Errors_1["default"].LOOKUP_FETCH_ERROR;
                    return [2 /*return*/, lookupStore.store];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchOffsetLookup = fetchOffsetLookup;
function fetchOffsetsJson(is_64bit, filename, error) {
    if (error === void 0) { error = false; }
    return __awaiter(this, void 0, void 0, function () {
        var url, OFFSETS_URL;
        return __generator(this, function (_a) {
            url = error ? BASE_URL_error : BASE_URL;
            OFFSETS_URL = "".concat(url, "/offsets");
            return [2 /*return*/, (0, node_fetch_1["default"])("".concat(OFFSETS_URL, "/").concat(is_64bit ? 'x64' : 'x86', "/").concat(filename))
                    .then(function (response) { return response.json(); })
                    .then(function (data) { return data; })["catch"](function (_) {
                    if (!error) {
                        return fetchOffsetsJson(is_64bit, filename, true);
                    }
                    else {
                        throw Errors_1["default"].OFFSETS_FETCH_ERROR;
                    }
                })];
        });
    });
}
function fetchOffsets(is_64bit, filename, offsetsVersion) {
    return __awaiter(this, void 0, void 0, function () {
        var offsets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // offsetsVersion in case we need to update people's cached file
                    // >= version to allow testing with local file updates (eg remote vers 2, local vers 3)
                    // no need to host local http server
                    if (store.get('filename') == filename && store.get('is_64bit') == is_64bit && store.get('offsetsVersion') >= offsetsVersion) {
                        console.log("Loading cached offsets");
                        return [2 /*return*/, store.get('IOffsets')];
                    }
                    return [4 /*yield*/, fetchOffsetsJson(is_64bit, filename)];
                case 1:
                    offsets = _a.sent();
                    store.set('filename', filename);
                    store.set('is_64bit', is_64bit);
                    store.set('offsetsVersion', offsetsVersion ? offsetsVersion : 0);
                    store.set('IOffsets', offsets);
                    return [2 /*return*/, offsets];
            }
        });
    });
}
exports.fetchOffsets = fetchOffsets;
