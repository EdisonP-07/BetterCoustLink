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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.CustomPlatformSettings = void 0;
var material_1 = require("@mui/material");
var makeStyles_1 = require("@mui/styles/makeStyles");
var react_1 = require("react");
var ArrowBack_1 = require("@mui/icons-material/ArrowBack");
var GamePlatform_1 = require("../../common/GamePlatform");
var path_1 = require("path");
var process_1 = require("process");
var contexts_1 = require("../contexts");
var useStyles = (0, makeStyles_1["default"])(function (theme) { return ({
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    back: {
        cursor: 'pointer',
        position: 'absolute',
        right: theme.spacing(1),
        WebkitAppRegion: 'no-drag'
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        '&>*': {
            marginBottom: theme.spacing(1)
        }
    },
    radioGroup: {
        flexDirection: 'row'
    }
}); });
var CustomPlatformSettings = function (_a) {
    var t = _a.t, open = _a.open, setOpenState = _a.setOpenState, editPlatform = _a.editPlatform;
    var desktopPlatform = process_1.platform;
    var classes = useStyles();
    var _b = (0, react_1.useContext)(contexts_1.SettingsContext), settings = _b[0], setSettings = _b[1];
    var _c = (0, react_1.useState)(false), advanced = _c[0], setAdvanced = _c[1];
    var emptyCustomPlatform = {
        "default": false,
        key: '',
        launchType: GamePlatform_1.PlatformRunType.EXE,
        runPath: '',
        execute: [''],
        translateKey: ''
    };
    var _d = (0, react_1.useState)(emptyCustomPlatform), customPlatform = _d[0], setCustomPlatform = _d[1];
    (0, react_1.useEffect)(function () {
        setCustomPlatform(editPlatform ? editPlatform : emptyCustomPlatform);
        if (editPlatform && editPlatform.execute.length > 1) {
            setAdvanced(true);
        }
        else {
            setAdvanced(false);
        }
    }, [open]);
    var setPlatformName = function (name) {
        setCustomPlatform(function (prevState) { return (__assign(__assign({}, prevState), { key: name, translateKey: name })); });
    };
    var setPlatformRunType = function (runType) {
        setCustomPlatform(function (prevState) { return (__assign(__assign({}, prevState), { launchType: runType, runPath: '', execute: [''] })); });
    };
    var setPlatformRun = function (pathsString) {
        if (customPlatform.launchType === GamePlatform_1.PlatformRunType.EXE) {
            var exe_1 = path_1["default"].parse(pathsString);
            if (exe_1) {
                setCustomPlatform(function (prevState) {
                    var _a;
                    return (__assign(__assign({}, prevState), { runPath: exe_1.dir, execute: (_a = [exe_1.base]).concat.apply(_a, prevState.execute.slice(1)) }));
                });
            }
            else {
                setCustomPlatform(function (prevState) { return (__assign(__assign({}, prevState), { runPath: '', execute: [''] })); });
            }
        }
        else if (customPlatform.launchType === GamePlatform_1.PlatformRunType.URI) {
            setCustomPlatform(function (prevState) { return (__assign(__assign({}, prevState), { runPath: pathsString })); });
        }
    };
    var setPlatformArgs = function (args) {
        if (args === '') {
            setCustomPlatform(function (prevState) { return (__assign(__assign({}, prevState), { execute: [customPlatform.execute[0]] })); });
        }
        else if (customPlatform.launchType === GamePlatform_1.PlatformRunType.EXE) {
            setCustomPlatform(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), { execute: (_a = [customPlatform.execute[0]]).concat.apply(_a, args.split(' ')) }));
            });
        }
    };
    // Delete and re-add platform if we're editing
    var saveCustomPlatform = function () {
        var _a, _b;
        if (editPlatform && settings.customPlatforms[editPlatform.key]) {
            var _c = settings.customPlatforms, _d = editPlatform.key, remove = _c[_d], rest = __rest(_c, [typeof _d === "symbol" ? _d : _d + ""]);
            setSettings('customPlatforms', __assign(__assign({}, rest), (_a = {}, _a[customPlatform.key] = customPlatform, _a)));
        }
        else {
            setSettings('customPlatforms', __assign(__assign({}, settings.customPlatforms), (_b = {}, _b[customPlatform.key] = customPlatform, _b)));
        }
    };
    var deleteCustomPlatform = function () {
        var _a = settings.customPlatforms, _b = customPlatform.key, remove = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        setSettings('customPlatforms', rest);
    };
    var runInputs = (0, react_1.useMemo)(function () {
        if (customPlatform.launchType === GamePlatform_1.PlatformRunType.EXE) {
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, label: t('settings.customplatforms.path'), value: customPlatform.execute[0] ? path_1["default"].join(customPlatform.runPath, customPlatform.execute[0]) : '', variant: "outlined", color: "primary", disabled: true }),
                react_1["default"].createElement(material_1.Button, { variant: "contained", component: "label" },
                    t('buttons.file_select'),
                    react_1["default"].createElement("input", { accept: desktopPlatform === 'win32' ? '.exe' : '*', type: "file", hidden: true, onChange: function (ev) {
                            if (ev.target.files && ev.target.files.length > 0) {
                                setPlatformRun(ev.target.files[0].path);
                            }
                            else {
                                setPlatformRun('');
                            }
                        } })),
                react_1["default"].createElement(material_1.FormControlLabel, { control: react_1["default"].createElement(material_1.Checkbox, { checked: advanced, onChange: function (_, checked) {
                            setAdvanced(checked);
                            if (!checked) {
                                setPlatformArgs('');
                            }
                        } }), label: t('settings.customplatforms.advanced') }),
                advanced ? (react_1["default"].createElement(material_1.TextField, { fullWidth: true, label: t('settings.customplatforms.arguments'), value: customPlatform.execute.slice(1).join(' '), onChange: function (ev) { return setPlatformArgs(ev.target.value); }, variant: "outlined", color: "primary" })) : null));
        }
        else {
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, label: t('settings.customplatforms.uri'), value: customPlatform.runPath, onChange: function (ev) { return setPlatformRun(ev.target.value); }, variant: "outlined", color: "primary", disabled: false })));
        }
    }, [customPlatform, advanced]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Dialog, { fullScreen: true, open: open },
            react_1["default"].createElement("div", { className: classes.header },
                react_1["default"].createElement(material_1.DialogTitle, null, t('settings.customplatforms.title')),
                react_1["default"].createElement(material_1.IconButton, { className: classes.back, size: "small", onClick: function () { return setOpenState(false); } },
                    react_1["default"].createElement(ArrowBack_1["default"], { htmlColor: "#777" }))),
            react_1["default"].createElement(material_1.DialogContent, { className: classes.dialog },
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, spellCheck: false, label: t('settings.customplatforms.platform_title'), value: customPlatform.key, onChange: function (ev) { return setPlatformName(ev.target.value); }, variant: "outlined", color: "primary", disabled: false }),
                react_1["default"].createElement(material_1.RadioGroup, { className: classes.radioGroup, value: customPlatform.launchType, onChange: function (ev) {
                        setPlatformRunType(ev.target.value);
                    } },
                    react_1["default"].createElement(material_1.FormControlLabel, { label: GamePlatform_1.PlatformRunType.EXE, value: GamePlatform_1.PlatformRunType.EXE, control: react_1["default"].createElement(material_1.Radio, null) }),
                    react_1["default"].createElement(material_1.FormControlLabel, { label: GamePlatform_1.PlatformRunType.URI, value: GamePlatform_1.PlatformRunType.URI, control: react_1["default"].createElement(material_1.Radio, null) })),
                runInputs),
            react_1["default"].createElement(material_1.DialogActions, null,
                react_1["default"].createElement(material_1.Button, { color: "primary", onClick: function () {
                        deleteCustomPlatform();
                        setCustomPlatform(emptyCustomPlatform);
                        setOpenState(false);
                    } }, t('buttons.delete')),
                react_1["default"].createElement(material_1.Button, { color: "primary", onClick: function () {
                        saveCustomPlatform();
                        setCustomPlatform(emptyCustomPlatform);
                        setOpenState(false);
                    } }, t('buttons.confirm'))))));
};
exports.CustomPlatformSettings = CustomPlatformSettings;
