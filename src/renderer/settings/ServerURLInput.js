"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Alert_1 = require("@mui/material/Alert");
var material_1 = require("@mui/material");
var valid_url_1 = require("valid-url");
function validateServerUrl(uri) {
    try {
        if (!(0, valid_url_1.isHttpUri)(uri) && !(0, valid_url_1.isHttpsUri)(uri))
            return false;
        var url = new URL(uri);
        if (url.hostname === 'discord.gg')
            return false;
        if (url.pathname !== '/')
            return false;
        return true;
    }
    catch (_) {
        return false;
    }
}
var RawServerURLInput = function (_a) {
    var t = _a.t, initialURL = _a.initialURL, onValidURL = _a.onValidURL, className = _a.className;
    var _b = (0, react_1.useState)(true), isValidURL = _b[0], setURLValid = _b[1];
    var _c = (0, react_1.useState)(initialURL), currentURL = _c[0], setCurrentURL = _c[1];
    var _d = (0, react_1.useState)(false), open = _d[0], setOpen = _d[1];
    (0, react_1.useEffect)(function () {
        setCurrentURL(initialURL);
    }, [initialURL]);
    function handleChange(event) {
        var url = event.target.value.trim();
        setCurrentURL(url);
        if (validateServerUrl(url)) {
            setURLValid(true);
        }
        else {
            setURLValid(false);
        }
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Button, { variant: "contained", color: "secondary", onClick: function () { return setOpen(true); } }, t('settings.advanced.change_server')),
        react_1["default"].createElement(material_1.Dialog, { fullScreen: true, open: open, onClose: function () { return setOpen(false); } },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(material_1.DialogTitle, null, t('settings.advanced.change_server'))),
            react_1["default"].createElement(material_1.DialogContent, { className: className },
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, error: !isValidURL, spellCheck: false, label: t('settings.advanced.voice_server'), value: currentURL, onChange: handleChange, variant: "outlined", color: "primary", helperText: isValidURL ? '' : t('settings.advanced.voice_server') }),
                react_1["default"].createElement(Alert_1["default"], { severity: "error" }, t('settings.advanced.voice_server_warning')),
                react_1["default"].createElement(material_1.Button, { color: "primary", variant: "contained", onClick: function () {
                        setOpen(false);
                        setURLValid(true);
                        onValidURL('https://bettercrewl.ink');
                    } }, t('settings.advanced.reset_default'))),
            react_1["default"].createElement(material_1.DialogActions, null,
                react_1["default"].createElement(material_1.Button, { color: "primary", onClick: function () {
                        setURLValid(true);
                        setOpen(false);
                        setCurrentURL(initialURL);
                    } }, t('buttons.cancel')),
                react_1["default"].createElement(material_1.Button, { disabled: !isValidURL, color: "primary", onClick: function () {
                        setOpen(false);
                        var url = currentURL;
                        if (url.endsWith('/'))
                            url = url.substring(0, url.length - 1);
                        onValidURL(url);
                    } }, t('buttons.confirm'))))));
};
var ServerURLInput = react_1["default"].memo(RawServerURLInput);
exports["default"] = ServerURLInput;
