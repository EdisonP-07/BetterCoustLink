"use strict";
var _a, _b, _c, _d;
exports.__esModule = true;
exports.AmongUsMaps = exports.CameraLocation = exports.MapType = void 0;
var MapType;
(function (MapType) {
    MapType[MapType["THE_SKELD"] = 0] = "THE_SKELD";
    MapType[MapType["MIRA_HQ"] = 1] = "MIRA_HQ";
    MapType[MapType["POLUS"] = 2] = "POLUS";
    MapType[MapType["THE_SKELD_APRIL"] = 3] = "THE_SKELD_APRIL";
    MapType[MapType["AIRSHIP"] = 4] = "AIRSHIP";
    MapType[MapType["FUNGLE"] = 5] = "FUNGLE";
    MapType[MapType["UNKNOWN"] = 6] = "UNKNOWN";
    MapType[MapType["SUBMERGED"] = 105] = "SUBMERGED";
})(MapType = exports.MapType || (exports.MapType = {}));
var CameraLocation;
(function (CameraLocation) {
    CameraLocation[CameraLocation["East"] = 0] = "East";
    CameraLocation[CameraLocation["Central"] = 1] = "Central";
    CameraLocation[CameraLocation["Northeast"] = 2] = "Northeast";
    CameraLocation[CameraLocation["South"] = 3] = "South";
    CameraLocation[CameraLocation["SouthWest"] = 4] = "SouthWest";
    CameraLocation[CameraLocation["NorthWest"] = 5] = "NorthWest";
    CameraLocation[CameraLocation["Skeld"] = 6] = "Skeld";
    CameraLocation[CameraLocation["NONE"] = 7] = "NONE";
})(CameraLocation = exports.CameraLocation || (exports.CameraLocation = {}));
var defaultMap = {
    cameras: {}
};
exports.AmongUsMaps = (_a = {},
    _a[MapType.THE_SKELD] = {
        cameras: (_b = {},
            _b[0] = { x: 13.2417, y: -4.348 },
            _b[1] = { x: 0.6216, y: -6.5642 },
            _b[2] = { x: -7.1503, y: 1.6709 },
            _b[3] = { x: -17.8098, y: -4.8983 },
            _b)
    },
    _a[MapType.POLUS] = {
        cameras: (_c = {},
            _c[CameraLocation.East] = { x: 29, y: -15.7 },
            _c[CameraLocation.Central] = { x: 15.4, y: -15.4 },
            _c[CameraLocation.Northeast] = { x: 24.4, y: -8.5 },
            _c[CameraLocation.South] = { x: 17, y: -20.6 },
            _c[CameraLocation.SouthWest] = { x: 4.7, y: -22.73 },
            _c[CameraLocation.NorthWest] = { x: 11.6, y: -8.2 },
            _c)
    },
    _a[MapType.THE_SKELD_APRIL] = defaultMap,
    _a[MapType.MIRA_HQ] = defaultMap,
    _a[MapType.AIRSHIP] = {
        cameras: (_d = {},
            _d[CameraLocation.East] = { x: -8.2872, y: 0.0527 },
            _d[CameraLocation.Central] = { x: -4.0477, y: 9.1447 },
            _d[CameraLocation.Northeast] = { x: 23.5616, y: 9.8882 },
            _d[CameraLocation.South] = { x: 4.881, y: -11.1688 },
            _d[CameraLocation.SouthWest] = { x: 30.3702, y: -0.874 },
            _d[CameraLocation.NorthWest] = { x: 3.3018, y: 16.2631 },
            _d)
    },
    _a[MapType.FUNGLE] = {
        cameras: {}
    },
    _a[MapType.SUBMERGED] = {
        cameras: {}
    },
    _a[MapType.UNKNOWN] = defaultMap,
    _a);
// East: 29, -15.7
// Central: 15.4, -15.4
// Northeast: 24.4, -8.5
// South: 17, -20.6
// Southwest: 4.7, -22.73
// Northwest: 11.6, -8.2
