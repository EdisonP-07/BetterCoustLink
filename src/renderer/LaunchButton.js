"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var react_1 = require("react");
var contexts_1 = require("./contexts");
var makeStyles_1 = require("@mui/styles/makeStyles");
var ipc_messages_1 = require("../common/ipc-messages");
var material_1 = require("@mui/material");
var material_2 = require("@mui/material");
var ArrowDropDown_1 = require("@mui/icons-material/ArrowDropDown");
var CustomPlatformSettings_1 = require("./settings/CustomPlatformSettings");
var useStyles = (0, makeStyles_1["default"])(function (theme) { return ({
    button_group: {
        display: 'inline-flex',
        margin: '0px 10px'
    },
    button_primary: {
        color: 'white',
        background: 'none',
        padding: '2px 10px',
        borderRadius: '10px 0px 0px 10px',
        borderWidth: '4px 2px 4px 4px',
        borderStyle: 'solid',
        borderColor: 'white',
        fontSize: 24,
        outline: 'none',
        fontWeight: 500,
        fontFamily: '"Varela", sans-serif',
        '&:hover': {
            borderColor: '#00ff00',
            cursor: 'pointer'
        },
        textTransform: 'none'
    },
    button_dropdown: {
        '&.Mui-selected': {
            borderColor: '#00ff00'
        },
        color: 'white',
        background: 'none',
        padding: '0px 0px',
        borderRadius: '0px 10px 10px 0px',
        borderWidth: '4px 4px 4px 2px',
        borderStyle: 'solid',
        borderColor: 'white',
        '&:hover': {
            borderColor: '#00ff00',
            cursor: 'pointer'
        },
        minWidth: '40px'
    },
    dropdown: {
        maxHeight: 110,
        overflow: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: '#272727'
    }
}); });
var LaunchButton = function (_a) {
    var t = _a.t;
    var classes = useStyles();
    var _b = (0, react_1.useContext)(contexts_1.SettingsContext), settings = _b[0], setSettings = _b[1];
    var _c = (0, react_1.useState)(react_1["default"].createElement(react_1["default"].Fragment, null, t('game.error_platform'))), openMessage = _c[0], setOpenMessage = _c[1];
    var _d = (0, react_1.useState)(false), dropdownOpen = _d[0], setDropdownOpen = _d[1];
    var _e = (0, react_1.useState)(), launchPlatforms = _e[0], setLaunchPlatforms = _e[1];
    var _f = (0, react_1.useState)([]), launchItemList = _f[0], setLaunchItemList = _f[1];
    var _g = (0, react_1.useState)(false), customPlatformOpen = _g[0], setCustomPlatformOpen = _g[1];
    var _h = (0, react_1.useState)(undefined), customPlatformEdit = _h[0], setCustomPlatformEdit = _h[1];
    var anchorRef = (0, react_1.useRef)(null);
    // Grab available platforms from main thread
    (0, react_1.useEffect)(function () {
        electron_1.ipcRenderer
            .invoke(ipc_messages_1.IpcMessages.REQUEST_PLATFORMS_AVAILABLE, settings.customPlatforms)
            .then(function (result) {
            setLaunchPlatforms(result);
        });
    }, [settings.customPlatforms]);
    // If launchPlatformSettings changes: select the first available platform and re-compute list of platforms
    (0, react_1.useEffect)(function () {
        if (!launchPlatforms)
            return;
        if (!launchPlatforms[settings.launchPlatform]) {
            for (var key in launchPlatforms) {
                setSettings('launchPlatform', key);
                break;
            }
        }
        // Generate an array of <MenuItem>'s from available platforms for dropdown
        var platformArray = Array.from(Object.keys(launchPlatforms)).reduce(function (filtered, key) {
            var platform = launchPlatforms[key];
            var platformName = platform["default"] ? t(platform.translateKey) : platform.translateKey;
            filtered.push(react_1["default"].createElement(material_1.MenuItem, { key: platformName, onClick: function () {
                    setSettings('launchPlatform', platform.key);
                    setDropdownOpen(false);
                }, onContextMenu: function () {
                    if (platform["default"]) {
                        return;
                    }
                    setCustomPlatformEdit(platform);
                    setDropdownOpen(false);
                    setCustomPlatformOpen(true);
                } }, platformName));
            return filtered;
        }, []);
        platformArray.push(react_1["default"].createElement(material_1.MenuItem, { key: t('platform.custom'), onClick: function () {
                setCustomPlatformEdit(undefined);
                setDropdownOpen(false);
                setCustomPlatformOpen(true);
            } }, t('platform.custom')));
        setLaunchItemList(platformArray);
    }, [launchPlatforms]);
    // Update button message when platform changes or no platforms are available (list empty)
    (0, react_1.useEffect)(function () {
        if (!launchPlatforms)
            return;
        if (launchItemList.length > 1) {
            setOpenMessage(react_1["default"].createElement(react_1["default"].Fragment, null, t(launchPlatforms[settings.launchPlatform].translateKey)));
        }
        else {
            setOpenMessage(react_1["default"].createElement(react_1["default"].Fragment, null, t('game.error_platform')));
        }
    }, [launchItemList, settings.launchPlatform]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CustomPlatformSettings_1.CustomPlatformSettings, { t: t, open: customPlatformOpen, setOpenState: setCustomPlatformOpen, editPlatform: customPlatformEdit }),
        react_1["default"].createElement("div", { className: classes.button_group, ref: anchorRef },
            react_1["default"].createElement(material_1.Button, { className: classes.button_primary, disabled: launchItemList.length === 1, onClick: function () {
                    electron_1.ipcRenderer.send(ipc_messages_1.IpcMessages.OPEN_AMONG_US_GAME, launchPlatforms[settings.launchPlatform]);
                } }, openMessage),
            react_1["default"].createElement(material_2.ToggleButton, { className: classes.button_dropdown, onClick: function () { return setDropdownOpen(function (status) { return !status; }); }, selected: dropdownOpen, value: "" },
                react_1["default"].createElement(ArrowDropDown_1["default"], null))),
        react_1["default"].createElement(material_1.Popper, { open: dropdownOpen, anchorEl: anchorRef.current, placement: "bottom-end", disablePortal: false, className: classes.dropdown, modifiers: [
                {
                    name: "flip",
                    options: {
                        enabled: false
                    }
                },
                {
                    name: "preventOverflow",
                    options: {
                        enabled: true,
                        boundariesElement: 'viewport'
                    }
                },
            ] },
            react_1["default"].createElement(material_1.Paper, null,
                react_1["default"].createElement(material_1.ClickAwayListener, { onClickAway: function () { return setDropdownOpen(false); } },
                    react_1["default"].createElement(material_1.MenuList, null, launchItemList))))));
};
exports["default"] = LaunchButton;
