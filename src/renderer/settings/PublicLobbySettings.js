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
exports.__esModule = true;
var react_1 = require("react");
var makeStyles_1 = require("@mui/styles/makeStyles");
var material_1 = require("@mui/material");
var languages_1 = require("../language/languages");
var Alert_1 = require("@mui/material/Alert");
var ArrowBack_1 = require("@mui/icons-material/ArrowBack");
var useStyles = (0, makeStyles_1["default"])(function (theme) { return ({
    specialButton: {
        width: '90%',
        marginBottom: '10px'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    back: {
        cursor: 'pointer',
        position: 'absolute',
        right: theme.spacing(1),
        WebkitAppRegion: 'no-drag'
    }
}); });
var RawPublicLobbySettings = function (_a) {
    var t = _a.t, lobbySettings = _a.lobbySettings, updateSetting = _a.updateSetting, canChange = _a.canChange, className = _a.className;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    var classes = useStyles();
    (0, react_1.useEffect)(function () {
        setLobbySettingState(lobbySettings);
    }, [lobbySettings]);
    var _c = (0, react_1.useState)(lobbySettings), lobbySettingState = _c[0], setLobbySettingState = _c[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Button, { variant: "contained", color: "secondary", className: classes.specialButton, onClick: function () { return setOpen(true); }, disabled: !canChange }, t('settings.lobbysettings.public_lobby.change_settings')),
        react_1["default"].createElement(material_1.Dialog, { fullScreen: true, open: open, onClose: function () { return setOpen(false); } },
            react_1["default"].createElement("div", { className: classes.header },
                react_1["default"].createElement(material_1.DialogTitle, null, t('settings.lobbysettings.public_lobby.change_settings')),
                react_1["default"].createElement(material_1.IconButton, { className: classes.back, size: "small", onClick: function () {
                        setOpen(false);
                    } },
                    react_1["default"].createElement(ArrowBack_1["default"], { htmlColor: "#777" }))),
            react_1["default"].createElement(material_1.DialogContent, { className: className },
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, spellCheck: false, label: t('settings.lobbysettings.public_lobby.title'), value: lobbySettingState.publicLobby_title, onChange: function (ev) { return setLobbySettingState(__assign(__assign({}, lobbySettingState), { publicLobby_title: ev.target.value })); }, onBlur: function (ev) { return updateSetting('publicLobby_title', ev.target.value); }, variant: "outlined", color: "primary", disabled: !canChange }),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, select: true, label: t('settings.lobbysettings.public_lobby.language'), variant: "outlined", color: "secondary", SelectProps: { native: true }, InputLabelProps: { shrink: true }, value: lobbySettingState.publicLobby_language, onChange: function (ev) { return setLobbySettingState(__assign(__assign({}, lobbySettingState), { publicLobby_language: ev.target.value })); }, onBlur: function (ev) { return updateSetting('publicLobby_language', ev.target.value); }, disabled: !canChange }, Object.entries(languages_1["default"]).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return (react_1["default"].createElement("option", { key: key, value: key }, value.name));
                })),
                react_1["default"].createElement(Alert_1["default"], { severity: "error" }, t('settings.lobbysettings.public_lobby.ban_warning'))),
            react_1["default"].createElement(material_1.DialogActions, null,
                react_1["default"].createElement(material_1.Button, { color: "primary", onClick: function () {
                        setOpen(false);
                    } }, t('buttons.confirm'))))));
};
var PublicLobbySettings = react_1["default"].memo(RawPublicLobbySettings);
exports["default"] = PublicLobbySettings;
