"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Footer_1 = require("./Footer");
var makeStyles_1 = require("@mui/styles/makeStyles");
var CircularProgress_1 = require("@mui/material/CircularProgress");
var Typography_1 = require("@mui/material/Typography");
var SupportLink_1 = require("./SupportLink");
var LaunchButton_1 = require("./LaunchButton");
var useStyles = (0, makeStyles_1["default"])(function (theme) { return ({
    root: {
        width: '100vw',
        height: '100vh',
        paddingTop: theme.spacing(3)
    },
    error: {
        paddingTop: theme.spacing(4)
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start'
    },
    waiting: {
        fontSize: 20,
        marginTop: 12,
        marginBottom: 12
    },
    open_message: {
        fontSize: 24,
        marginTop: '15px',
        marginBottom: '5px'
    }
}); });
var Menu = function (_a) {
    var t = _a.t, error = _a.error;
    var classes = useStyles();
    return (react_1["default"].createElement("div", { className: classes.root },
        react_1["default"].createElement("div", { className: classes.menu },
            error ? (react_1["default"].createElement("div", { className: classes.error },
                react_1["default"].createElement(Typography_1["default"], { align: "center", variant: "h6", color: "error" }, t('game.error')),
                react_1["default"].createElement(Typography_1["default"], { align: "center", style: { whiteSpace: 'pre-wrap' } }, error),
                react_1["default"].createElement(SupportLink_1["default"], null))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("span", { className: classes.waiting }, t('game.waiting')),
                react_1["default"].createElement(CircularProgress_1["default"], { color: "primary", size: 40 }),
                react_1["default"].createElement("span", { className: classes.open_message }, t('game.open')),
                react_1["default"].createElement(LaunchButton_1["default"], { t: t }))),
            react_1["default"].createElement(Footer_1["default"], null))));
};
exports["default"] = Menu;
