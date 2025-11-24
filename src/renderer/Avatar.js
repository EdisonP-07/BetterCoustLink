"use strict";
exports.__esModule = true;
var react_1 = require("react");
var cosmetics_1 = require("./cosmetics");
var makeStyles_1 = require("@mui/styles/makeStyles");
var MicOff_1 = require("@mui/icons-material/MicOff");
var VolumeOff_1 = require("@mui/icons-material/VolumeOff");
var WifiOff_1 = require("@mui/icons-material/WifiOff");
var LinkOff_1 = require("@mui/icons-material/LinkOff");
var ErrorOutline_1 = require("@mui/icons-material/ErrorOutline"); //@ts-ignore
var radio_svg_1 = require("../../static/radio.svg");
var react_tooltip_lite_1 = require("react-tooltip-lite");
var Slider_1 = require("@mui/material/Slider");
var VolumeUp_1 = require("@mui/icons-material/VolumeUp");
var IconButton_1 = require("@mui/material/IconButton");
var Grid_1 = require("@mui/material/Grid");
var useStyles = (0, makeStyles_1["default"])(function () { return ({
    canvas: {
        position: 'absolute',
        width: '100%'
    },
    icon: {
        background: '#ea3c2a',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #690a00',
        borderRadius: '50%',
        padding: 2,
        zIndex: 10
    },
    iconNoBackground: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        padding: 2,
        zIndex: 10
    },
    relative: {
        position: 'relative'
    },
    slidecontainer: {
        minWidth: '80px'
    },
    innerTooltip: {
        textAlign: 'center'
    }
}); });
var Avatar = function (_a) {
    var talking = _a.talking, deafened = _a.deafened, muted = _a.muted, borderColor = _a.borderColor, isAlive = _a.isAlive, player = _a.player, size = _a.size, connectionState = _a.connectionState, socketConfig = _a.socketConfig, showborder = _a.showborder, showHat = _a.showHat, isUsingRadio = _a.isUsingRadio, _b = _a.lookLeft, lookLeft = _b === void 0 ? false : _b, _c = _a.overflow, overflow = _c === void 0 ? false : _c, onConfigChange = _a.onConfigChange, mod = _a.mod;
    var classes = useStyles();
    var icon;
    deafened = deafened === true || (socketConfig === null || socketConfig === void 0 ? void 0 : socketConfig.isMuted) === true || (socketConfig === null || socketConfig === void 0 ? void 0 : socketConfig.volume) === 0;
    switch (connectionState) {
        case 'connected':
            if (deafened) {
                icon = react_1["default"].createElement(VolumeOff_1["default"], { className: classes.icon });
            }
            else if (muted) {
                icon = react_1["default"].createElement(MicOff_1["default"], { className: classes.icon });
            }
            break;
        case 'novoice':
            icon = react_1["default"].createElement(LinkOff_1["default"], { className: classes.icon, style: { background: '#e67e22', borderColor: '#694900' } });
            break;
        case 'disconnected':
            icon = react_1["default"].createElement(WifiOff_1["default"], { className: classes.icon });
            break;
    }
    if (player.bugged) {
        icon = react_1["default"].createElement(ErrorOutline_1["default"], { className: classes.icon, style: { background: 'red', borderColor: '' } });
    }
    var canvas = (react_1["default"].createElement(Canvas, { className: classes.canvas, color: player.colorId, hat: showHat === false ? '' : player.hatId, visor: showHat === false ? '' : player.visorId, skin: player.skinId, isAlive: isAlive, lookLeft: lookLeft === true, borderColor: talking ? borderColor : showborder === true ? '#ccbdcc86' : 'transparent', size: size, overflow: overflow, usingRadio: isUsingRadio, mod: mod }));
    if (socketConfig) {
        var muteButtonIcon = void 0;
        if (socketConfig.isMuted) {
            muteButtonIcon = react_1["default"].createElement(VolumeOff_1["default"], { color: "primary", className: classes.iconNoBackground });
        }
        else {
            muteButtonIcon = react_1["default"].createElement(VolumeUp_1["default"], { color: "primary", className: classes.iconNoBackground });
        }
        return (react_1["default"].createElement(react_tooltip_lite_1["default"], { mouseOutDelay: 300, content: react_1["default"].createElement("div", { className: classes.innerTooltip },
                react_1["default"].createElement("b", null, player.name),
                react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 0, className: classes.slidecontainer },
                    react_1["default"].createElement(Grid_1["default"], { item: true },
                        react_1["default"].createElement(IconButton_1["default"], { onClick: function () {
                                socketConfig.isMuted = !socketConfig.isMuted;
                            }, style: { margin: '1px 1px 0px 0px' }, size: "large" }, muteButtonIcon)),
                    react_1["default"].createElement(Grid_1["default"], { item: true, xs: true },
                        react_1["default"].createElement(Slider_1["default"], { size: "small", value: socketConfig.volume, min: 0, max: 2, step: 0.02, onChange: function (_, newValue) {
                                socketConfig.volume = newValue;
                            }, valueLabelDisplay: 'auto', valueLabelFormat: function (value) { return Math.floor(value * 100) + '%'; }, onMouseLeave: function () {
                                if (onConfigChange) {
                                    onConfigChange();
                                }
                            }, "aria-labelledby": "continuous-slider" })))), padding: 5 },
            canvas,
            icon));
    }
    else {
        return (react_1["default"].createElement("div", { className: classes.relative },
            canvas,
            icon));
    }
};
var useCanvasStyles = (0, makeStyles_1["default"])(function () { return ({
    base: {
        width: '105%',
        position: 'absolute',
        top: '22%',
        left: function (_a) {
            var paddingLeft = _a.paddingLeft;
            return paddingLeft;
        },
        zIndex: 2
    },
    hat: {
        pointerEvents: 'none',
        width: function (_a) {
            var dementions = _a.dementions;
            return dementions.hat.width;
        },
        position: 'absolute',
        top: function (_a) {
            var dementions = _a.dementions;
            return "calc(22% + ".concat(dementions.hat.top, ")");
        },
        left: function (_a) {
            var size = _a.size, paddingLeft = _a.paddingLeft, dementions = _a.dementions;
            return "calc(".concat(dementions.hat.left, " + ").concat(Math.max(2, size / 40) / 2 + paddingLeft, "px)");
        },
        zIndex: 4,
        display: function (_a) {
            var isAlive = _a.isAlive;
            return (isAlive ? 'block' : 'none');
        }
    },
    skin: {
        pointerEvents: 'none',
        width: function (_a) {
            var dementions = _a.dementions;
            return dementions.skin.width;
        },
        position: 'absolute',
        top: function (_a) {
            var dementions = _a.dementions;
            return "calc(22% + ".concat(dementions.skin.top, ")");
        },
        left: function (_a) {
            var size = _a.size, paddingLeft = _a.paddingLeft, dementions = _a.dementions;
            return "calc(".concat(dementions.skin.left, " + ").concat(Math.max(2, size / 40) / 2 + paddingLeft, "px)");
        },
        zIndex: 3,
        display: function (_a) {
            var isAlive = _a.isAlive;
            return (isAlive ? 'block' : 'none');
        }
    },
    visor: {
        pointerEvents: 'none',
        width: function (_a) {
            var dementions = _a.dementions;
            return dementions.visor.width;
        },
        position: 'absolute',
        top: function (_a) {
            var dementions = _a.dementions;
            return "calc(22% + ".concat(dementions.visor.top, ")");
        },
        left: function (_a) {
            var size = _a.size, paddingLeft = _a.paddingLeft, dementions = _a.dementions;
            return "calc(".concat(dementions.visor.left, " + ").concat(Math.max(2, size / 40) / 2 + paddingLeft, "px)");
        },
        zIndex: 3,
        display: function (_a) {
            var isAlive = _a.isAlive;
            return (isAlive ? 'block' : 'none');
        }
    },
    avatar: {
        // overflow: 'hidden',
        borderRadius: '50%',
        position: 'relative',
        borderStyle: 'solid',
        transition: 'border-color .2s ease-out',
        borderColor: function (_a) {
            var borderColor = _a.borderColor;
            return borderColor;
        },
        borderWidth: function (_a) {
            var size = _a.size;
            return Math.max(2, size / 40);
        },
        transform: function (_a) {
            var lookLeft = _a.lookLeft;
            return (lookLeft ? 'scaleX(-1)' : 'scaleX(1)');
        },
        width: '100%',
        paddingBottom: '100%',
        cursor: 'pointer'
    },
    radio: {
        position: 'absolute',
        left: '70%',
        top: '80%',
        width: '30px',
        transform: 'translate(-50%, -50%)',
        fill: 'white',
        padding: 2,
        zIndex: 12
    }
}); });
function Canvas(_a) {
    var hat = _a.hat, skin = _a.skin, visor = _a.visor, isAlive = _a.isAlive, lookLeft = _a.lookLeft, size = _a.size, borderColor = _a.borderColor, color = _a.color, overflow = _a.overflow, usingRadio = _a.usingRadio, onClick = _a.onClick, mod = _a.mod;
    var hatImg = (0, react_1.useMemo)(function () {
        if (!cosmetics_1.initializedHats) {
            (0, cosmetics_1.initializeHats)();
        }
        return {
            base: (0, cosmetics_1.getCosmetic)(color, isAlive, cosmetics_1.cosmeticType.base),
            hat_front: !cosmetics_1.initializedHats ? '' : (0, cosmetics_1.getCosmetic)(color, isAlive, cosmetics_1.cosmeticType.hat, hat, mod),
            hat_back: !cosmetics_1.initializedHats ? '' : (0, cosmetics_1.getCosmetic)(color, isAlive, cosmetics_1.cosmeticType.hat_back, hat, mod),
            skin: !cosmetics_1.initializedHats ? '' : (0, cosmetics_1.getCosmetic)(color, isAlive, cosmetics_1.cosmeticType.hat, skin, mod),
            visor: !cosmetics_1.initializedHats ? '' : (0, cosmetics_1.getCosmetic)(color, isAlive, cosmetics_1.cosmeticType.hat, visor, mod),
            dementions: {
                hat: (0, cosmetics_1.getHatDementions)(hat, mod),
                visor: (0, cosmetics_1.getHatDementions)(visor, mod),
                skin: (0, cosmetics_1.getHatDementions)(skin, mod)
            }
        };
    }, [color, hat, skin, visor, cosmetics_1.initializedHats, isAlive]);
    var classes = useCanvasStyles({
        isAlive: isAlive,
        dementions: hatImg.dementions,
        lookLeft: lookLeft,
        size: size,
        borderColor: borderColor,
        paddingLeft: -7
    });
    //@ts-ignore
    var onerror = function (e) {
        e.target.style.display = 'none';
    };
    //@ts-ignore
    var onload = function (e) {
        e.target.style.display = '';
    };
    var hatElement = (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("img", { src: hatImg.hat_front, className: classes.hat, onError: onerror, onLoad: onload }),
        react_1["default"].createElement("img", { src: hatImg.visor, className: classes.visor, onError: onerror, onLoad: onload }),
        react_1["default"].createElement("img", { src: hatImg.hat_back, className: classes.hat, style: { zIndex: 1 }, onError: onerror, onLoad: onload })));
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: classes.avatar, onClick: onClick },
            react_1["default"].createElement("div", { className: classes.avatar, style: {
                    overflow: 'hidden',
                    position: 'absolute',
                    top: Math.max(2, size / 40) * -1,
                    left: Math.max(2, size / 40) * -1,
                    transform: 'unset'
                } },
                react_1["default"].createElement("img", { src: hatImg.base, className: classes.base, 
                    //@ts-ignore
                    onError: function (e) {
                        e.target.onError = null;
                        e.target.src = cosmetics_1.redAlive;
                    } }),
                react_1["default"].createElement("img", { src: hatImg.skin, className: classes.skin, onError: onerror, onLoad: onload }),
                overflow && hatElement),
            !overflow && hatElement,
            usingRadio && react_1["default"].createElement("img", { src: radio_svg_1["default"], className: classes.radio }))));
}
exports["default"] = Avatar;
